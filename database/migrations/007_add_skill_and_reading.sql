-- 007_add_skill_and_reading.sql
-- 1. Add 'skill' column to exercises (reading, listening, speaking, writing)
-- 2. Add 'reading' to the type CHECK constraint
-- 3. Add 'reading_text' column for long reading passages

-- Add skill column
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS skill VARCHAR(20)
  CHECK (skill IN ('reading','listening','speaking','writing') OR skill IS NULL);

-- Add reading_text column for reading exercises (story text)
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS reading_text TEXT;

-- Update type constraint to include 'reading'
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_type_check;
ALTER TABLE exercises ADD CONSTRAINT exercises_type_check
  CHECK (type IN ('multiple_choice','translate','listening','word_bank','speaking','reading','assessment'));

-- Backfill skill on existing exercises
UPDATE exercises SET skill = 'writing'   WHERE type IN ('multiple_choice','translate','word_bank') AND audio_url IS NULL AND lesson_id IS NOT NULL;
UPDATE exercises SET skill = 'listening' WHERE type = 'listening';
UPDATE exercises SET skill = 'speaking'  WHERE type = 'speaking';
-- assessment stays NULL (does not count toward skills)
