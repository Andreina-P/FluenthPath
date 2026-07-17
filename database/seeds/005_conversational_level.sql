-- 005_conversational_level.sql
-- Conversational level lesson with all exercise types.
-- RUN FROM pgAdmin Query Tool to avoid encoding issues.

-- ═══════════════════════════════════════════════════════
-- LESSON
-- ═══════════════════════════════════════════════════════
INSERT INTO lessons (title, description, level, theme, order_index) VALUES
('3.1 Real-World Conversations', 'Practice English through everyday situations and dialogues', 'conversational', 'conversations', 5);

-- Get the lesson id for reference (assuming it's 5)
-- If your lessons table has different IDs, adjust accordingly.

-- ═══════════════════════════════════════════════════════
-- VOCABULARY
-- ═══════════════════════════════════════════════════════
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index) VALUES
(5, 'Appointment',  'A scheduled meeting at a specific time and place.',  'I have a doctor appointment at 3 PM.', 1),
(5, 'Recommend',    'To suggest something as good or suitable.',           'Can you recommend a good restaurant?', 2),
(5, 'Available',    'Free to do something or able to be used.',            'Are you available tomorrow afternoon?', 3),
(5, 'Reservation',  'An arrangement to have something kept for you.',      'I made a reservation for two at the restaurant.', 4);

-- ═══════════════════════════════════════════════════════
-- GRAMMAR — Multiple choice (skill: writing)
-- ═══════════════════════════════════════════════════════
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, options, correct_answer, pro_tip)
VALUES
(5, 'multiple_choice', 'writing', 1,
  'Choose the correct word to complete the sentence.',
  'I wish I _____ more time to travel last year.',
  '[{"label":"A","text":"had"},{"label":"B","text":"have"},{"label":"C","text":"would have"},{"label":"D","text":"has"}]',
  'had',
  'After "I wish" referring to the past, use the past perfect or simple past. "I wish I had" expresses regret about something that did not happen.'),

(5, 'multiple_choice', 'writing', 2,
  'Choose the correct word to complete the sentence.',
  'By the time we arrived, the movie _____ already started.',
  '[{"label":"A","text":"had"},{"label":"B","text":"has"},{"label":"C","text":"have"},{"label":"D","text":"was"}]',
  'had',
  'The past perfect "had started" describes an action completed before another past action ("we arrived"). This is a common pattern in storytelling.');

-- ═══════════════════════════════════════════════════════
-- TRANSLATE (skill: writing)
-- ═══════════════════════════════════════════════════════
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, word_bank_items, correct_answer, pro_tip)
VALUES
(5, 'translate', 'writing', 3,
  'Type the English translation of the sentence shown.',
  'Translate: "Me gustaria hacer una reservacion para dos personas."',
  '["I","would","like","to","make","a","reservation","for","two","people","want","please"]',
  'I would like to make a reservation for two people|I would like to make a reservation for two',
  '"Would like to" is the polite way to express a desire. It is more formal than "want to" and commonly used in restaurants and hotels.');

-- ═══════════════════════════════════════════════════════
-- LISTENING CLOZE — multiple_choice with audio (skill: listening)
-- ═══════════════════════════════════════════════════════
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   audio_url, transcript, options, correct_answer, pro_tip)
VALUES
(5, 'multiple_choice', 'listening', 4,
  'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  'Could you _____ me the way to the nearest pharmacy?',
  '/audio/ex-listening-cloze-03.mp3',
  'Could you tell me the way to the nearest pharmacy?',
  '[{"label":"A","text":"tell"},{"label":"B","text":"say"},{"label":"C","text":"speak"},{"label":"D","text":"talk"}]',
  'tell',
  '"Tell" is followed by a person ("tell me"). "Say" is followed by words ("say hello"). This is a common distinction in conversational English.'),

