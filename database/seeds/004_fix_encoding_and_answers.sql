-- 004_fix_encoding_and_answers.sql
-- RUN THIS FROM pgAdmin Query Tool (NOT from PowerShell/CMD)
-- Fixes UTF-8 encoding issues and adds multiple valid answers.
-- Multiple valid answers use pipe "|" as separator.

-- ═══════════════════════════════════════════════════════
-- FIX ENCODING: Re-insert translate exercises with correct UTF-8
-- ═══════════════════════════════════════════════════════

-- Delete the broken translate exercises and re-insert clean
DELETE FROM exercises WHERE type = 'translate' AND lesson_id = 1;

INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, word_bank_items, correct_answer, pro_tip)
VALUES
(1, 'translate', 'writing', 1,
  'Type the English translation of the sentence shown.',
  'Translate: "Mucho gusto en conocerte, me llamo Alex."',
  '["Nice","to","meet","you","my","name","is","Alex","Hello","I","am"]',
  'Nice to meet you my name is Alex|Nice to meet you I am Alex',
  '"Nice to meet you" is a fixed phrase used when meeting someone for the first time. Both "my name is" and "I am" are correct ways to introduce yourself.'),

(1, 'translate', 'writing', 2,
  'Type the English translation of the sentence shown.',
  'Translate: "Buenos dias, como estas hoy?"',
  '["Good","morning","how","are","you","today","Hello","hi"]',
  'Good morning how are you today|Hi how are you today|Hello how are you today',
  '"Good morning" is used before noon. "How are you today?" is a standard greeting question. "Hi" and "Hello" are also acceptable greetings.');
