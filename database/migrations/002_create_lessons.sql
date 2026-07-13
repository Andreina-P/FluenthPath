-- 002_create_lessons.sql
-- Lessons organised by level and theme

CREATE TABLE IF NOT EXISTS lessons (
  id          SERIAL        PRIMARY KEY,
  title       VARCHAR(150)  NOT NULL,
  description TEXT,
  level       VARCHAR(30)   NOT NULL
              CHECK (level IN ('beginner', 'elementary', 'conversational')),
  theme       VARCHAR(100),
  order_index INT           NOT NULL DEFAULT 0
);
