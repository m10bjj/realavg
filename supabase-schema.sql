-- =====================================================
-- 국토부 실거래가 조회 - Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에서 실행하세요
-- =====================================================

-- 인증 설정 테이블 (1행만 사용)
CREATE TABLE auth_config (
  id             INTEGER PRIMARY KEY DEFAULT 1,
  user_id        TEXT NOT NULL,
  password       TEXT NOT NULL,
  recovery_name  TEXT,
  recovery_phone TEXT,
  recovery_birth TEXT,
  recovery_pin   TEXT
);

-- 조회 이력 테이블
CREATE TABLE searches (
  id           BIGSERIAL PRIMARY KEY,
  region_code  TEXT,
  region_name  TEXT,
  deal_ymd     TEXT,
  trade_type   TEXT,
  result_count INTEGER,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 거래 데이터 테이블
CREATE TABLE transactions (
  id              BIGSERIAL PRIMARY KEY,
  search_id       BIGINT REFERENCES searches(id) ON DELETE CASCADE,
  apt_name        TEXT,
  deal_year       TEXT,
  deal_month      TEXT,
  deal_day        TEXT,
  area            FLOAT,
  floor           TEXT,
  build_year      TEXT,
  dong            TEXT,
  road_name       TEXT,
  deal_amount     TEXT,
  deposit         TEXT,
  monthly_rent    TEXT,
  deal_type       TEXT,
  contract_type   TEXT,
  contract_period TEXT,
  cancel_yn       TEXT,
  cancel_date     TEXT,
  house_type      TEXT
);

-- 인덱스 (조회 성능 향상)
CREATE INDEX idx_searches_created_at    ON searches(created_at DESC);
CREATE INDEX idx_transactions_search_id ON transactions(search_id);

-- 부동산경매 테이블
CREATE TABLE IF NOT EXISTS auctions (
  id              BIGSERIAL PRIMARY KEY,
  seq_no          INTEGER,
  case_no         TEXT UNIQUE,        -- 경매사건번호 (upsert 기준키)
  item_type       TEXT,               -- 물건종류
  region          TEXT,               -- 지역
  bid_date        TEXT,               -- 입찰일
  status          TEXT DEFAULT '진행중', -- 상태
  appraisal_price NUMERIC,            -- 감정가 (만원)
  winning_price   NUMERIC,            -- 낙찰가 (만원)
  min_price       NUMERIC,            -- 최저가 (만원)
  official_price  NUMERIC,            -- 공시 (만원)
  jeonse_market   NUMERIC,            -- 전세 시세 (만원)
  sale_market     NUMERIC,            -- 매매 시세 (만원)
  building_area   FLOAT,              -- 건물평수
  land_area       FLOAT,              -- 대지평수
  floor           INTEGER,            -- 층수 (주소에서 자동 파싱)
  address         TEXT,               -- 주소
  notes           TEXT,               -- 체크사항
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auctions_case_no ON auctions(case_no);

-- 나만의 경매물건 테이블 (저장 시점 스냅샷)
CREATE TABLE IF NOT EXISTS my_auctions (
  id              BIGSERIAL PRIMARY KEY,
  case_no         TEXT,
  item_type       TEXT,
  region          TEXT,
  address         TEXT,
  floor           INTEGER,
  appraisal_price NUMERIC,
  winning_price   NUMERIC,
  min_price       NUMERIC,
  official_price  NUMERIC,
  building_area   FLOAT,
  land_area       FLOAT,
  floor_info      TEXT,
  bid_count       INTEGER,
  bid_date        TEXT,
  court           TEXT,
  detail_url      TEXT,
  sale_market     NUMERIC,
  jeonse_market   NUMERIC,
  notes           TEXT,
  my_status       TEXT DEFAULT '진행중',  -- 진행중 / 낙찰
  my_bid_date     DATE,                   -- 입찰일 (사용자 수정 가능)
  check_notes     TEXT,                   -- 체크사항 (사용자 수정 가능)
  saved_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 비활성화 (서비스 키로 서버에서만 접근)
ALTER TABLE auth_config  DISABLE ROW LEVEL SECURITY;
ALTER TABLE searches     DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE auctions     DISABLE ROW LEVEL SECURITY;
ALTER TABLE my_auctions  DISABLE ROW LEVEL SECURITY;
