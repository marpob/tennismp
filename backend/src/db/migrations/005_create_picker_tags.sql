CREATE TABLE IF NOT EXISTS racquet_picker_tags (
  racquet_id INT REFERENCES racquets(id) ON DELETE CASCADE,
  age_group VARCHAR(20) NOT NULL,
  game_style VARCHAR(30) NOT NULL,
  score_boost SMALLINT DEFAULT 0 CHECK (score_boost BETWEEN -10 AND 10),
  PRIMARY KEY (racquet_id, age_group, game_style)
);
