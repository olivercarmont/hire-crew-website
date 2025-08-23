ALTER TABLE feature_requests
  ADD COLUMN IF NOT EXISTS pr_merged BOOLEAN,
  ADD COLUMN IF NOT EXISTS merged_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS should_email_user BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS user_emailed BOOLEAN DEFAULT false;

-- Index to query pending notifications quickly
CREATE INDEX IF NOT EXISTS feature_requests_notify_idx ON feature_requests (pr_merged, should_email_user, user_emailed);
