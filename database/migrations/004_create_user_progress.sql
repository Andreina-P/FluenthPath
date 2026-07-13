-- 004_create_user_progress.sql
-- Tracks per-exercise completion for each user

CREATE TABLE IF NOT EXISTS user_progress (
  id           SERIAL     PRIMARY KEY,
  user_id      INT        REFERENCES users(id) ON DELETE CASCADE,
  exercise_id  INT        REFERENCES exercises(id) ON DELETE CASCADE,
  lesson_id    INT        REFERENCES lessons(id),
  completed    BOOLEAN    DEFAULT FALSE,
  correct      BOOLEAN    DEFAULT FALSE,
  attempts     INT        DEFAULT 0,
  completed_at TIMESTAMP,
  UNIQUE (user_id, exercise_id)
);
