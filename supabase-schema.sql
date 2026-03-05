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

-- RLS 비활성화 (서비스 키로 서버에서만 접근)
ALTER TABLE auth_config  DISABLE ROW LEVEL SECURITY;
ALTER TABLE searches     DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
