-- 006_create_vocabulary.sql
-- Vocabulary cards per lesson — static reference content, not evaluable.
-- Displayed as always-visible cards (no hover/tooltip).

CREATE TABLE IF NOT EXISTS vocabulary (
  id          SERIAL       PRIMARY KEY,
  lesson_id   INT          REFERENCES lessons(id) ON DELETE CASCADE,
  word        VARCHAR(100) NOT NULL,
  definition  TEXT         NOT NULL,
  example     TEXT,
  order_index INT          NOT NULL DEFAULT 0
);
