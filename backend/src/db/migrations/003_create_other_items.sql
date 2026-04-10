CREATE TABLE IF NOT EXISTS other_items (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,

  -- Review content
  review_summary TEXT,
  review_body TEXT,
  pros TEXT[],
  cons TEXT[],
  score_overall NUMERIC(3,1),

  -- Flexible specs per category
  specs JSONB DEFAULT '{}',

  price_usd NUMERIC(8,2),
  image_url VARCHAR(500),
  affiliate_url VARCHAR(500),

  -- Meta
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_other_items_category ON other_items(category);
CREATE INDEX IF NOT EXISTS idx_other_items_published ON other_items(is_published, published_at DESC);
