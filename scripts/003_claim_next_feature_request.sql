-- Atomic claim function to fetch and mark the next pending feature request
CREATE OR REPLACE FUNCTION claim_next_feature_request(p_worker_id TEXT)
RETURNS JSONB AS $$
DECLARE
  fr feature_requests%ROWTYPE;
BEGIN
  SELECT * INTO fr
  FROM feature_requests
  WHERE status = 'pending'
    AND trim(coalesce(message, '')) <> ''
  ORDER BY created_at ASC
  FOR UPDATE SKIP LOCKED
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  UPDATE feature_requests
  SET status = 'processing', claimed_by = p_worker_id, claimed_at = NOW()
  WHERE id = fr.id
  RETURNING * INTO fr;

  RETURN to_jsonb(fr);
END;
$$ LANGUAGE plpgsql;
