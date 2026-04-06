require('dotenv').config();
const express      = require('express');
const cookieParser = require('cookie-parser');
const jwt          = require('jsonwebtoken');
const axios        = require('axios');
const xml2js       = require('xml2js');
const path         = require('path');
const fs           = require('fs');
const https        = require('https');
const http         = require('http');
const multer       = require('multer');
const XLSX         = require('xlsx');
const qs           = require('qs');
const db           = require('./db');
const auth         = require('./auth');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

const app        = express();
const PORT       = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'realestate-jwt-secret-2024';

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

/* ──────────────────────────────────────────
   인증 미들웨어 (JWT 쿠키)
────────────────────────────────────────── */
function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    if (req.headers['accept']?.includes('application/json') ||
        req.headers['content-type']?.includes('application/json')) {
      return res.status(401).json({ error: '인증이 필요합니다.' });
    }
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (_) {
    res.clearCookie('token');
    if (req.headers['accept']?.includes('application/json') ||
        req.headers['content-type']?.includes('application/json')) {
      return res.status(401).json({ error: '인증이 필요합니다.' });
    }
    res.redirect('/login');
  }
}

function setAuthCookie(res, userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '8h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure:   !!process.env.VERCEL,
    maxAge:   1000 * 60 * 60 * 8,
    sameSite: 'lax',
  });
}

