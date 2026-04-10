CREATE TABLE IF NOT EXISTS strings (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(255) NOT NULL,

  -- Physical specs
  gauge_mm NUMERIC(4,2),
  gauge_label VARCHAR(10),
  material VARCHAR(50),
  construction VARCHAR(100),
  colors TEXT[],

  -- Performance attributes (1-10)
  power_level SMALLINT CHECK (power_level BETWEEN 1 AND 10),
  control_level SMALLINT CHECK (control_level BETWEEN 1 AND 10),
  spin_level SMALLINT CHECK (spin_level BETWEEN 1 AND 10),
  comfort_level SMALLINT CHECK (comfort_level BETWEEN 1 AND 10),
  durability_level SMALLINT CHECK (durability_level BETWEEN 1 AND 10),
  tension_stability SMALLINT CHECK (tension_stability BETWEEN 1 AND 10),

  -- Review content
  review_summary TEXT,
  review_body TEXT,
  pros TEXT[],
  cons TEXT[],

  -- Scores (1-10)
  score_overall NUMERIC(3,1),
  score_power NUMERIC(3,1),
  score_control NUMERIC(3,1),
  score_spin NUMERIC(3,1),
  score_comfort NUMERIC(3,1),
  score_durability NUMERIC(3,1),

  tension_min_lb SMALLINT,
  tension_max_lb SMALLINT,
  price_usd NUMERIC(6,2),

  -- Media
  image_url VARCHAR(500),
  affiliate_url VARCHAR(500),

  -- Meta
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_strings_brand ON strings(brand);
CREATE INDEX IF NOT EXISTS idx_strings_material ON strings(material);
CREATE INDEX IF NOT EXISTS idx_strings_published ON strings(is_published, published_at DESC);
