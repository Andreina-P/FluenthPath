-- 005_create_user_stats.sql
-- Aggregate stats: XP, streak, skill percentages, assessment result

CREATE TABLE IF NOT EXISTS user_stats (
  id                 SERIAL       PRIMARY KEY,
  user_id            INT          REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  total_xp           INT          DEFAULT 0,
  current_level      INT          DEFAULT 1,
  current_streak     INT          DEFAULT 0,
  last_activity_date DATE,
  assessment_level   VARCHAR(30),
  reading_pct        INT          DEFAULT 0,
  listening_pct      INT          DEFAULT 0,
  speaking_pct       INT          DEFAULT 0,
  writing_pct        INT          DEFAULT 0,
  updated_at         TIMESTAMP    DEFAULT NOW()
);