(5, 'multiple_choice', 'listening', 5,
  'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  'She asked if I could _____ her a favor.',
  '/audio/ex-listening-cloze-04.mp3',
  'She asked if I could do her a favor.',
  '[{"label":"A","text":"do"},{"label":"B","text":"make"},{"label":"C","text":"give"},{"label":"D","text":"take"}]',
  'do',
  '"Do a favor" is a fixed expression. "Make" is used with other nouns: "make a decision", "make a mistake". Learning collocations helps you sound more natural.');

-- ═══════════════════════════════════════════════════════
-- SPEAKING (skill: speaking)
-- ═══════════════════════════════════════════════════════
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   audio_url, transcript, correct_answer, pro_tip)
VALUES
(5, 'speaking', 'speaking', 6,
  'Listen to the model audio, then practice saying the sentence out loud. Press the button when you are done.',
  'Practice this conversation opener:',
  '/audio/ex-speaking-03.mp3',
  'Excuse me, could you tell me where the nearest subway station is?',
  'practiced',
  'Notice the polite structure: "Excuse me" + "could you" + question. The intonation rises at the end because it is a question.');

-- ═══════════════════════════════════════════════════════
-- READING with comprehension questions (skill: reading)
-- ═══════════════════════════════════════════════════════
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   reading_text, audio_url, transcript, correct_answer, pro_tip)
VALUES
(5, 'reading', 'reading', 7,
  'Read the following conversation. You can also listen to the audio version. After reading, test your comprehension.',
  'At the Restaurant',
  'A waiter walks up to a table where Sarah and Mark are sitting.

"Good evening. Welcome to The Garden Bistro. My name is David, and I will be your server tonight. Can I start you off with something to drink?" the waiter asks.

"Yes, please. I will have a glass of water with lemon," Sarah says.

"And I would like an iced tea, please," Mark adds.

"Great choices. Here are your menus. Our special tonight is grilled salmon with roasted vegetables. I will give you a few minutes to decide."

A few minutes later, the waiter returns.

"Are you ready to order?"

"I think so. I will have the Caesar salad as a starter, and the grilled salmon, please," Sarah says.

"Excellent choice. And for you, sir?"

"Could I have the mushroom soup to start, and then the pasta with tomato sauce?"

"Of course. Would you like any bread for the table?"

"Yes, please. That would be great," they both agree.

"Perfect. I will have that right out for you."',
  '/audio/ex-reading-conv-01.mp3',
  'Good evening. Welcome to The Garden Bistro. My name is David, and I will be your server tonight.',
  'read',
  'Notice the polite language used in restaurants: "Can I start you off with...", "I will have...", "Could I have...", "Would you like...". These are essential phrases for dining out.');

-- Now insert comprehension questions that reference the reading exercise above.
-- The parent_exercise_id must match the reading exercise ID.
-- We use a subquery to find it dynamically.

INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   options, correct_answer, pro_tip, parent_exercise_id)
VALUES
(5, 'multiple_choice', 'reading', 8,
  'Answer this question about the text you just read.',
  'What is the restaurant special tonight?',
  '[{"label":"A","text":"Mushroom soup"},{"label":"B","text":"Caesar salad"},{"label":"C","text":"Grilled salmon with roasted vegetables"},{"label":"D","text":"Pasta with tomato sauce"}]',
  'Grilled salmon with roasted vegetables',
  'The waiter says: "Our special tonight is grilled salmon with roasted vegetables."',
  (SELECT id FROM exercises WHERE lesson_id = 5 AND type = 'reading' AND order_index = 7 LIMIT 1)),

(5, 'multiple_choice', 'reading', 9,
  'Answer this question about the text you just read.',
  'What does Mark order as his main course?',
  '[{"label":"A","text":"Grilled salmon"},{"label":"B","text":"Caesar salad"},{"label":"C","text":"Mushroom soup"},{"label":"D","text":"Pasta with tomato sauce"}]',
  'Pasta with tomato sauce',
  'Mark says: "Could I have the mushroom soup to start, and then the pasta with tomato sauce?" The soup is the starter, the pasta is the main course.',
  (SELECT id FROM exercises WHERE lesson_id = 5 AND type = 'reading' AND order_index = 7 LIMIT 1));
