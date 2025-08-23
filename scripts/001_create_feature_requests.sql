-- Create feature_requests table
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feature requests (public form)
CREATE POLICY "Allow public to insert feature requests" 
ON feature_requests FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading all feature requests (for admin)
CREATE POLICY "Allow reading all feature requests" 
ON feature_requests FOR SELECT 
USING (true);
