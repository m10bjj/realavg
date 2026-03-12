-- profit_analysis 테이블 신규 컬럼 추가
-- Supabase SQL Editor에서 실행하세요

ALTER TABLE profit_analysis
  ADD COLUMN IF NOT EXISTS loan_ratio            numeric,
  ADD COLUMN IF NOT EXISTS acq_tax_scenario      text,
  ADD COLUMN IF NOT EXISTS acquired_deposit      numeric,
  ADD COLUMN IF NOT EXISTS unpaid_maintenance    numeric,
  ADD COLUMN IF NOT EXISTS cost_subtotal         numeric,
  ADD COLUMN IF NOT EXISTS own_capital           numeric,
  ADD COLUMN IF NOT EXISTS jeonse_deposit        numeric,
  ADD COLUMN IF NOT EXISTS monthly_rent          numeric,
  ADD COLUMN IF NOT EXISTS rent_months           integer,
  ADD COLUMN IF NOT EXISTS income_subtotal       numeric,
  ADD COLUMN IF NOT EXISTS transfer_tax_scenario text,
  ADD COLUMN IF NOT EXISTS transfer_tax_rate     numeric,
  ADD COLUMN IF NOT EXISTS expense_subtotal      numeric;
