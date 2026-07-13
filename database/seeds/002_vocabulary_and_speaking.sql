-- 002_vocabulary_and_speaking.sql
-- Vocabulary cards for lessons 1–4 + speaking exercises

-- VOCABULARY — Lesson 1 (Greetings)
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index) VALUES
(1, 'Greeting',    'A polite word or action used when you meet someone.',            'Good morning! How are you?',    1),
(1, 'Introduction','The act of telling someone your name for the first time.',        'Nice to meet you, my name is Alex.', 2),
(1, 'Farewell',    'A word or phrase you say when you leave.',                         'Goodbye! See you tomorrow.',    3);

-- VOCABULARY — Lesson 2 (Basic Verbs)
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index) VALUES
(2, 'Verb',        'A word that describes an action, state, or occurrence.',           'She reads a book every night.',  1),
(2, 'Present tense','The form of a verb that describes what is happening now.',         'I am learning English.',         2),
(2, 'Infinitive',  'The base form of a verb, usually preceded by "to".',                'I want to learn English.',       3);

-- VOCABULARY — Lesson 3 (Past Continuous)
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index) VALUES
(3, 'Past continuous', 'A tense used to describe an action in progress at a specific time in the past.', 'She was studying when the phone rang.', 1),
(3, 'Interruption',    'Something that stops an action that was already happening.',    'The doorbell interrupted my reading.',   2);

-- VOCABULARY — Lesson 4 (Third Conditional)
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index) VALUES
(4, 'Conditional',    'A sentence structure used to talk about situations that may or may not happen.', 'If I had studied, I would have passed.', 1),
(4, 'Hypothetical',   'Something imagined or not real — used to explore "what if" situations.',          'What would you do if you won the lottery?', 2);


-- SPEAKING EXERCISES — Lesson 1 (Greetings)
INSERT INTO exercises
  (lesson_id, type, order_index, instruction, question_text, audio_url, transcript, correct_answer, pro_tip)
VALUES
(1, 'speaking', 3,
  'Listen to the model audio, then practice saying the sentence out loud. Press the button when you are done.',
  'Practice saying this greeting:',
  '/audio/ex-speaking-01.mp3',
  'Good morning! How are you today?',
  'practiced',
  'Try to match the rhythm and intonation of the model audio. Greetings usually have a rising tone at the end.'),

(1, 'speaking', 4,
  'Listen to the model audio, then practice saying the sentence out loud. Press the button when you are done.',
  'Practice saying this introduction:',
  '/audio/ex-speaking-02.mp3',
  'Nice to meet you. My name is Alex.',
  'practiced',
  'When introducing yourself, pause briefly between the greeting and your name.');
