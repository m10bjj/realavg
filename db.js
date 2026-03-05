const supabase = require('./lib/supabase');

async function saveSearch({ regionCode, regionName, dealYmd, tradeType, resultCount }) {
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

module.exports = {
  saveSearch, saveTransactionBatch, getHistory,
  getTransactions, deleteSearch, deleteSearchBatch, deleteAllSearches,
};
