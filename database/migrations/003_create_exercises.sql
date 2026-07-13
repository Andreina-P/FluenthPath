-- 003_create_exercises.sql
-- All exercise types including assessment questions

CREATE TABLE IF NOT EXISTS exercises (
  id              SERIAL        PRIMARY KEY,
  lesson_id       INT           REFERENCES lessons(id) ON DELETE CASCADE,   -- NULL for assessment
  type            VARCHAR(30)   NOT NULL
                  CHECK (type IN ('multiple_choice','translate','listening','word_bank','speaking','assessment')),
  order_index     INT           NOT NULL DEFAULT 0,
  instruction     TEXT          NOT NULL,     -- Readable instruction (WCAG 3.3.2)
  question_text   TEXT          NOT NULL,
  audio_url       VARCHAR(500),              -- listening and speaking exercises
  transcript      TEXT,                      -- Required when audio_url present (WCAG 1.2.1 / 1.2.2)
  options         JSONB,                     -- [{"label":"A","text":"have"}, ...]
  word_bank_items JSONB,                     -- ["I","am","learning","English"]
  correct_answer  TEXT          NOT NULL,
  pro_tip         TEXT                       -- Shown on incorrect answer (WCAG 3.3.3)
);
