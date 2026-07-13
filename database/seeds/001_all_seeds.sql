-- seeds/001_lessons.sql
-- 4 lessons across 2 levels

INSERT INTO lessons (title, description, level, theme, order_index) VALUES
('1.1 Intro to Greetings',  'Basic greetings and introductions',     'beginner',   'greetings', 1),
('1.2 Basic Verbs',          'Common action verbs in present tense',  'beginner',   'verbs',     2),
('2.1 Past Continuous',      'Actions in progress in the past',       'elementary', 'grammar',   3),
('2.2 Third Conditional',    'Past hypothetical situations',          'elementary', 'grammar',   4);


-- seeds/002_exercises.sql
-- 2 exercises per type = 10 total

-- MULTIPLE CHOICE — lesson 4 (Third Conditional)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text, options, correct_answer, pro_tip)
VALUES
(4, 'multiple_choice', 1,
  'Choose the correct word to complete the sentence.',
  'If I _____ known about the meeting earlier, I would have adjusted my schedule accordingly.',
  '[{"label":"A","text":"have"},{"label":"B","text":"had"},{"label":"C","text":"would have"},{"label":"D","text":"did"}]',
  'had',
  'The third conditional uses "had + past participle" in the if-clause. It describes a past situation that did not happen.'),

(4, 'multiple_choice', 2,
  'Choose the correct word to complete the sentence.',
  'She _____ finished the project earlier if she had had more time.',
  '[{"label":"A","text":"would have"},{"label":"B","text":"would"},{"label":"C","text":"had"},{"label":"D","text":"could"}]',
  'would have',
  'The result clause in the third conditional uses "would have + past participle" to express the hypothetical outcome.');


-- TRANSLATE — lesson 1 (Greetings)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text, word_bank_items, correct_answer, pro_tip)
VALUES
(1, 'translate', 1,
  'Type the English translation of the sentence shown.',
  'Translate: "Mucho gusto en conocerte, me llamo Alex."',
  '["Nice","to","meet","you","my","name","is","Alex","Hello","I","am"]',
  'Nice to meet you my name is Alex',
  '"Nice to meet you" is a fixed phrase used when meeting someone for the first time.'),

(1, 'translate', 2,
  'Type the English translation of the sentence shown.',
  'Translate: "Buenos días, ¿cómo estás hoy?"',
  '["Good","morning","how","are","you","today","Hello","hi","Fine"]',
  'Good morning how are you today',
  '"Good morning" is used before noon. "How are you today?" is a standard greeting question.');


-- LISTENING — lesson 3 (Past Continuous)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text,
   audio_url, transcript, correct_answer, pro_tip)
VALUES
(3, 'listening', 1,
  'Listen to the audio, then type exactly what you hear.',
  'What sentence do you hear?',
  '/audio/ex-listening-01.mp3',
  'They were walking to the market yesterday morning.',
  'They were walking to the market yesterday morning.',
  '"Were walking" is the past continuous. It describes an action in progress at a specific past time.'),

(3, 'listening', 2,
  'Listen to the audio, then type exactly what you hear.',
  'What sentence do you hear?',
  '/audio/ex-listening-02.mp3',
  'She was studying English when the phone rang.',
  'She was studying English when the phone rang.',
  'Use past continuous ("was studying") for the background action and simple past ("rang") for the interruption.');


-- WORD BANK — lesson 2 (Basic Verbs)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text, word_bank_items, correct_answer, pro_tip)
VALUES
(2, 'word_bank', 1,
  'Select the words in the correct order to form a sentence.',
  'Build a sentence using the words below:',
  '["I","am","learning","English","every","day"]',
  'I am learning English every day',
  '"Am learning" is the present continuous tense — an activity in progress around now.'),

(2, 'word_bank', 2,
  'Select the words in the correct order to form a sentence.',
  'Build a sentence using the words below:',
  '["She","reads","a","book","before","bed"]',
  'She reads a book before bed',
  'Simple present, third person singular: add -s to the verb (reads, not read).');


-- ASSESSMENT — no lesson (independent flow)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text, options, correct_answer, pro_tip)
VALUES
(NULL, 'assessment', 1,
  'Choose the best answer to complete the sentence.',
  'If I _____ known about the meeting, I would have come earlier.',
  '[{"label":"A","text":"have"},{"label":"B","text":"had"},{"label":"C","text":"would have"},{"label":"D","text":"did"}]',
  'had',
  'Third conditional: "had" in the if-clause describes an unreal past situation.'),

(NULL, 'assessment', 2,
  'Choose the correct verb form.',
  'She _____ to the store when it started to rain.',
  '[{"label":"A","text":"walks"},{"label":"B","text":"walked"},{"label":"C","text":"was walking"},{"label":"D","text":"has walked"}]',
  'was walking',
  'Past continuous describes an action in progress when another event interrupted it.');
