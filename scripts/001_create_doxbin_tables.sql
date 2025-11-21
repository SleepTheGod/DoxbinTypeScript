-- Drop tables if they exist (for clean reinstallation)
DROP TABLE IF EXISTS doxbin_pastes CASCADE;

-- Create pastes table for doxbin
CREATE TABLE IF NOT EXISTS doxbin_pastes (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_pastes_created_at ON doxbin_pastes(created_at DESC);

-- Create index on id for faster lookups
CREATE INDEX IF NOT EXISTS idx_pastes_id ON doxbin_pastes(id);