/* ──────────────────────────────────────────
   공개 라우트 (인증 불필요)
────────────────────────────────────────── */
app.get('/login', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    try { jwt.verify(token, JWT_SECRET); return res.redirect('/'); } catch (_) { res.clearCookie('token'); }
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login.css', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'login.css')));

app.post('/auth/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    const cfg = await auth.getAuth();
    if (id === cfg.id && password === cfg.password) {
      setAuthCookie(res, id);
      return res.json({ success: true });
    }
    res.json({ success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' });
  } catch (e) {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.post('/auth/recover', async (req, res) => {
  const { name, phone_last4, birthdate, pin } = req.body;
  try {
    const cfg = await auth.getAuth();
    const r   = cfg.recovery;
    if (name === r.name && phone_last4 === r.phone_last4 &&
        birthdate === r.birthdate && pin === r.pin) {
      return res.json({ success: true, password: cfg.password });
    }
    res.json({ success: false, error: '입력하신 정보가 일치하지 않습니다.' });
  } catch (e) {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.post('/auth/recover-reset', async (req, res) => {
  const { name, phone_last4, birthdate, pin, newPassword } = req.body;
  if (!newPassword) return res.json({ success: false, error: '새 비밀번호를 입력해주세요.' });
  try {
    const cfg = await auth.getAuth();
    const r   = cfg.recovery;
    if (name !== r.name || phone_last4 !== r.phone_last4 ||
        birthdate !== r.birthdate || pin !== r.pin) {
      return res.json({ success: false, error: '인증 정보가 일치하지 않습니다.' });
    }
    cfg.password = newPassword;
    await auth.saveAuth(cfg);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

/* ──────────────────────────────────────────
   이후 모든 라우트는 로그인 필요
────────────────────────────────────────── */
app.use(requireAuth);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/auth/me', (req, res) => {
  res.json({ id: req.userId });
});

app.post('/auth/change', async (req, res) => {
  const { currentPassword, newId, newPassword } = req.body;
  try {
    const cfg = await auth.getAuth();
    if (currentPassword !== cfg.password) {
      return res.json({ success: false, error: '현재 비밀번호가 올바르지 않습니다.' });
    }
    if (!newId || !newPassword) {
      return res.json({ success: false, error: '새 아이디와 비밀번호를 입력해주세요.' });
    }
    cfg.id       = newId.trim();
    cfg.password = newPassword;
    await auth.saveAuth(cfg);
    setAuthCookie(res, cfg.id);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.post('/auth/change-recovery', async (req, res) => {
  const { currentPassword, name, phone_last4, birthdate, pin } = req.body;
  try {
    const cfg = await auth.getAuth();
    if (currentPassword !== cfg.password) {
      return res.json({ success: false, error: '현재 비밀번호가 올바르지 않습니다.' });
    }
    if (!name || !phone_last4 || !birthdate || !pin) {
      return res.json({ success: false, error: '모든 항목을 입력해주세요.' });
    }
    cfg.recovery = {
      name:        name.trim(),
      phone_last4: phone_last4.trim(),
      birthdate:   birthdate.trim(),
      pin:         pin.trim(),
    };
    await auth.saveAuth(cfg);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

/* ──────────────────────────────────────────
   국토부 API 엔드포인트 매핑
────────────────────────────────────────── */
const ENDPOINTS = {
  'apt-trade':    'https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade',
  'apt-rent':     'https://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent',
  'villa-trade':  'https://apis.data.go.kr/1613000/RTMSDataSvcRHTrade/getRTMSDataSvcRHTrade',
  'house-trade':  'https://apis.data.go.kr/1613000/RTMSOBJSvc/getRTMSDataSvcSHRealTrade',
  'office-trade': 'https://apis.data.go.kr/1613000/RTMSOBJSvc/getRTMSDataSvcOffiTrade',
  'office-rent':  'https://apis.data.go.kr/1613000/RTMSOBJSvc/getRTMSDataSvcOffiRent',
};

/* ──────────────────────────────────────────
   실거래가 조회 API
────────────────────────────────────────── */
function getMonthRange(start, end) {
  const months = [];
  let y = parseInt(start.slice(0, 4));
  let m = parseInt(start.slice(4, 6));
  const ey = parseInt(end.slice(0, 4));
  const em = parseInt(end.slice(4, 6));
  while ((y < ey || (y === ey && m <= em)) && months.length < 60) {
    months.push(`${y}${String(m).padStart(2, '0')}`);
    if (++m > 12) { m = 1; y++; }
  }
  return months;
}

const dongCache = {};

async function fetchOneMonth(endpoint, serviceKey, regionCode, dealYmd) {
  const response = await axios.get(endpoint, {
    params:  { serviceKey, LAWD_CD: regionCode, DEAL_YMD: dealYmd, numOfRows: 1000, pageNo: 1 },
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 30000,
  });

  let parsed;
  if (typeof response.data === 'object') {
    parsed = response.data;
  } else {
    parsed = await xml2js.parseStringPromise(response.data, { explicitArray: false, trim: true });
  }

  const header = parsed?.response?.header;
  const resultCode = header?.resultCode?.toString();
  if (resultCode && resultCode !== '00' && resultCode !== '000' && resultCode !== '0') {
    throw new Error(`API 오류 [${resultCode}]: ${header?.resultMsg || '알 수 없는 오류'}`);
  }

  const body  = parsed?.response?.body;
  let items   = body?.items?.item ?? [];
  if (!Array.isArray(items)) items = items ? [items] : [];
  return { items, totalCount: parseInt(body?.totalCount || '0', 10) };
}

app.post('/api/search', async (req, res) => {
  const { regionCode, regionName, dealYmdStart, dealYmdEnd, tradeType } = req.body;

  if (!regionCode || !dealYmdStart || !dealYmdEnd || !tradeType) {
    return res.status(400).json({ error: '필수 파라미터가 누락되었습니다.' });
  }

  const isApt = tradeType === 'apt-trade' || tradeType === 'apt-rent';
  const rawKey = isApt
    ? (process.env.APT_SERVICE_KEY || req.headers['x-service-key'] || process.env.SERVICE_KEY || '')
    : (req.headers['x-service-key'] || process.env.SERVICE_KEY || '');
  if (!rawKey) {
    return res.status(400).json({
      error: 'API 서비스키가 없습니다. 설정(⚙)에서 서비스키를 입력하거나 환경변수에 SERVICE_KEY를 설정하세요.',
    });
  }

  const endpoint = ENDPOINTS[tradeType];
  if (!endpoint) {
    return res.status(400).json({ error: '지원하지 않는 거래 유형입니다.' });
  }

  try {
    const serviceKey = rawKey.includes('%') ? decodeURIComponent(rawKey) : rawKey;
    const months     = getMonthRange(dealYmdStart, dealYmdEnd);

    const results = await Promise.allSettled(
      months.map(ym => fetchOneMonth(endpoint, serviceKey, regionCode, ym))
    );

    const firstErr = results.find(r => r.status === 'rejected');
    if (firstErr && results.every(r => r.status === 'rejected')) {
      const msg = firstErr.reason?.message || '';
      return res.status(400).json({ error: msg || 'API 호출 실패' });
    }

    let allItems = [];
    let totalCount = 0;
    results.forEach(r => {
      if (r.status === 'fulfilled') {
        allItems  = allItems.concat(r.value.items);
        totalCount += r.value.totalCount;
      }
    });

    allItems.sort((a, b) => {
      const da  = `${a.dealYear || a['년']}${String(a.dealMonth || a['월']).padStart(2,'0')}${String(a.dealDay || a['일']).padStart(2,'0')}`;
      const db_ = `${b.dealYear || b['년']}${String(b.dealMonth || b['월']).padStart(2,'0')}${String(b.dealDay || b['일']).padStart(2,'0')}`;
      return db_.localeCompare(da);
    });

    const transactions = allItems.map(item => mapItem(item, tradeType, 0));

    /* 클라이언트에 즉시 응답 */
    res.json({ success: true, totalCount, fetchedCount: transactions.length, data: transactions });

    /* DB 저장 (응답 후 비동기 — Vercel 함수는 응답 후에도 잠시 실행됨) */
    (async () => {
      try {
        const dealYmd  = dealYmdStart === dealYmdEnd ? dealYmdStart : `${dealYmdStart}~${dealYmdEnd}`;
        const searchId = await db.saveSearch({
          regionCode,
          regionName: regionName || regionCode,
          dealYmd,
          tradeType,
          resultCount: transactions.length,
        });
        await db.saveTransactionBatch(transactions.map(tx => ({ ...tx, searchId })));
      } catch (e) {
        console.error('DB 저장 오류:', e.message);
      }
    })();

  } catch (err) {
    console.error('Search error:', err.message);
    if (err.response) {
      const body = err.response.data?.toString() || '';
      if (err.response.status === 500 && body.includes('Unexpected errors')) {
        return res.status(400).json({
          error: 'API 서비스키가 유효하지 않습니다. 설정(⚙)에서 올바른 서비스키를 입력하거나 환경변수의 SERVICE_KEY를 확인하세요.',
        });
      }
      return res.status(err.response.status).json({ error: `API 서버 오류: HTTP ${err.response.status}` });
    }
    res.status(500).json({ error: '조회 중 오류가 발생했습니다: ' + err.message });
  }
});

/* ──────────────────────────────────────────
   API 항목 매핑 함수
────────────────────────────────────────── */
function t(val) {
  if (val == null) return '';
  return val.toString().trim();
}

function mapItem(item, tradeType, searchId) {
  const useEnglishFields = tradeType === 'villa-trade' || tradeType === 'apt-trade' || tradeType === 'apt-rent';
  const base = useEnglishFields ? {
    searchId,
    deal_year:  t(item['dealYear']),
    deal_month: t(item['dealMonth']).padStart(2, '0'),
    deal_day:   t(item['dealDay']).padStart(2, '0'),
    area:       parseFloat(item['excluUseAr']) || null,
    floor:      t(item['floor']),
    build_year: t(item['buildYear']),
    dong:       t(item['umdNm']),
  } : {
    searchId,
    deal_year:  t(item['년']),
    deal_month: t(item['월']).padStart(2, '0'),
    deal_day:   t(item['일']).padStart(2, '0'),
    area:       parseFloat(item['전용면적']) || null,
    floor:      t(item['층']),
    build_year: t(item['건축년도']),
    dong:       t(item['법정동']),
  };

  switch (tradeType) {
    case 'apt-trade':
      return { ...base,
        apt_name:    t(item['aptNm']),
        deal_amount: t(item['dealAmount']).replace(/,/g, ''),
        road_name:   t(item['jibun']),
        deal_type:   t(item['dealingGbn']),
        cancel_yn:   t(item['cdealType']),
        cancel_date: t(item['cdealDay']),
      };
    case 'apt-rent':
      return { ...base,
        apt_name:        t(item['aptNm']),
        deposit:         t(item['deposit'] || item['보증금액'] || '').toString().replace(/,/g, ''),
        monthly_rent:    t(item['monthlyRent'] || item['월세금액'] || '0').toString().replace(/,/g, '') || '0',
        contract_type:   t(item['contractType'] || item['계약구분'] || ''),
        contract_period: t(item['contractPeriod'] || item['계약기간'] || ''),
      };
    case 'villa-trade':
      return { ...base,
        apt_name:    t(item['mhouseNm']),
        deal_amount: t(item['dealAmount']).replace(/,/g, ''),
        road_name:   t(item['jibun']),
        deal_type:   t(item['dealingGbn']),
        cancel_yn:   t(item['cdealType']),
      };
    case 'house-trade':
      return { ...base,
        apt_name:    t(item['건물명']),
        deal_amount: t(item['거래금액']).replace(/,/g, ''),
        house_type:  t(item['주택유형']),
        deal_type:   t(item['거래유형']),
      };
    case 'office-trade':
      return { ...base,
        apt_name:    t(item['단지']),
        deal_amount: t(item['거래금액']).replace(/,/g, ''),
        road_name:   t(item['도로명']),
        deal_type:   t(item['거래유형']),
        cancel_yn:   t(item['해제여부']),
      };
    case 'office-rent':
      return { ...base,
        apt_name:        t(item['단지']),
        deposit:         t(item['보증금액']).replace(/,/g, ''),
        monthly_rent:    t(item['월세금액']).replace(/,/g, '') || '0',
        contract_type:   t(item['계약구분']),
        contract_period: t(item['계약기간']),
      };
    default:
      return base;
  }
}

/* ──────────────────────────────────────────
   읍면동 목록 API
────────────────────────────────────────── */
app.get('/api/dongs', async (req, res) => {
  const { regionCode, tradeType = 'villa-trade' } = req.query;
  if (!regionCode) return res.json([]);

  const rawKey = req.headers['x-service-key'] || process.env.SERVICE_KEY || '';
  if (!rawKey) return res.json([]);

  const cacheKey = `${regionCode}_${tradeType}`;
  if (dongCache[cacheKey]) return res.json(dongCache[cacheKey]);

  const endpoint   = ENDPOINTS[tradeType] || ENDPOINTS['villa-trade'];
  const serviceKey = rawKey.includes('%') ? decodeURIComponent(rawKey) : rawKey;
  const now        = new Date();
  const dongs      = new Set();

  for (let i = 1; i <= 3; i++) {
    const d  = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const ym = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
    try {
      const { items } = await fetchOneMonth(endpoint, serviceKey, regionCode, ym);
      items.forEach(item => {
        const dong = tradeType === 'villa-trade' ? item.umdNm : (item['법정동'] || '');
        if (dong?.trim()) dongs.add(dong.trim());
      });
      if (dongs.size > 0) break;
    } catch (_) {}
  }

  const result = [...dongs].sort((a, b) => a.localeCompare(b, 'ko'));
  if (result.length > 0) dongCache[cacheKey] = result;
  res.json(result);
});

/* ──────────────────────────────────────────
   이력 API
────────────────────────────────────────── */
app.get('/api/history', async (_req, res) => {
  try { res.json(await db.getHistory()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/history/:id/transactions', async (req, res) => {
  try { res.json(await db.getTransactions(parseInt(req.params.id, 10))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/history/batch', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'ids 배열이 필요합니다.' });
  }
  try { await db.deleteSearchBatch(ids.map(Number)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/history/all', async (_req, res) => {
  try { await db.deleteAllSearches(); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/history/:id', async (req, res) => {
  try { await db.deleteSearch(parseInt(req.params.id, 10)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* ──────────────────────────────────────────
   경매 API
────────────────────────────────────────── */

/** 금액 파싱: Excel 원(₩) 단위 → 만원 단위 정수 */
function parseAmount(val) {
  if (val == null || val === '') return null;
  const str = val.toString().replace(/[,\s]/g, '');
  const num = parseFloat(str);
  if (isNaN(num)) return null;
  // Excel 값이 원(₩) 단위이므로 만원으로 변환
  return Math.round(num / 10000);
}

/** 날짜 파싱: Excel 숫자 직렬 or 문자열 → 'YYYY-MM-DD' */
function parseBidDate(val) {
  if (val == null || val === '') return null;
  if (typeof val === 'number') {
    const d = XLSX.SSF.parse_date_code(val);
    if (d) return `${d.y}-${String(d.m).padStart(2,'0')}-${String(d.d).padStart(2,'0')}`;
  }
  return val.toString().trim() || null;
}

/** 평수 파싱: "25.85㎡ (7.82평)" 형식에서 평 값 추출, 순수 숫자도 허용 */
function parsePyeong(val) {
  if (val == null) return null;
  const str = val.toString();
  const m = str.match(/\(([0-9.]+)평\)/);
  if (m) return parseFloat(m[1]) || null;
  const n = parseFloat(str);
  return isNaN(n) ? null : n;
}

/** 주소에서 층수 추출: "5층", "(3층)", "B2층" 등 */
function parseFloor(address) {
  if (!address) return null;
  const s = address.toString();
  // 지하층: B1, 지1, 지하1 → 음수
  const basem = s.match(/(?:B|지하|지)\s*(\d+)\s*층/i);
  if (basem) return -parseInt(basem[1], 10);
  // 지상층: 숫자+층
  const m = s.match(/(\d{1,3})\s*층/);
  return m ? parseInt(m[1], 10) : null;
}

/** 상태 정규화: "진행" → "진행중" */
function normalizeStatus(val) {
  if (!val) return null;
  const s = val.toString().trim();
  if (s === '진행') return '진행중';
  return s;
}

/** Excel 행 → auction 객체 매핑 */
function mapExcelRow(row) {
  const g = (...keys) => {
    for (const k of keys) {
      const v = row[k];
      if (v !== null && v !== undefined && v !== '') return v;
    }
    return null;
  };
  return {
    case_no:         g('경매사건번호')?.toString().trim() || null,
    item_type:       g('물건종류')?.toString().trim() || null,
    region:          g('지역')?.toString().trim() || null,
    bid_date:        parseBidDate(g('입찰일')),
    status:          normalizeStatus(g('상태')),
    appraisal_price: parseAmount(g('감정가')),
    winning_price:   parseAmount(g('낙찰가')),
    min_price:       parseAmount(g('최저가')),
    official_price:  parseAmount(g('공시')),
    jeonse_market:   parseAmount(g('전세 시세', '전세시세')),
    sale_market:     parseAmount(g('매매 시세', '매매시세')),
    building_area:   parsePyeong(g('건물평수')),
    land_area:       parsePyeong(g('대지평수')),
    address:         g('주소')?.toString().trim() || null,
    floor:           parseFloor(g('주소')?.toString()),
    notes:           g('체크사항')?.toString().trim() || null,
  };
}

/* GET /api/auction/template – 업로드 양식 엑셀 다운로드 */
app.get('/api/auction/template', requireAuth, (_req, res) => {
  const tplPath = path.join(__dirname, '물건추천 - 리스트_날짜_양식.xlsx');
  if (fs.existsSync(tplPath)) {
    res.setHeader('Content-Disposition', "attachment; filename*=UTF-8''%EB%AC%BC%EA%B1%B4%EC%B6%94%EC%B2%9C%20-%20%EB%A6%AC%EC%8A%A4%ED%8A%B8_%EB%82%A0%EC%A7%9C_%EC%96%91%EC%8B%9D.xlsx");
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(fs.readFileSync(tplPath));
  }
  // 파일 없으면 동적 생성
  const LIST_HEADERS = ['순번','경매사건번호','물건종류','지역','입찰일','상태','감정가','낙찰가','최저가','공시','체크사항','전세 시세','전세 차익','매매 시세','매매 차익','건물평수','대지평수','주소','체크사항'];
  const TITLE_ROW = Array(LIST_HEADERS.length).fill(null).map((_, i) => i === 12 ? '물건 추천 날짜기준\n* 낙찰건 제외' : null);
  const listAoa = [TITLE_ROW, Array(LIST_HEADERS.length).fill(null), Array(LIST_HEADERS.length).fill(null), LIST_HEADERS];
  const listWs = XLSX.utils.aoa_to_sheet(listAoa);
  listWs['!cols'] = [6,20,12,8,14,8,14,14,14,14,16,14,14,14,14,18,18,50,20].map(wch => ({ wch }));
  const WON_HEADERS = ['순번','경매사건번호','지역','입찰일','상태','감정가','낙찰가(만원)','최저가','공시'];
  const wonWs = XLSX.utils.aoa_to_sheet([WON_HEADERS]);
  wonWs['!cols'] = [6,20,8,10,8,14,14,14,14].map(wch => ({ wch }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, listWs, '경매목록');
  XLSX.utils.book_append_sheet(wb, wonWs, '낙찰 된것');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', "attachment; filename*=UTF-8''%EB%AC%BC%EA%B1%B4%EC%B6%94%EC%B2%9C%20-%20%EB%A6%AC%EC%8A%A4%ED%8A%B8_%EB%82%A0%EC%A7%9C_%EC%96%91%EC%8B%9D.xlsx");
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
});

/* GET /api/auction */
app.get('/api/auction', async (_req, res) => {
  try { res.json(await db.getAuctions()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* POST /api/auction/upload  – 브라우저에서 파싱된 JSON rows 수신 */
app.post('/api/auction/upload', async (req, res) => {
  const { rows, filename } = req.body;
  if (!Array.isArray(rows) || !rows.length)
    return res.status(400).json({ error: '데이터가 없습니다.' });

  console.log(`[auction upload] 파일: ${filename || '?'}, 행: ${rows.length}행`);

  // case_no 있는 행만 유효
  const valid = rows.filter(r => r.case_no);
  if (!valid.length) return res.status(400).json({ error: '유효한 데이터 행이 없습니다.' });

  // 중복 case_no 제거 (마지막 행 우선)
  const seenCaseNo = new Map();
  valid.forEach(r => { if (r.case_no) seenCaseNo.set(r.case_no, r); });
  const auctions = [...seenCaseNo.values()];

  try {
    const result = await db.upsertAuctions(auctions);
    const parts = [`진행중 ${result.upserted - result.markedAsNew}건`];
    if (result.markedAsNew > 0) parts.push(`신건 ${result.markedAsNew}건`);
    if (result.markedAsWon > 0) parts.push(`낙찰 ${result.markedAsWon}건`);
    res.json({
      success: true,
      upserted:    result.upserted,
      markedAsWon: result.markedAsWon,
      markedAsNew: result.markedAsNew,
      wonCaseNos:  result.wonCaseNos || [],
      message: parts.join(', ') + ' 처리완료',
    });
  } catch (e) {
    console.error('auction upload error:', e);
    const msg = e.message || '';
    if (msg.includes('schema cache') || msg.includes('Could not find the column')) {
      return res.status(500).json({ error: `DB 컬럼 오류: ${msg}\nSupabase SQL Editor에서 누락된 컬럼을 추가해주세요.` });
    }
    if (msg.includes('does not exist') || msg.includes('Could not find the table')) {
      return res.status(500).json({ error: 'Supabase에 auctions 테이블이 없습니다. Supabase SQL Editor에서 테이블을 먼저 생성해주세요.' });
    }
    res.status(500).json({ error: msg || '업로드 처리 중 오류가 발생했습니다.' });
  }
});

/* POST /api/auction/mark-won  – 1단계: case_no 목록으로 낙찰/변경 처리 */
app.post('/api/auction/mark-won', async (req, res) => {
  const { caseNos = [], wonSheetCaseNos = [], wonSheetExists = false } = req.body;
  try {
    const result = await db.markWonAuctions(caseNos, wonSheetCaseNos, wonSheetExists);
    res.json({ success: true, ...result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* POST /api/auction/upsert-rows  – 2단계: rows 배치 upsert */
app.post('/api/auction/upsert-rows', async (req, res) => {
  const { rows = [], existingCaseNos = [] } = req.body;
  if (!rows.length) return res.json({ success: true, upserted: 0, markedAsNew: 0 });
  try {
    const result = await db.upsertAuctionRows(rows, existingCaseNos);
    res.json({ success: true, ...result });
  } catch (e) {
    console.error('[upsert-rows]', e);
    res.status(500).json({ error: e.message, details: e.details, hint: e.hint, code: e.code });
  }
});

/* POST /api/auction/won-prices  – 낙찰된 항목의 낙찰가 업데이트 */
app.post('/api/auction/won-prices', async (req, res) => {
  const { prices } = req.body; // { case_no: winning_price(만원) }
  if (!prices || typeof prices !== 'object' || !Object.keys(prices).length)
    return res.json({ success: true, updated: 0 });
  try {
    await db.updateWonPrices(prices);
    res.json({ success: true, updated: Object.keys(prices).length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* PUT /api/auction/:id  (매매시세·전세시세 등 단일 필드 수정) */
app.put('/api/auction/:id', async (req, res) => {
  const id     = parseInt(req.params.id, 10);
  const fields = req.body;
  const allowed = ['sale_market', 'jeonse_market', 'status', 'notes', 'winning_price', 'bid_date'];
  const safe = {};
  allowed.forEach(k => { if (k in fields) safe[k] = fields[k]; });
  if (!Object.keys(safe).length) return res.status(400).json({ error: '수정할 필드가 없습니다.' });
  try { await db.updateAuction(id, safe); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/auction/batch */
app.delete('/api/auction/batch', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: 'ids 배열이 필요합니다.' });
  try { await db.deleteAuctionBatch(ids.map(Number)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/auction/all */
app.delete('/api/auction/all', async (_req, res) => {
  try { await db.deleteAllAuctions(); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/auction/:id */
app.delete('/api/auction/:id', async (req, res) => {
  try { await db.deleteAuction(parseInt(req.params.id, 10)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* POST /api/auction/migrate-status – 신규 → 신건 일괄 변경 */
app.post('/api/auction/migrate-status', async (_req, res) => {
  try {
    const supabase = require('./lib/supabase');
    const { data, error } = await supabase
      .from('auctions')
      .update({ status: '신건', updated_at: new Date().toISOString() })
      .eq('status', '신규');
    if (error) throw error;
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* POST /api/auction/migrate-floor – 기존 주소 데이터에서 층수 일괄 파싱 */
app.post('/api/auction/migrate-floor', async (_req, res) => {
  try {
    const all = await db.getAuctions();
    const toUpdate = all.filter(r => r.address && r.floor == null);
    if (!toUpdate.length) return res.json({ success: true, updated: 0, message: '업데이트할 데이터 없음' });

    const supabase = require('./lib/supabase');
    const CHUNK = 500;
    let updated = 0;
    for (let i = 0; i < toUpdate.length; i += CHUNK) {
      const chunk = toUpdate.slice(i, i + CHUNK);
      for (const r of chunk) {
        const floor = parseFloor(r.address);
        if (floor != null) {
          await supabase.from('auctions').update({ floor }).eq('id', r.id);
          updated++;
        }
      }
    }
    res.json({ success: true, updated, total: toUpdate.length });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ──────────────────────────────────────────
   나만의 경매물건 API
────────────────────────────────────────── */

/* GET /api/my-auction */
app.get('/api/my-auction', async (_req, res) => {
  try { res.json(await db.getMyAuctions()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* ── 갱신 공통 상수 ── */
function _parseCaseNo(caseNo) {
  const m = (caseNo || '').match(/(\d{4})[^\d]*(\d+)/);
  return m ? { syear: m[1], sno: m[2] } : null;
}
const _YONGDO_MAP = {
  '아파트':'01','다세대':'02','다세대(빌라)':'02','빌라':'02',
  '주택':'03','단독주택':'03','근린주택':'05',
  '다가구':'06','다가구(원룸등)':'06','원룸':'06','도시형생활주택':'07',
  '근린상가':'11','공장':'12','오피스텔':'13','근린시설':'14',
  '숙박시설':'15','창고':'16','아파트형공장':'17','주유소':'18',
  '목욕탕':'19','의료시설':'20','노유자시설':'21','사무실':'22',
  '자동차관련시설':'23','장례관련시설':'24','문화및집회시설':'25',
  '농지':'31','임야':'33','대지':'34','도로':'35','잡종지':'36',
  '과수원':'37','목장용지':'38','공장용지':'39','유지':'40',
  '구거':'41','하천':'42','제방':'43','기타용지':'44',
  '창고용지':'45','학교용지':'46','체육용지':'47','종교용지':'48',
  '숙박(콘도등)':'52','묘지':'53','주차장':'55','교육시설':'56',
  '어업권':'57','광업권':'58','염전':'59','양어장':'60',
  '승용자동차':'71','SUV':'72','승합자동차':'73','화물자동차':'74',
  '중장비':'75','덤프트럭':'76','선박':'78','항공기':'79',
};
// 탱크옥션 ctgr 코드 매핑 (DB item_type → tankauction ctgr 파라미터)
const _TANK_CTGR_MAP = {
  '아파트':            '201013',
  '연립주택':          '201014',
  '다세대':            '201015,201017,201021',
  '다세대(빌라)':      '201015,201017,201021',
  '빌라':              '201015,201017,201021',
  '오피스텔':          '201020,201111,201019',
  '오피스텔(주거)':    '201020',
  '오피스텔(상업)':    '201111,201019',
  '단독주택':          '201010',
  '주택':              '201010',
  '근린주택':          '201010',
  '다가구':            '201011,201012',
  '다가구(원룸등)':    '201011,201012',
  '원룸':              '201011,201012',
  '도시형생활주택':    '201022',
  '기숙사':            '201016',
  '상가주택':          '201018',
  '근린생활시설':      '201110,201120,201124',
  '근린시설':          '201110,201120,201124',
  '근린상가':          '201130',
  '숙박시설':          '201122',
  '숙박(콘도등)':      '201123',
  '목욕탕':            '201131',
  '업무시설':          '201121',
  '사무실':            '201121',
  '노유자시설':        '201118',
  '문화및집회시설':    '201112',
  '종교시설':          '201113',
  '의료시설':          '201116',
  '교육시설':          '201117',
  '교육연구시설':      '201117',
  '지식산업센터':      '201216',
  '아파트형공장':      '201216',
  '공장':              '201210',
  '창고':              '201211',
  '창고시설':          '201211',
  '자동차관련시설':    '201213',
  '농지':              '101010,101011,101012',
  '전':                '101010',
  '답':                '101011',
  '과수원':            '101012',
  '임야':              '101014',
  '대지':              '101017',
  '잡종지':            '101037',
  '도로':              '101023',
  '주차장':            '101020',
  '묘지':              '101036',
  '목장용지':          '101013',
  '공장용지':          '101018',
  '학교용지':          '101019',
  '주유소':            '101021',
  '주유소용지':        '101021',
  '창고용지':          '101022',
  '체육용지':          '101032',
  '종교용지':          '101034',
  '하천':              '101026',
  '구거':              '101027',
  '염전':              '101016',
  '유지':              '101028',
  '양어장':            '101029',
  '승용자동차':        '301010',
  'SUV':               '301010',
  '승합자동차':        '301011',
  '화물자동차':        '301013',
  '중장비':            '301113,301111,301112',
  '덤프트럭':          '301110',
  '선박':              '301210',
  '어업권':            '401010',
  '광업권':            '401011',
};
// 탱크옥션 직접조회 시/도 코드
const _TANK_SI_MAP = {
  '전체': '0', '서울': '11', '부산': '21', '대구': '22', '인천': '23',
  '광주': '24', '대전': '25', '울산': '26', '세종': '29', '경기': '31',
  '강원': '32', '충북': '33', '충남': '34', '전북': '35', '전남': '36',
  '경북': '37', '경남': '38', '제주': '39',
};
// 탱크옥션 직접조회 물건종류 → ctgr 코드 (전체 + 주요 분류)
const _TANK_FETCH_CTGR = {
  '전체':     '0',
  '아파트':   '201013',
  '빌라/다세대': '201015,201017,201021',
  '단독주택': '201010',
  '다가구':   '201011,201012',
  '오피스텔': '201020,201111,201019',
  '근린시설': '201110,201120,201124,201130',
  '공장/창고':'201210,201211',
  '토지':     '101010,101011,101012,101014,101017,101037',
};

const _REFRESH_SITE_CFG = {
  bossauction: {
    host: 'https://www.bossauction.co.kr',
    searchUrl: (caseNo, itemType) => {
      const p = _parseCaseNo(caseNo); if (!p) return null;
      const yd = _YONGDO_MAP[(itemType||'').trim()] || '';
      return `https://www.bossauction.co.kr/auction/list_pub.html?page=1&listnum=0&syear=${p.syear}&sno=${p.sno}${yd?`&yongdo=${yd}`:''}`;
    },
  },
  tankauction: {
    host: 'https://www.tankauction.com',
    // POST 방식: AuctList.php에 sn1/sn2로 검색 → JSON 응답
    auctListUrl: 'https://www.tankauction.com/ca/AuctList.php?srchCase=srchAll&pageNo=1&dataSize=20&pageSize=10',
    sessionUrl:  'https://www.tankauction.com/ca/caList.php',
  },
};

/* ── 탱크옥션 세션 캐시 (5분 TTL) ── */
let _tankSessionCache = { value: '', expiresAt: 0 };
const _TANK_BASE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function getTankSession() {
  const now = Date.now();
  if (_tankSessionCache.value && now < _tankSessionCache.expiresAt) {
    return _tankSessionCache.value;
  }
  const cfg = _REFRESH_SITE_CFG.tankauction;
  try {
    const r0 = await axios.get(cfg.sessionUrl, {
      headers: {
        'User-Agent': _TANK_BASE_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
      },
      timeout: 30000, maxRedirects: 5,
    });
    const sc  = r0.headers['set-cookie'] || [];
    const ph  = sc.find(c => c.startsWith('PHPSESSID'));
    if (!ph) throw new Error('탱크옥션 세션 획득 실패');
    const session = ph.split(';')[0];
    _tankSessionCache = { value: session, expiresAt: now + 5 * 60 * 1000 };
    return session;
  } catch (e) {
    _tankSessionCache = { value: '', expiresAt: 0 }; // 실패 시 캐시 즉시 초기화
    throw e;
  }
}

/* ── 공통 갱신 헬퍼: SSE + 병렬 5개 동시 + timeout 10s ── */
async function runAuctionRefresh(req, res, { getItems, updateItem, bidDateField, statusField }) {
  const { site, cookie, ids, noLogin } = req.body;
  // tankauction은 쿠키 자동 처리 (로그인 불필요), bossauction noLogin도 쿠키 불필요
  if (!site || (!cookie && site !== 'tankauction' && !noLogin))
    return res.status(400).json({ error: '사이트와 쿠키가 필요합니다.' });
  const cfg = _REFRESH_SITE_CFG[site];
  if (!cfg) return res.status(400).json({ error: '지원하지 않는 사이트입니다.' });

  // SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (data) => {
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (typeof res.flush === 'function') res.flush();
    }
  };

  const BASE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0';
  const cookieHeader = cookie ? (cookie.includes('=') ? cookie : `PHPSESSID=${cookie}`) : '';
  const headers = {
    'Cookie': cookieHeader,
    'User-Agent': BASE_UA,
    'Referer': cfg.host,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9',
  };

  // ── 탱크옥션 전용: PHPSESSID 자동 획득 ──
  let tankSession = '';
  if (site === 'tankauction') {
    try {
      tankSession = await getTankSession();
    } catch(e) { send({ type: 'error', error: '탱크옥션 연결 실패: ' + e.message }); res.end(); return; }
  }

  let items;
  try { items = await getItems(); }
  catch (e) { send({ type: 'error', error: 'DB 조회 실패: ' + e.message }); res.end(); return; }

  const idSet   = Array.isArray(ids) && ids.length > 0 ? new Set(ids.map(Number)) : null;
  const targets = items.filter(a => a.case_no && (!idSet || idSet.has(a.id)));
  const total   = targets.length;

  if (!total) { send({ type: 'complete', updated: 0, skipped: 0, failed: 0, details: [] }); res.end(); return; }

  send({ type: 'start', total });

  let updated = 0, skipped = 0, failed = 0, done = 0;
  const details = [];
  let sessionExpired = false;

  async function processOne(auction) {
    if (sessionExpired) return;
    try {
      let parsed;

      if (site === 'tankauction') {
        // ── 탱크옥션: POST AuctList.php ──
        const p = _parseCaseNo(auction.case_no);
        if (!p) {
          details.push({ case_no: auction.case_no, msg: '사건번호 형식 오류' });
          failed++; done++;
          send({ type: 'progress', done, total, updated, skipped, failed });
          return;
        }
        const tankCtgr = _TANK_CTGR_MAP[(auction.item_type || '').trim()] || '0';
        const tankBody = qs.stringify({
          siCd:'0', guCd:'', dnCd:'', sptCd:'0', addr_cs_key:'', adrPlural:'',
          adrPlural_cnt:'0', adrsEtcSelect:'0', adrsEtc:'', ctgr: tankCtgr,
          sn1: p.syear, sn2: p.sno, pn:'', stat:'0',
          fbCntBgn:'0', fbCntEnd:'0', bgnDt:'', endDt:'',
          apslAmtBgn:'0', apslAmtEnd:'0', powerCtgrs:'0', chkCtgrsCd:'',
          chkSplCdtn:'', chkPrpsCdtn:'', dataSize:'20',
          lsType:'0', odrCol:'14', odrAds:'0', srchFR:'0', idxFR:'0', ck_photo:'0',
        });
        const tankHeaders = {
          'Cookie': tankSession,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': BASE_UA,
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'X-Requested-With': 'XMLHttpRequest',
          'Referer': 'https://www.tankauction.com/ca/caList.php',
          'Origin': 'https://www.tankauction.com',
        };
        const resp = await axios.post(cfg.auctListUrl, tankBody, { headers: tankHeaders, timeout: 10000 });
        const data = resp.data;
        if (!data || !Array.isArray(data.item) || data.item.length === 0) {
          details.push({ case_no: auction.case_no, msg: `데이터 없음 (totalCnt=${data && data.totalCnt != null ? data.totalCnt : '?'})` });
          skipped++; done++;
          send({ type: 'progress', done, total, updated, skipped, failed });
          return;
        }
        parsed = parseTankAuctionItem(data.item[0]);

      } else {
        // ── 대장옥션 등: GET searchUrl ──
        const url = cfg.searchUrl(auction.case_no, auction.item_type);
        if (!url) {
          details.push({ case_no: auction.case_no, msg: '사건번호 형식 오류' });
          failed++; done++;
          send({ type: 'progress', done, total, updated, skipped, failed });
          return;
        }
        const resp = await axios.get(url, {
          headers: noLogin ? { 'User-Agent': BASE_UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Accept-Language': 'ko-KR,ko;q=0.9' } : headers,
          timeout: 10000, maxRedirects: 5,
        });
        const html = typeof resp.data === 'string' ? resp.data : JSON.stringify(resp.data);

        if (!noLogin && (html.includes('로그인을 해주세요') || (html.includes('login.html') && !html.includes('매각기일')))) {
          sessionExpired = true;
          send({ type: 'error', error: '세션이 만료되었습니다. 쿠키를 다시 입력해주세요.' });
          return;
        }
        parsed = parseAuctionHtml(html, site);
      }

      const changes = {};
      if (parsed.bid_date       && parsed.bid_date       !== auction[bidDateField]) changes[bidDateField] = parsed.bid_date;
      if (parsed.min_price      && parsed.min_price      !== auction.min_price)      changes.min_price      = parsed.min_price;
      if (parsed.official_price && parsed.official_price !== auction.official_price) changes.official_price = parsed.official_price;
      if (parsed.status         && parsed.status         !== auction[statusField])   changes[statusField]   = parsed.status;
      if (parsed.winning_price  && parsed.winning_price  !== auction.winning_price)  changes.winning_price  = parsed.winning_price;

      if (Object.keys(changes).length === 0) {
        const hasData = parsed.bid_date || parsed.min_price || parsed.official_price || parsed.status;
        details.push({ case_no: auction.case_no, msg: hasData
          ? `변동 없음 (상태:${parsed.status||'-'} 입찰일:${parsed.bid_date||'-'} 최저가:${parsed.min_price||'-'} 낙찰가:${parsed.winning_price||'-'})`
          : `데이터 미확인 - 파싱결과: 상태=${parsed.status} 입찰일=${parsed.bid_date} 최저가=${parsed.min_price} 낙찰가=${parsed.winning_price}` });
        if (!hasData) failed++; else skipped++;
      } else {
        await updateItem(auction.id, changes);
        details.push({ case_no: auction.case_no, msg: `업데이트: ${Object.entries(changes).map(([k,v])=>`${k}=${v}`).join(', ')}` });
        updated++;
      }
    } catch (e) {
      details.push({ case_no: auction.case_no, msg: `오류: ${e.message}` });
      failed++;
    }
    done++;
    send({ type: 'progress', done, total, updated, skipped, failed });
  }

  // 5개 동시 처리 (워커 풀)
  let idx = 0;
  async function worker() {
    while (idx < targets.length && !sessionExpired) {
      await processOne(targets[idx++]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(5, targets.length) }, worker));

  if (!sessionExpired) send({ type: 'complete', updated, skipped, failed, details });
  res.end();
}

/* POST /api/my-auction/refresh */
app.post('/api/my-auction/refresh', (req, res) =>
  runAuctionRefresh(req, res, {
    getItems:     () => db.getMyAuctions(),
    updateItem:   (id, f) => db.updateMyAuction(id, f),
    bidDateField: 'my_bid_date',
    statusField:  'my_status',
  })
);

/* POST /api/auction/refresh */
app.post('/api/auction/refresh', requireAuth, (req, res) =>
  runAuctionRefresh(req, res, {
    getItems:     () => db.getAuctions(),
    updateItem:   (id, f) => db.updateAuction(id, f),
    bidDateField: 'bid_date',
    statusField:  'status',
  })
);

/** 탱크옥션 AuctList.php JSON item → 공통 파싱 결과 */
function parseTankAuctionItem(item) {
  const toMan = (v) => (v && typeof v === 'number') ? Math.round(v / 10000) : null;

  // statNm: HTML 태그 제거 → 상태 텍스트
  const statText = (item.statNm || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  let status = null;
  if (/배당종결/.test(statText))      status = '배당종결';
  else if (/취하/.test(statText))     status = '취하';
  else if (/기각/.test(statText))     status = '기각';
  else if (/불허가/.test(statText))   status = '불허가';
  else if (/정지/.test(statText))     status = '정지';
  else if (/매각/.test(statText))     status = '매각';
  else if (/낙찰/.test(statText))     status = '낙찰';
  else {
    const ym = statText.match(/유찰\s*(\d+)회/);
    if (ym)                           status = `유찰${ym[1]}회`;
    else if (/유찰/.test(statText))   status = '유찰';
    else if (/신건/.test(statText))   status = '신건';
    else if (/진행/.test(statText))   status = '진행중';
    else if (/변경/.test(statText))   status = '변경';
    else if (statText)                status = statText;
  }

  // bidDt: "25.12.04" → "2025-12-04"
  let bid_date = null;
  const bd = (item.bidDt || '').trim();
  const bdm = bd.match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
  if (bdm) {
    const yr = parseInt(bdm[1], 10) >= 90 ? `19${bdm[1]}` : `20${bdm[1]}`;
    bid_date = `${yr}-${bdm[2]}-${bdm[3]}`;
  }

  return {
    bid_date,
    min_price:      toMan(item.minbAmt),
    official_price: toMan(item.apslAmt),
    winning_price:  null, // 비회원 비공개
    status,
  };
}

/** 탱크옥션 AuctList item → direct_auctions 전체 컬럼 파싱 */
function parseTankAuctionFullItem(item) {
  const toMan = (v) => (v && typeof v === 'number') ? Math.round(v / 10000) : null;
  const toArea평 = (v) => {
    const f = v != null ? parseFloat(v) : null;
    return f != null && !isNaN(f) ? Math.round(f / 3.3058 * 100) / 100 : null;
  };

  // 상태 파싱 (기존 parseTankAuctionItem과 동일)
  const statText = (item.statNm || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  let status = null;
  if      (/배당종결/.test(statText)) status = '배당종결';
  else if (/취하/.test(statText))     status = '취하';
  else if (/기각/.test(statText))     status = '기각';
  else if (/불허가/.test(statText))   status = '불허가';
  else if (/정지/.test(statText))     status = '정지';
  else if (/매각/.test(statText))     status = '매각';
  else if (/낙찰/.test(statText))     status = '낙찰';
  else {
    const ym = statText.match(/유찰\s*(\d+)회/);
    if (ym)                           status = `유찰${ym[1]}회`;
    else if (/유찰/.test(statText))   status = '유찰';
    else if (/신건/.test(statText))   status = '신건';
    else if (/진행/.test(statText))   status = '진행중';
    else if (/변경/.test(statText))   status = '변경';
    else if (statText)                status = statText;
  }

  // 입찰일 파싱
  let bid_date = null;
  const bd = (item.bidDt || '').trim();
  const bdm = bd.match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
  if (bdm) {
    const yr = parseInt(bdm[1], 10) >= 90 ? `19${bdm[1]}` : `20${bdm[1]}`;
    bid_date = `${yr}-${bdm[2]}-${bdm[3]}`;
  }

  // 지역: siNm + guNm
  const si = (item.siNm || '').trim();
  const gu = (item.guNm || '').trim();
  const region = si && gu ? `${si} ${gu}` : (si || gu || null);

  // 주소: addrAll > addr > addr1+addr2
  const addr = (item.addrAll || item.addr || ((item.addr1 || '') + ' ' + (item.addr2 || '')).trim() || '').trim() || null;

  // case_no: csNo > caseNo
  const case_no = (item.csNo || item.caseNo || item.cs_no || '').trim() || null;

  // item_type: goodsNm > ctgrNm
  const item_type = (item.goodsNm || item.ctgrNm || item.goods_nm || '').trim() || null;

  // 면적: 탱크는 ㎡ 단위 → 평 변환
  const building_area = toArea평(item.bdFrAr ?? item.buildAr ?? item.totFrAr);
  const land_area     = toArea평(item.ldFrAr ?? item.landAr);

  return {
    case_no, item_type, region,
    bid_date, status,
    appraisal_price: toMan(item.apslAmt),
    min_price:       toMan(item.minbAmt),
    official_price:  toMan(item.offLandAmt ?? item.pubLandAmt ?? item.oflAmt),
    winning_price:   null,
    building_area, land_area,
    floor:           parseFloor(addr),
    address:         addr,
    source:          'tankauction',
  };
}

/** HTML에서 입찰일·최저가·공시가 파싱 */
function parseAuctionHtml(html, site) {
  const toMan = (str) => str ? Math.round(parseInt(str.replace(/,/g, ''), 10) / 10000) : null;

  // ── 대장옥션 파싱 ──
  if (site === 'bossauction') {
    // 매각기일: "2026-04-14<br/>(10:00)" 또는 "2026-04-14 (10:00)" 형태
    const dateM = html.match(/(\d{4}-\d{2}-\d{2})(?:<br\s*\/?>|\s)*\([\d:]+\)/);
    // 실제 가격은 "최저가&nbsp;&nbsp;131,600,000" 형태
    // 필터 SELECT의 value="5000000" 같은 값은 &nbsp; 없이 나와 구분됨
    const minM = html.match(/최저가(?:&nbsp;|[\u00A0\s])+(\d{1,3}(?:,\d{3})+)/);
    const gamM = html.match(/감정가(?:&nbsp;|[\u00A0\s])+(\d{1,3}(?:,\d{3})+)/);
    const wonM = html.match(/낙찰가(?:&nbsp;|[\u00A0\s])+(\d{1,3}(?:,\d{3})+)/);

    // 상태 파싱: 종결 상태를 유찰 이력보다 먼저 확인 (유찰 후 취하된 물건 오분류 방지)
    let status = null;
    if (wonM) {
      status = '매각';
    } else if (/취하/.test(html))            { status = '취하';    }
    else if (/기각/.test(html))              { status = '기각';    }
    else if (/정지/.test(html))              { status = '정지';    }
    else if (/불허가/.test(html))            { status = '불허가';  }
    else if (/배당종결/.test(html))          { status = '배당종결';}
    else if (/낙찰/.test(html))              { status = '낙찰';    }
    else {
      const yuchalM = html.match(/유찰[\s\S]{0,30}?(\d+)회/);
      if (yuchalM)                           { status = `유찰${yuchalM[1]}회`; }
      else if (/유찰/.test(html))            { status = '유찰';    }
      else if (/변경/.test(html))            { status = '변경';    }
      else if (/신건/.test(html))            { status = '신건';    }
      else if (/진행물건|진행중/.test(html)) { status = '진행중';  }
    }

    return {
      bid_date:       dateM ? dateM[1] : null,
      min_price:      minM  ? toMan(minM[1])  : null,
      official_price: gamM  ? toMan(gamM[1])  : null,
      winning_price:  wonM  ? toMan(wonM[1])  : null,
      status,
    };
  }

  // ── 탱크옥션 파싱 ── (콤마 포맷 숫자만 매칭)
  const dateM = html.match(/매각기일[\s\S]{0,60}?(\d{4}[.\-]\d{2}[.\-]\d{2})/);
  const minM  = html.match(/최저[가매][각]?\s*가격?[^\d]*([\d]{1,3}(?:,[\d]{3})+)/);
  const offM  = html.match(/공시[가격]{0,3}[^\d]*([\d]{1,3}(?:,[\d]{3})+)/);
  const wonM  = html.match(/낙찰가[^\d]*([\d]{1,3}(?:,[\d]{3})+)/);

  let status = null;
  if (wonM) {
    status = '매각';
  } else if (/취하/.test(html))            { status = '취하';    }
  else if (/기각/.test(html))              { status = '기각';    }
  else if (/정지/.test(html))              { status = '정지';    }
  else if (/불허가/.test(html))            { status = '불허가';  }
  else if (/배당종결/.test(html))          { status = '배당종결';}
  else if (/낙찰/.test(html))              { status = '낙찰';    }
  else {
    const yuchalMT = html.match(/유찰[\s\S]{0,30}?(\d+)회/);
    if (yuchalMT)                          { status = `유찰${yuchalMT[1]}회`; }
    else if (/유찰/.test(html))            { status = '유찰';    }
    else if (/미진행/.test(html))          { status = '미진행';  }
    else if (/변경/.test(html))            { status = '변경';    }
    else if (/신건/.test(html))            { status = '신건';    }
    else if (/진행물건|진행중/.test(html)) { status = '진행중';  }
  }

  return {
    bid_date:       dateM ? dateM[1].replace(/\./g, '-') : null,
    min_price:      minM  ? toMan(minM[1])  : null,
    official_price: offM  ? toMan(offM[1])  : null,
    winning_price:  wonM  ? toMan(wonM[1])  : null,
    status,
  };
}

/* POST /api/my-auction – 선택한 경매물건 스냅샷 저장 */
app.post('/api/my-auction', async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: '저장할 항목이 없습니다.' });

  const snapshot = items.map(r => ({
    case_no:        r.case_no        || null,
    item_type:      r.item_type      || null,
    region:         r.region         || null,
    address:        r.address        || null,
    floor:          r.floor          ?? null,
    appraisal_price:r.appraisal_price ?? null,
    winning_price:  r.winning_price  ?? null,
    min_price:      r.min_price      ?? null,
    official_price: r.official_price ?? null,
    building_area:  r.building_area  ?? null,
    land_area:      r.land_area      ?? null,
    floor_info:     r.floor_info     || null,
    bid_count:      r.bid_count      ?? null,
    bid_date:       r.bid_date       || null,
    court:          r.court          || null,
    detail_url:     r.detail_url     || null,
    sale_market:    r.sale_market    ?? null,
    jeonse_market:  r.jeonse_market  ?? null,
    notes:          r.notes          || null,
    my_status:      r.status         || '진행중',
    my_bid_date:    r.bid_date       || null,
  }));

  try {
    const count = await db.addMyAuctions(snapshot);
    res.json({ success: true, count });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* PATCH /api/my-auction/:id – 편집 가능 필드 수정 */
app.patch('/api/my-auction/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const allowed = ['my_status', 'my_bid_date', 'winning_price', 'min_price', 'jeonse_market', 'sale_market', 'check_notes'];
  const safe = {};
  allowed.forEach(k => { if (k in req.body) safe[k] = req.body[k]; });
  if (!Object.keys(safe).length) return res.status(400).json({ error: '수정할 필드가 없습니다.' });
  try { await db.updateMyAuction(id, safe); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/my-auction/batch */
app.delete('/api/my-auction/batch', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: 'ids 배열이 필요합니다.' });
  try { await db.deleteMyAuctionBatch(ids.map(Number)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/my-auction/:id */
app.delete('/api/my-auction/:id', async (req, res) => {
  try { await db.deleteMyAuction(parseInt(req.params.id, 10)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* ──────────────────────────────────────────
   수익률 분석 API
────────────────────────────────────────── */
app.get('/api/profit-analysis/:myAuctionId', async (req, res) => {
  try {
    const data = await db.getProfitAnalyses(parseInt(req.params.myAuctionId, 10));
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/profit-analysis', async (req, res) => {
  const { my_auction_id, buyer_type } = req.body;
  if (!my_auction_id || !buyer_type)
    return res.status(400).json({ error: 'my_auction_id, buyer_type 필수' });
  try {
    const id = await db.upsertProfitAnalysis(req.body);
    res.json({ success: true, id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/profit-analysis/:id', async (req, res) => {
  try {
    await db.deleteProfitAnalysis(parseInt(req.params.id, 10));
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/* ──────────────────────────────────────────
   직접조회 경매 API
────────────────────────────────────────── */

/* GET /api/direct-auction */
app.get('/api/direct-auction', requireAuth, async (_req, res) => {
  try { res.json(await db.getDirectAuctions()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* GET /api/direct-auction/fetch-ctgr – 물건종류 코드 목록 */
app.get('/api/direct-auction/fetch-ctgr', requireAuth, (_req, res) => {
  res.json(Object.entries(_TANK_FETCH_CTGR).map(([name, code]) => ({ name, code })));
});

/* GET /api/direct-auction/districts?siCd=11 – 구/군 목록 조회 (탱크옥션 실시간) */
app.get('/api/direct-auction/districts', requireAuth, async (req, res) => {
  const siCd = req.query.siCd || '0';
  if (siCd === '0') return res.json({ districts: [] });

  try {
    const tankSession = await getTankSession();

    // 해당 시/도 1페이지 조회 → guCd, guNm 수집
    const url = `https://www.tankauction.com/ca/AuctList.php?srchCase=srchAll&pageNo=1&dataSize=100&pageSize=10`;
    const body = qs.stringify({
      siCd, guCd: '', dnCd: '', sptCd: '0', addr_cs_key: '', adrPlural: '',
      adrPlural_cnt: '0', adrsEtcSelect: '0', adrsEtc: '',
      ctgr: '0', sn1: '', sn2: '', pn: '', stat: '0',
      fbCntBgn: '0', fbCntEnd: '0', bgnDt: '', endDt: '',
      apslAmtBgn: '0', apslAmtEnd: '0', powerCtgrs: '0', chkCtgrsCd: '',
      chkSplCdtn: '', chkPrpsCdtn: '', dataSize: '100',
      lsType: '0', odrCol: '14', odrAds: '0', srchFR: '0', idxFR: '0', ck_photo: '0',
    });
    const resp = await axios.post(url, body, {
      headers: {
        'Cookie': tankSession, 'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': _TANK_BASE_UA, 'Accept': 'application/json, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.tankauction.com/ca/caList.php',
        'Origin': 'https://www.tankauction.com',
      },
      timeout: 15000,
    });

    const items = resp.data?.item || [];
    const map = new Map();
    for (const item of items) {
      if (item.guCd && item.guNm) map.set(String(item.guCd).trim(), item.guNm.trim());
    }
    const list = [...map.entries()]
      .map(([guCd, guNm]) => ({ guCd, guNm }))
      .sort((a, b) => a.guNm.localeCompare(b.guNm, 'ko'));
    res.json({ districts: list });
  } catch (e) {
    res.json({ districts: [] }); // 실패 시 빈 배열 (클라이언트는 전체만 표시)
  }
});

/* GET /api/direct-auction/dongs?siCd=11&guCd=XX – 읍면동 목록 조회 */
app.get('/api/direct-auction/dongs', requireAuth, async (req, res) => {
  const { siCd = '0', guCd = '' } = req.query;
  if (!guCd) return res.json({ dongs: [] });

  try {
    const tankSession = await getTankSession();

    const url = `https://www.tankauction.com/ca/AuctList.php?srchCase=srchAll&pageNo=1&dataSize=100&pageSize=10`;
    const body = qs.stringify({
      siCd, guCd, dnCd: '', sptCd: '0', addr_cs_key: '', adrPlural: '',
      adrPlural_cnt: '0', adrsEtcSelect: '0', adrsEtc: '',
      ctgr: '0', sn1: '', sn2: '', pn: '', stat: '0',
      fbCntBgn: '0', fbCntEnd: '0', bgnDt: '', endDt: '',
      apslAmtBgn: '0', apslAmtEnd: '0', powerCtgrs: '0', chkCtgrsCd: '',
      chkSplCdtn: '', chkPrpsCdtn: '', dataSize: '100',
      lsType: '0', odrCol: '14', odrAds: '0', srchFR: '0', idxFR: '0', ck_photo: '0',
    });
    const resp = await axios.post(url, body, {
      headers: {
        'Cookie': tankSession, 'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': _TANK_BASE_UA, 'Accept': 'application/json, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.tankauction.com/ca/caList.php',
        'Origin': 'https://www.tankauction.com',
      },
      timeout: 15000,
    });

    const items = resp.data?.item || [];
    const set = new Set();
    for (const item of items) {
      const nm = (item.dnNm || '').trim();
      if (nm) set.add(nm);
    }
    const dongs = [...set].sort((a, b) => a.localeCompare(b, 'ko'));
    res.json({ dongs });
  } catch (e) {
    res.json({ dongs: [] });
  }
});

/* POST /api/direct-auction/fetch – 탱크옥션 직접 크롤링 (SSE) */
app.post('/api/direct-auction/fetch', requireAuth, async (req, res) => {
  const { ctgr = '0', siCd = '0', guCd = '', stat = '0', dong = '' } = req.body;
  // 신건은 탱크옥션 API에서 진행중(stat=1)으로 조회 후 클라이언트 단 필터
  const filterSingeon = stat === '신건';
  const tankStat = filterSingeon ? '1' : stat;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (data) => {
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (typeof res.flush === 'function') res.flush();
    }
  };

  // 탱크옥션 세션 획득
  let tankSession = '';
  try {
    tankSession = await getTankSession();
  } catch (e) { send({ type: 'error', error: '탱크옥션 연결 실패: ' + e.message }); res.end(); return; }

  const tankHeaders = {
    'Cookie': tankSession,
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': _TANK_BASE_UA,
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'https://www.tankauction.com/ca/caList.php',
    'Origin': 'https://www.tankauction.com',
  };

  const fetchPage = async (pageNo) => {
    const url = `https://www.tankauction.com/ca/AuctList.php?srchCase=srchAll&pageNo=${pageNo}&dataSize=100&pageSize=10`;
    const body = qs.stringify({
      siCd: siCd || '0', guCd: guCd || '', dnCd: '', sptCd: '0',
      addr_cs_key: '', adrPlural: '', adrPlural_cnt: '0',
      adrsEtcSelect: '0', adrsEtc: '',
      ctgr: ctgr || '0', sn1: '', sn2: '', pn: '', stat: tankStat || '0',
      fbCntBgn: '0', fbCntEnd: '0', bgnDt: '', endDt: '',
      apslAmtBgn: '0', apslAmtEnd: '0', powerCtgrs: '0', chkCtgrsCd: '',
      chkSplCdtn: '', chkPrpsCdtn: '', dataSize: '100',
      lsType: '0', odrCol: '14', odrAds: '0', srchFR: '0', idxFR: '0', ck_photo: '0',
    });
    const resp = await axios.post(url, body, { headers: tankHeaders, timeout: 15000 });
    return resp.data;
  };

  try {
    // 1페이지 → totalCnt 확인
    const first = await fetchPage(1);
    const totalCnt = parseInt(first.totalCnt, 10) || 0;
    if (!totalCnt || !Array.isArray(first.item)) {
      send({ type: 'complete', fetched: 0, saved: 0 });
      res.end(); return;
    }

    const pages = Math.ceil(totalCnt / 100);
    send({ type: 'start', total: totalCnt, pages });

    let allItems = [...first.item];

    for (let pg = 2; pg <= pages; pg++) {
      await new Promise(r => setTimeout(r, 300)); // 서버 부하 방지
      const data = await fetchPage(pg);
      if (Array.isArray(data.item)) allItems = allItems.concat(data.item);
      send({ type: 'progress', fetched: allItems.length, total: totalCnt });
    }

    // 파싱 + upsert
    let rows = allItems.map(parseTankAuctionFullItem).filter(r => r.case_no);
    if (filterSingeon) rows = rows.filter(r => r.status === '신건');
    if (dong) rows = rows.filter(r => r.address && r.address.includes(dong));
    const result = await db.upsertDirectAuctions(rows);
    send({ type: 'complete', fetched: allItems.length, saved: result.upserted });
  } catch (e) {
    send({ type: 'error', error: '크롤링 오류: ' + e.message });
  }
  res.end();
});

/* PUT /api/direct-auction/:id */
app.put('/api/direct-auction/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const allowed = ['sale_market', 'jeonse_market', 'status', 'notes', 'winning_price', 'bid_date'];
  const safe = {};
  allowed.forEach(k => { if (k in req.body) safe[k] = req.body[k]; });
  if (!Object.keys(safe).length) return res.status(400).json({ error: '수정할 필드가 없습니다.' });
  try { await db.updateDirectAuction(id, safe); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/direct-auction/batch */
app.delete('/api/direct-auction/batch', requireAuth, async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || !ids.length) return res.status(400).json({ error: 'ids 배열이 필요합니다.' });
  try { await db.deleteDirectAuctionBatch(ids.map(Number)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/direct-auction/all */
app.delete('/api/direct-auction/all', requireAuth, async (_req, res) => {
  try { await db.deleteAllDirectAuctions(); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* DELETE /api/direct-auction/:id */
app.delete('/api/direct-auction/:id', requireAuth, async (req, res) => {
  try { await db.deleteDirectAuction(parseInt(req.params.id, 10)); res.json({ success: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* POST /api/direct-auction/refresh */
app.post('/api/direct-auction/refresh', requireAuth, (req, res) =>
  runAuctionRefresh(req, res, {
    getItems:     () => db.getDirectAuctions(),
    updateItem:   (id, f) => db.updateDirectAuction(id, f),
    bidDateField: 'bid_date',
    statusField:  'status',
  })
);

/* ──────────────────────────────────────────
   서버 시작 / Vercel 내보내기
────────────────────────────────────────── */
/* 서버 시작 시 신규 → 신건 일괄 마이그레이션 */
(async () => {
  try {
    const supabase = require('./lib/supabase');
    const { error } = await supabase
      .from('auctions')
      .update({ status: '신건', updated_at: new Date().toISOString() })
      .eq('status', '신규');
    if (error) console.warn('[migrate] 신규→신건 실패:', error.message);
    else console.log('[migrate] 신규→신건 완료');
  } catch (e) {
    console.warn('[migrate] 신규→신건 오류:', e.message);
  }
  try {
    const supabase = require('./lib/supabase');
    const { error } = await supabase
      .from('auctions')
      .update({ status: '변경/낙찰', updated_at: new Date().toISOString() })
      .eq('status', '변경');
    if (error) console.warn('[migrate] 변경→변경/낙찰 실패:', error.message);
    else console.log('[migrate] 변경→변경/낙찰 완료');
  } catch (e) {
    console.warn('[migrate] 변경→변경/낙찰 오류:', e.message);
  }
})();

if (require.main === module) {
  const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
  const certPath   = path.join(__dirname, 'certs', 'cert.pem');
  const keyPath    = path.join(__dirname, 'certs', 'key.pem');

  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    /* HTTPS */
    const sslOptions = {
      cert: fs.readFileSync(certPath),
      key:  fs.readFileSync(keyPath),
    };
    https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
      console.log(`\n✅ HTTPS 서버 실행 중: https://localhost:${HTTPS_PORT}\n`);
    });
    /* HTTP → HTTPS 리다이렉트 */
    http.createServer((req, res) => {
      res.writeHead(301, { Location: `https://localhost:${HTTPS_PORT}${req.url}` });
      res.end();
    }).listen(PORT, () => {
      console.log(`   HTTP  ${PORT} → HTTPS ${HTTPS_PORT} 리다이렉트\n`);
    });
  } else {
    /* 인증서 없으면 HTTP 폴백 */
    app.listen(PORT, () => {
      console.log(`\n✅ 서버 실행 중: http://localhost:${PORT}\n`);
    });
  }
} else {
  module.exports = app;
}
