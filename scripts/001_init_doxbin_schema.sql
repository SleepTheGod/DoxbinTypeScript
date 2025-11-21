-- Create or update doxbin_pastes table with proper indexes and constraints
CREATE TABLE IF NOT EXISTS doxbin_pastes (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_doxbin_pastes_created_at ON doxbin_pastes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_doxbin_pastes_views ON doxbin_pastes(views DESC);
CREATE INDEX IF NOT EXISTS idx_doxbin_pastes_title ON doxbin_pastes(title);

-- Add a trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_doxbin_pastes_updated_at BEFORE UPDATE
  ON doxbin_pastes FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to table
COMMENT ON TABLE doxbin_pastes IS 'Stores all user-submitted pastes/doxes';
