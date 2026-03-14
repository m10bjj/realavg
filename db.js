const supabase = require('./lib/supabase');

const HISTORY_LIMIT = 10;

async function saveSearch({ regionCode, regionName, dealYmd, tradeType, resultCount }) {
  /* 새 이력 삽입 */
  const { data, error } = await supabase
    .from('searches')
    .insert({
      region_code:  regionCode,
      region_name:  regionName,
      deal_ymd:     dealYmd,
      trade_type:   tradeType,
      result_count: resultCount,
    })
    .select('id')
    .single();
  if (error) throw error;

  /* 10개 초과 시 오래된 이력 삭제 */
  const { data: all } = await supabase
    .from('searches')
    .select('id')
    .order('created_at', { ascending: true });
  if (all && all.length > HISTORY_LIMIT) {
    const toDelete = all.slice(0, all.length - HISTORY_LIMIT).map(r => r.id);
    await supabase.from('searches').delete().in('id', toDelete);
  }

  return data.id;
}

async function saveTransactionBatch(dataArr) {
  if (!dataArr.length) return;
  const rows = dataArr.map(d => ({
    search_id:       d.searchId       || null,
    apt_name:        d.apt_name       || null,
    deal_year:       d.deal_year      || null,
    deal_month:      d.deal_month     || null,
    deal_day:        d.deal_day       || null,
    area:            d.area           || null,
    floor:           d.floor          || null,
    build_year:      d.build_year     || null,
    dong:            d.dong           || null,
    road_name:       d.road_name      || null,
    deal_amount:     d.deal_amount    || null,
    deposit:         d.deposit        || null,
    monthly_rent:    d.monthly_rent   || null,
    deal_type:       d.deal_type      || null,
    contract_type:   d.contract_type  || null,
    contract_period: d.contract_period|| null,
    cancel_yn:       d.cancel_yn      || null,
    cancel_date:     d.cancel_date    || null,
    house_type:      d.house_type     || null,
  }));
  const { error } = await supabase.from('transactions').insert(rows);
  if (error) throw error;
}

async function getHistory() {
  const { data, error } = await supabase
    .from('searches')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return data || [];
}

async function getTransactions(searchId) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('search_id', searchId);
  if (error) throw error;
  return (data || []).sort((a, b) => {
    const da = `${a.deal_year}${a.deal_month}${a.deal_day}`;
    const db_ = `${b.deal_year}${b.deal_month}${b.deal_day}`;
    return db_.localeCompare(da);
  });
}

async function deleteSearch(id) {
  const { error } = await supabase.from('searches').delete().eq('id', id);
  if (error) throw error;
}

async function deleteSearchBatch(ids) {
  const { error } = await supabase.from('searches').delete().in('id', ids);
  if (error) throw error;
}

async function deleteAllSearches() {
  const { error } = await supabase.from('searches').delete().not('id', 'is', null);
  if (error) throw error;
}

/* ──────────────────────────────────────────
   경매 CRUD
────────────────────────────────────────── */
async function getAuctions() {
  const PAGE = 1000;
  let all = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('auctions')
      .select('*')
      .order('seq_no', { ascending: true, nullsFirst: false })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }

  return all;
}

/**
 * rows 배열을 auctions 테이블에 upsert (case_no 기준).
 * - DB에 있는 레코드 중 파일에 없는 case_no → 낙찰 처리
 * - 파일에 있지만 DB에 없는 case_no         → status='신건' 로 삽입
 * - 파일에도 있고 DB에도 있는 case_no        → status='진행중' 유지
 */
/** 1단계: case_no 목록을 받아 낙찰/변경 처리, wonCaseNos·changedCaseNos 반환
 *  - fileCaseNos에 없고, wonSheetExists=true이면:
 *      wonSheetCaseNos에 있으면 → status='낙찰'
 *      wonSheetCaseNos에 없으면 → status='변경'
 *  - wonSheetExists=false이면 (낙찰된것 시트 없음) → 모두 status='낙찰' (기존 동작)
 */
