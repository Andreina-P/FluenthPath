-- 008_add_parent_exercise_id.sql
-- Adds parent_exercise_id for reading comprehension questions.
-- A comprehension question is a multiple_choice exercise whose
-- parent is a reading exercise.

ALTER TABLE exercises ADD COLUMN IF NOT EXISTS parent_exercise_id INT
  REFERENCES exercises(id) ON DELETE CASCADE;
