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
const db           = require('./db');
const auth         = require('./auth');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

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
  const headers = [
    '순번', '경매사건번호', '물건종류', '지역', '입찰일', '상태',
    '감정가', '낙찰가', '최저가', '공시',
    '전세 시세', '전세 차익', '매매 시세', '매매 차익',
    '건물평수', '대지평수', '주소', '체크사항',
  ];
  const sample = [
    1, '2025타경12345', '아파트', '수원', '2026-03-15', '진행중',
    390000000, '', 273000000, 280000000,
    '', '', '', '',
    '7.82평 (25.85㎡)', '10.5평 (34.71㎡)', '경기도 수원시 팔달구 XX동 123-4', '주차 협소',
  ];
  const ws = XLSX.utils.aoa_to_sheet([headers, sample]);
  // 열 너비 설정
  ws['!cols'] = headers.map((h, i) => {
    const widths = [6,18,10,8,12,8,14,14,14,14,12,12,12,12,12,12,30,20];
    return { wch: widths[i] || 12 };
  });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '경매목록');
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename*=UTF-8\'\'%EB%B6%80%EB%8F%99%EC%82%B0%EA%B2%BD%EB%A7%A4_%EC%97%85%EB%A1%9C%EB%93%9C_%EC%96%91%EC%8B%9D.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
});

/* GET /api/auction */
app.get('/api/auction', async (_req, res) => {
  try { res.json(await db.getAuctions()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

/* POST /api/auction/upload  (multipart: field name = "file") */
app.post('/api/auction/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: '파일이 없습니다.' });

  // multer 는 latin1 로 파일명을 받으므로 UTF-8 로 복원
  const filename = Buffer.from(req.file.originalname || '', 'latin1').toString('utf8');

  try {
    const wb = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: false });

    // "경매목록" 시트 우선, 없으면 첫 번째 시트
    const sheetName = wb.SheetNames.find(n => n === '경매목록') || wb.SheetNames[0];
    if (!sheetName) return res.status(400).json({ error: 'Excel 시트를 찾을 수 없습니다.' });

    const ws  = wb.Sheets[sheetName];
    // raw 배열로 읽기 → 앞의 제목/빈 행을 건너뛰고 헤더 행 탐지
    const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

    // '순번'이 있는 행을 헤더로 인식
    const headerRowIdx = raw.findIndex(row =>
      Array.isArray(row) && row.some(v => v && v.toString().trim() === '순번')
    );
    if (headerRowIdx === -1)
      return res.status(400).json({ error: '헤더 행(순번 컬럼)을 찾을 수 없습니다. 경매목록 시트의 형식을 확인하세요.' });

    // 헤더: 중복 키는 마지막 인덱스 우선 (체크사항 등)
    const headers = raw[headerRowIdx].map(h => (h != null ? h.toString().trim() : null));
    const headerToIdx = {};
    headers.forEach((h, i) => { if (h) headerToIdx[h] = i; });

    // 데이터 행: 빈 행 제거
    const dataRows = raw.slice(headerRowIdx + 1).filter(r =>
      Array.isArray(r) && r.some(v => v !== null && v !== undefined && v !== '')
    );
    if (!dataRows.length) return res.status(400).json({ error: '데이터가 없습니다.' });

    // 배열 행 → 헤더 키 객체 변환
    const rowObjects = dataRows.map(row => {
      const obj = {};
      Object.entries(headerToIdx).forEach(([key, idx]) => {
        obj[key] = (row[idx] !== undefined) ? row[idx] : null;
      });
      return obj;
    });

    console.log(`[auction upload] 파일: ${filename}, 시트: ${sheetName}, 헤더행: ${headerRowIdx + 1}, 데이터: ${rowObjects.length}행`);

    const mapped = rowObjects.map(mapExcelRow).filter(r => r.case_no);
    if (!mapped.length) return res.status(400).json({ error: '유효한 데이터 행이 없습니다.' });

    // 같은 파일 내 중복 case_no 제거 (마지막 행 우선)
    const seenCaseNo = new Map();
    const noCaseNo   = [];
    mapped.forEach(r => {
      if (r.case_no) seenCaseNo.set(r.case_no, r);
      else noCaseNo.push(r);
    });
    const auctions = [...seenCaseNo.values(), ...noCaseNo];

    const result = await db.upsertAuctions(auctions);
    const parts = [`진행중 ${result.upserted - result.markedAsNew}건`];
    if (result.markedAsNew > 0) parts.push(`신규 ${result.markedAsNew}건`);
    if (result.markedAsWon > 0) parts.push(`낙찰 ${result.markedAsWon}건`);
    res.json({
      success: true,
      upserted:    result.upserted,
      markedAsWon: result.markedAsWon,
      markedAsNew: result.markedAsNew,
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