async function markWonAuctions(caseNos, wonSheetCaseNos = [], wonSheetExists = false) {
  const fileCaseNos = new Set(caseNos.filter(Boolean));
  const wonSheetSet = new Set(wonSheetCaseNos.filter(Boolean));
  const now = new Date().toISOString();

  let existing = [];
  let selFrom = 0;
  while (true) {
    const { data, error } = await supabase
      .from('auctions').select('id, case_no')
      .range(selFrom, selFrom + 999);
    if (error) throw error;
    if (!data || data.length === 0) break;
    existing = existing.concat(data);
    if (data.length < 1000) break;
    selFrom += 1000;
  }

  const existingMap = new Map(existing.filter(r => r.case_no).map(r => [r.case_no, r.id]));

  const toMarkWon     = []; // status='낙찰'
  const toMarkChanged = []; // status='변경'
  existingMap.forEach((id, cno) => {
    if (!fileCaseNos.has(cno)) {
      if (wonSheetExists && wonSheetSet.has(cno)) {
        toMarkWon.push({ id, cno });
      } else if (wonSheetExists) {
        toMarkChanged.push({ id, cno });
      } else {
        toMarkWon.push({ id, cno }); // 낙찰된것 시트 없으면 기존 동작
      }
    }
  });

  const toMarkWonIds = toMarkWon.map(({ id }) => id);
  for (let i = 0; i < toMarkWonIds.length; i += 500) {
    const chunk = toMarkWonIds.slice(i, i + 500);
    const { error } = await supabase
      .from('auctions').update({ status: '낙찰', updated_at: now }).in('id', chunk);
    if (error) throw error;
  }

  const toMarkChangedIds = toMarkChanged.map(({ id }) => id);
  for (let i = 0; i < toMarkChangedIds.length; i += 500) {
    const chunk = toMarkChangedIds.slice(i, i + 500);
    const { error } = await supabase
      .from('auctions').update({ status: '변경/낙찰', updated_at: now }).in('id', chunk);
    if (error) throw error;
  }

  return {
    markedAsWon:     toMarkWonIds.length,
    markedAsChanged: toMarkChangedIds.length,
    wonCaseNos:      toMarkWon.map(({ cno }) => cno),
    changedCaseNos:  toMarkChanged.map(({ cno }) => cno),
    existingCaseNos: [...existingMap.keys()],
  };
}

/** 2단계: rows 배치 upsert (status는 existingCaseNos 기준으로 결정) */
async function upsertAuctionRows(rows, existingCaseNos = []) {
  if (!rows.length) return { upserted: 0, markedAsNew: 0 };
  const existingSet = new Set(existingCaseNos);
  const now = new Date().toISOString();
  let markedAsNew = 0;

  // case_no 중복 제거 (같은 배치 내 중복 시 PostgreSQL upsert 오류 방지, 마지막 행 우선)
  const seen = new Map();
  rows.forEach(r => { if (r.case_no) seen.set(r.case_no, r); });
  const deduped = rows.filter(r => !r.case_no || seen.get(r.case_no) === r);

  const prepared = deduped.map(r => {
    if (!r.case_no) return { ...r, status: r.status || '진행중', updated_at: now };
    if (!existingSet.has(r.case_no)) { markedAsNew++; return { ...r, status: '신건', updated_at: now }; }
    return { ...r, status: '진행중', updated_at: now };
  });

  const CHUNK = 400;
  let upserted = 0;
  const withCaseNo    = prepared.filter(r => r.case_no);
  const withoutCaseNo = prepared.filter(r => !r.case_no);

  for (let i = 0; i < withCaseNo.length; i += CHUNK) {
    const { error } = await supabase
      .from('auctions').upsert(withCaseNo.slice(i, i + CHUNK), { onConflict: 'case_no', ignoreDuplicates: false });
    if (error) throw error;
    upserted += Math.min(CHUNK, withCaseNo.length - i);
  }
  for (let i = 0; i < withoutCaseNo.length; i += CHUNK) {
    const { error } = await supabase.from('auctions').insert(withoutCaseNo.slice(i, i + CHUNK));
    if (error) throw error;
    upserted += Math.min(CHUNK, withoutCaseNo.length - i);
  }
  return { upserted, markedAsNew };
}

async function upsertAuctions(rows) {
  if (!rows.length) return { upserted: 0, markedAsWon: 0, markedAsNew: 0, wonCaseNos: [] };

  const now = new Date().toISOString();

  // DB 전체 레코드 조회 (1000건 한도 우회)
  let existing = [];
  let selFrom = 0;
  while (true) {
    const { data, error: selErr } = await supabase
      .from('auctions').select('id, case_no')
      .range(selFrom, selFrom + 999);
    if (selErr) throw selErr;
    if (!data || data.length === 0) break;
    existing = existing.concat(data);
    if (data.length < 1000) break;
    selFrom += 1000;
  }

  const existingMap = new Map((existing || []).filter(r => r.case_no).map(r => [r.case_no, r.id]));
  const fileCaseNos = new Set(rows.map(r => r.case_no).filter(Boolean));

  // DB에 있지만 파일에 없는 것 → 낙찰 처리
  const toMarkWon = []; // { id, case_no }
  existingMap.forEach((id, cno) => { if (!fileCaseNos.has(cno)) toMarkWon.push({ id, cno }); });
  let markedAsWon = 0;

  // 낙찰 처리 (status='낙찰') – 500건씩 배치
  const toMarkIds = toMarkWon.map(({ id }) => id);
  for (let i = 0; i < toMarkIds.length; i += 500) {
    const chunk = toMarkIds.slice(i, i + 500);
    const { error } = await supabase
      .from('auctions')
      .update({ status: '낙찰', updated_at: now })
      .in('id', chunk);
    if (error) throw error;
  }
  markedAsWon = toMarkIds.length;
  const wonCaseNos = toMarkWon.map(({ cno }) => cno);

  // 파일 행 status 결정
  //  - DB에 없는 case_no → '신건'
  //  - DB에 있는 case_no → '진행중'
  let markedAsNew = 0;
  rows = rows.map(r => {
    if (!r.case_no) return { ...r, status: r.status || '진행중' };
    if (!existingMap.has(r.case_no)) { markedAsNew++; return { ...r, status: '신건' }; }
    return { ...r, status: '진행중' };
  });

  const toUpsert      = rows.map(r => ({ ...r, updated_at: now }));
  const withCaseNo    = toUpsert.filter(r => r.case_no);
  const withoutCaseNo = toUpsert.filter(r => !r.case_no);

  const CHUNK = 500;
  let upserted = 0;

  // case_no 있는 행: 500건씩 upsert
  for (let i = 0; i < withCaseNo.length; i += CHUNK) {
    const chunk = withCaseNo.slice(i, i + CHUNK);
    const { error } = await supabase
      .from('auctions')
      .upsert(chunk, { onConflict: 'case_no', ignoreDuplicates: false });
    if (error) throw error;
    upserted += chunk.length;
  }

  // case_no 없는 행: 500건씩 insert
  for (let i = 0; i < withoutCaseNo.length; i += CHUNK) {
    const chunk = withoutCaseNo.slice(i, i + CHUNK);
    const { error } = await supabase
      .from('auctions')
      .insert(chunk);
    if (error) throw error;
    upserted += chunk.length;
  }

  return { upserted, markedAsWon, markedAsNew, wonCaseNos };
}

