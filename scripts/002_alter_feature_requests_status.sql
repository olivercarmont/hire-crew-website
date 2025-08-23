-- Extend feature_requests with processing/agent fields
ALTER TABLE feature_requests
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','done','failed')),
  ADD COLUMN IF NOT EXISTS claimed_by TEXT,
  ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS agent_run_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pr_url TEXT,
  ADD COLUMN IF NOT EXISTS agent_output JSONB,
  ADD COLUMN IF NOT EXISTS error TEXT,
  ADD COLUMN IF NOT EXISTS retry_count INT NOT NULL DEFAULT 0;

-- Optional for performance
CREATE INDEX IF NOT EXISTS feature_requests_status_idx ON feature_requests (status, created_at);

-- Note: RLS remains enabled. Service role bypasses RLS for worker updates.
-- Public insert/select policies are defined in 001_create_feature_requests.sql.
