const { createClient } = require('@supabase/supabase-js');

let _client = null;

function getClient() {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) {
      throw new Error('환경변수 SUPABASE_URL 과 SUPABASE_SERVICE_KEY 를 설정하세요.');
    }
    _client = createClient(url, key);
  }
  return _client;
}

/* db.js / auth.js 에서 supabase.from(...) 처럼 바로 쓸 수 있도록 Proxy 반환 */
module.exports = new Proxy({}, {
  get(_, prop) {
    return (...args) => getClient()[prop](...args);
  },
});
