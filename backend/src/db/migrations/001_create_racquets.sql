CREATE TABLE IF NOT EXISTS racquets (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year SMALLINT,

  -- Physical specs
  weight_g SMALLINT,
  head_size_sq_in SMALLINT,
  length_in NUMERIC(4,1),
  balance_mm SMALLINT,
  balance_type VARCHAR(20),
  swingweight SMALLINT,
  stiffness_ra SMALLINT,
  beam_width_mm VARCHAR(30),
  string_pattern VARCHAR(20),

  -- Picker attributes (1-10 scale)
  power_level SMALLINT CHECK (power_level BETWEEN 1 AND 10),
  spin_level SMALLINT CHECK (spin_level BETWEEN 1 AND 10),
  control_level SMALLINT CHECK (control_level BETWEEN 1 AND 10),
  maneuverability SMALLINT CHECK (maneuverability BETWEEN 1 AND 10),

  -- Player fit
  recommended_swing_speed VARCHAR(20),
  skill_level VARCHAR(20),
  player_type TEXT[],

  -- Review content
  review_summary TEXT,
  review_body TEXT,
  pros TEXT[],
  cons TEXT[],

  -- Scores (1-10 scale)
  score_overall NUMERIC(3,1),
  score_power NUMERIC(3,1),
  score_control NUMERIC(3,1),
  score_spin NUMERIC(3,1),
  score_comfort NUMERIC(3,1),
  score_maneuverability NUMERIC(3,1),

  -- Media
  image_url VARCHAR(500),
  affiliate_url VARCHAR(500),
  colors TEXT[],

  -- Meta
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_racquets_brand ON racquets(brand);
CREATE INDEX IF NOT EXISTS idx_racquets_published ON racquets(is_published, published_at DESC);
