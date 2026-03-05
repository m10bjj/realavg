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
const db           = require('./db');
const auth         = require('./auth');

const app        = express();
const PORT       = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'realestate-jwt-secret-2024';

app.use(express.json());
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
  const cfg = await auth.getAuth();
  if (id === cfg.id && password === cfg.password) {
    setAuthCookie(res, id);
    return res.json({ success: true });
  }
  res.json({ success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' });
});

app.post('/auth/recover', async (req, res) => {
  const { name, phone_last4, birthdate, pin } = req.body;
  const cfg = await auth.getAuth();
  const r   = cfg.recovery;
  if (name === r.name && phone_last4 === r.phone_last4 &&
      birthdate === r.birthdate && pin === r.pin) {
    return res.json({ success: true, password: cfg.password });
  }
  res.json({ success: false, error: '입력하신 정보가 일치하지 않습니다.' });
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
});

app.post('/auth/change-recovery', async (req, res) => {
  const { currentPassword, name, phone_last4, birthdate, pin } = req.body;
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
});

/* ──────────────────────────────────────────
   국토부 API 엔드포인트 매핑
────────────────────────────────────────── */
const ENDPOINTS = {
  'apt-trade':    'https://apis.data.go.kr/1613000/RTMSOBJSvc/getRTMSDataSvcAptTrade',
  'apt-rent':     'https://apis.data.go.kr/1613000/RTMSOBJSvc/getRTMSDataSvcAptRent',
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

  const rawKey = req.headers['x-service-key'] || process.env.SERVICE_KEY || '';
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
  const isVilla = tradeType === 'villa-trade';
  const base = isVilla ? {
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
        apt_name:    t(item['아파트']),
        deal_amount: t(item['거래금액']).replace(/,/g, ''),
        road_name:   t(item['도로명']),
        deal_type:   t(item['거래유형']),
        cancel_yn:   t(item['해제여부']),
        cancel_date: t(item['해제사유발생일']),
      };
    case 'apt-rent':
      return { ...base,
        apt_name:        t(item['아파트']),
        deposit:         t(item['보증금액']).replace(/,/g, ''),
        monthly_rent:    t(item['월세금액']).replace(/,/g, '') || '0',
        contract_type:   t(item['계약구분']),
        contract_period: t(item['계약기간']),
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
   서버 시작 / Vercel 내보내기
────────────────────────────────────────── */
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
