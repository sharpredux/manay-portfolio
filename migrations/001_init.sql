CREATE TABLE IF NOT EXISTS experience (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0,
  period TEXT,
  title TEXT,
  company TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  year TEXT,
  description TEXT,
  label TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS contact (
  id INTEGER PRIMARY KEY DEFAULT 1,
  email TEXT,
  address TEXT,
  city TEXT
);

-- Seed Contact table if empty
INSERT INTO contact (id, email, address, city)
VALUES (1, 'milamanay@gmail.com', '128 Modernist Way, Suite 400', 'Los Angeles, CA 90012')
ON CONFLICT (id) DO NOTHING;