async function updateWonPrices(prices) {
  // prices: { case_no: winning_price(만원) }
  const now = new Date().toISOString();
  for (const [cno, wp] of Object.entries(prices)) {
    if (!cno || wp == null) continue;
    const { error } = await supabase
      .from('auctions')
      .update({ winning_price: wp, updated_at: now })
      .eq('case_no', cno);
    if (error) throw error;
  }
}

async function updateAuction(id, fields) {
  const { error } = await supabase
    .from('auctions')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

async function deleteAuction(id) {
  const { error } = await supabase.from('auctions').delete().eq('id', id);
  if (error) throw error;
}

async function deleteAuctionBatch(ids) {
  const { error } = await supabase.from('auctions').delete().in('id', ids);
  if (error) throw error;
}

async function deleteAllAuctions() {
  const { error } = await supabase.from('auctions').delete().gte('id', 0);
  if (error) throw error;
}

/* ──────────────────────────────────────────
   나만의 경매물건 CRUD
────────────────────────────────────────── */
async function getMyAuctions() {
  const PAGE = 1000;
  let all = [], from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('my_auctions').select('*')
      .order('saved_at', { ascending: false })
      .order('id', { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

async function addMyAuctions(rows) {
  if (!rows.length) return 0;
  const now = new Date().toISOString();
  const CHUNK = 500;
  let count = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK).map(r => ({ ...r, saved_at: now, updated_at: now }));
    const { error } = await supabase.from('my_auctions').insert(chunk);
    if (error) throw error;
    count += chunk.length;
  }
  return count;
}

async function updateMyAuction(id, fields) {
  const { error } = await supabase
    .from('my_auctions')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

async function deleteMyAuction(id) {
  const { error } = await supabase.from('my_auctions').delete().eq('id', id);
  if (error) throw error;
}

async function deleteMyAuctionBatch(ids) {
  const { error } = await supabase.from('my_auctions').delete().in('id', ids);
  if (error) throw error;
}

/* ──────────────────────────────────────────
   수익률 분석 CRUD
────────────────────────────────────────── */
async function getProfitAnalyses(myAuctionId) {
  const { data, error } = await supabase
    .from('profit_analysis')
    .select('*')
    .eq('my_auction_id', myAuctionId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

async function upsertProfitAnalysis(fields) {
  const now = new Date().toISOString();
  const { my_auction_id, buyer_type } = fields;
  const { data: existing } = await supabase
    .from('profit_analysis')
    .select('id')
    .eq('my_auction_id', my_auction_id)
    .eq('buyer_type', buyer_type)
    .maybeSingle();
  if (existing) {
    const { error } = await supabase
      .from('profit_analysis')
      .update({ ...fields, updated_at: now })
      .eq('id', existing.id);
    if (error) throw error;
    return existing.id;
  } else {
    const { data, error } = await supabase
      .from('profit_analysis')
      .insert({ ...fields, created_at: now, updated_at: now })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }
}

async function deleteProfitAnalysis(id) {
  const { error } = await supabase.from('profit_analysis').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  saveSearch, saveTransactionBatch, getHistory,
  getTransactions, deleteSearch, deleteSearchBatch, deleteAllSearches,
  getAuctions, markWonAuctions, upsertAuctionRows, upsertAuctions, updateWonPrices, updateAuction,
  deleteAuction, deleteAuctionBatch, deleteAllAuctions,
  getMyAuctions, addMyAuctions, updateMyAuction,
  deleteMyAuction, deleteMyAuctionBatch,
  getProfitAnalyses, upsertProfitAnalysis, deleteProfitAnalysis,
};
