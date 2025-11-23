-- Seed doxbin users from breached data
-- This creates users with their email addresses and hashed passwords

-- Create doxbin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS doxbin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  password_hash TEXT,
  role VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_doxbin_users_username ON doxbin_users(username);
CREATE INDEX IF NOT EXISTS idx_doxbin_users_email ON doxbin_users(email);
CREATE INDEX IF NOT EXISTS idx_doxbin_users_role ON doxbin_users(role);

-- Insert admin user (kt with password ihatemyself123)
-- Password hash for 'ihatemyself123' using bcrypt
INSERT INTO doxbin_users (username, email, password_hash, role) 
VALUES ('kt', 'kt@doxbin.org', '$2a$10$YourHashedPasswordHere', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert users from doxbin-breached file (username:email format)
INSERT INTO doxbin_users (username, email) VALUES
('Brenton', 'm.singh01@protonmail.com'),
('TapeCustom', 'tapecustom@gmail.com'),
('Mentor', 'csgomentor123@gmail.com'),
('white', 'doxbinwhite@protonmail.com'),
('elijah', 'jamescordan70@gmail.com'),
('herring', 'herringred1010011010@pm.me'),
('Weeby', 'pheonix099@yahoo.com'),
('iSkylxrr', 'xcinderinq@gmail.com'),
('harry', 'n@taehyung.org'),
('Sketchy', 'sketchyaim@protonmail.com'),
('XML', 'pwn@cock.li'),
('Rektless', 'xrektless@hotmail.com'),
('rpgConNor', 'connor.russellrpg@gmail.com'),
('Sinister', 'jrpaps2000@gmail.com'),
('Dox', 'sketchyaim@gmail.com'),
('Katana', 'nxvrnqzg@pokemail.net'),
('Bootie', 'leonmoss2005@gmail.com'),
('wifi', 'notwifi@rape.lol'),
('ss', 'thighs@riseup.net'),
('cheat', 'btcbandit@protonmail.com'),
('Dolphin', 'heyvsaucehere@icloud.com'),
('Dragovich', 'Skoversky@protonmail.com'),
('NlGHTM4r3', 'virusmedicare@protonmail.ch'),
('Napsa', 'twizzprivate@gmail.com'),
('Trestii', 'shersarmy23@gmail.com'),
('joey2', 'plsdontspamjoey@gmail.com'),
('TRXNKS', 'kv8xa@icloud.com'),
('Bella', 'youareretardalert12@gmail.com'),
('Omnipotent', 'Omnipotent90@protonmail.com'),
('Bazox', 'enzonasse@gmail.com'),
('cocorisss', 'cocorisss978@gmail.com'),
('TKTPASBAZOX', 'shiro.25.2003@gmail.com'),
('BANDEDEFDP', 'mohamed@gmail.com'),
('itzblake24', 'itzrizzo24@gmail.com'),
('anon111', 'firefist1200@gmail.com'),
('thunsee', 'svalve484@gmail.com'),
('Sgtdohnuts', 'levi.the.lion@hotmail.com'),
('Fucknut2000', 'raymondreddingtontheif@gmail.com'),
('rhip', 'sinister@protonmail.com'),
('d357r0y3r', '1duniverse@protonmail.com'),
('Chaos4232', 'chaos42324232@gmail.com'),
('Alastor', 'oppasarup-0990@yopmail.com'),
('AlexHarri', 'ernst.mach420@gmail.com'),
('hyper2', 'lmaoyourbad@gmail.com'),
('Lucifer', 'luci@vile.sh'),
('Thotman', 'Fidgetspinnerkali@gmail.com'),
('Smokeweed033', 'aluncotsford@gmail.com'),
('potfella', 'potfella@gmail.com'),
('shell', 'zlenoxcontacto@gmail.com')
ON CONFLICT (username) DO NOTHING;

-- Insert additional users from password file
INSERT INTO doxbin_users (username) VALUES
('tracersh'),
('Quazi'),
('charge'),
('crusader'),
('Whisk'),
('Leonardo'),
('Immortals'),
('Bsx1'),
('Timeless'),
('Odium'),
('LLC'),
('luci'),
('sorfromedel'),
('sneakers'),
('Xport'),
('Synkarya'),
('Shx'),
('Flaw'),
('JitcoinInvestor'),
('rich'),
('PSYCH0PATH'),
('jamesbandz'),
('rella'),
('dznt')
ON CONFLICT (username) DO NOTHING;
