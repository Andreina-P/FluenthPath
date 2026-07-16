-- 003_reading_and_listening_cloze.sql
-- 2 Reading exercises + 2 Listening-cloze exercises (as multiple_choice with audio)

-- ═══════════════════════════════════════════════════════
-- READING — Lesson 1 (Greetings) — 2 exercises
-- Pattern: long text + audio support + "I finished reading" button
-- ═══════════════════════════════════════════════════════

INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   reading_text, audio_url, transcript, correct_answer, pro_tip)
VALUES
(1, 'reading', 'reading', 5,
  'Read the following short story. You can also listen to the audio version. Press the button when you finish.',
  'A Morning at the Coffee Shop',
  'Emma walks into a small coffee shop on Monday morning. She sees her friend Tom sitting near the window.

"Good morning, Tom!" she says with a smile.

"Hi, Emma! How are you today?" Tom asks.

"I am great, thank you. And you?"

"I am fine. Would you like some coffee?"

"Yes, please. Nice to see you!"

They sit together, drink coffee, and talk about their plans for the day. Before leaving, Emma says, "Goodbye, Tom! Have a nice day!"

"See you tomorrow!" Tom replies.',
  '/audio/ex-reading-01.mp3',
  'Emma walks into a small coffee shop on Monday morning. She sees her friend Tom sitting near the window. Good morning, Tom! she says with a smile. Hi, Emma! How are you today? Tom asks. I am great, thank you. And you? I am fine. Would you like some coffee? Yes, please. Nice to see you! They sit together, drink coffee, and talk about their plans for the day. Before leaving, Emma says, Goodbye, Tom! Have a nice day! See you tomorrow! Tom replies.',
  'read',
  'Notice how Emma and Tom use common greetings: "Good morning", "How are you?", "Nice to see you", and farewells like "Goodbye" and "See you tomorrow".'),

(2, 'reading', 'reading', 3,
  'Read the following short story. You can also listen to the audio version. Press the button when you finish.',
  'A Busy Saturday',
  'Luis wakes up early on Saturday. He eats breakfast and drinks orange juice.

After breakfast, he cleans his room. He makes the bed and organizes his books.

At noon, Luis walks to the park. He runs for thirty minutes and then sits on a bench to rest.

In the afternoon, he goes to the supermarket. He buys bread, milk, and eggs.

In the evening, Luis cooks dinner. He makes pasta with tomato sauce. After dinner, he watches a movie and goes to bed at ten o clock.

Luis likes Saturdays because he does many things he enjoys.',
  '/audio/ex-reading-02.mp3',
  'Luis wakes up early on Saturday. He eats breakfast and drinks orange juice. After breakfast, he cleans his room. He makes the bed and organizes his books. At noon, Luis walks to the park. He runs for thirty minutes and then sits on a bench to rest. In the afternoon, he goes to the supermarket. He buys bread, milk, and eggs. In the evening, Luis cooks dinner. He makes pasta with tomato sauce. After dinner, he watches a movie and goes to bed at ten o clock. Luis likes Saturdays because he does many things he enjoys.',
  'read',
  'Notice how the story uses simple present tense verbs: wakes, eats, drinks, cleans, walks, runs, buys, cooks, watches, goes. These describe habitual actions.');


-- ═══════════════════════════════════════════════════════
-- LISTENING CLOZE — Lesson 3 (Past Continuous) — 2 exercises
-- Pattern: audio + incomplete sentence + multiple choice options
-- Stored as type='multiple_choice' with skill='listening' + audio_url
-- ═══════════════════════════════════════════════════════

INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text,
   audio_url, transcript, options, correct_answer, pro_tip)
VALUES
(3, 'multiple_choice', 'listening', 3,
  'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  'The children were _____ in the garden when their mother called them for lunch.',
  '/audio/ex-listening-cloze-01.mp3',
  'The children were playing in the garden when their mother called them for lunch.',
  '[{"label":"A","text":"playing"},{"label":"B","text":"played"},{"label":"C","text":"plays"},{"label":"D","text":"play"}]',
  'playing',
  'The past continuous uses "were" + verb ending in "-ing". Since "were" is already in the sentence, you need the "-ing" form: "playing".'),

(3, 'multiple_choice', 'listening', 4,
  'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  'He was _____ a letter when the lights went out.',
  '/audio/ex-listening-cloze-02.mp3',
  'He was writing a letter when the lights went out.',
  '[{"label":"A","text":"writing"},{"label":"B","text":"wrote"},{"label":"C","text":"written"},{"label":"D","text":"write"}]',
  'writing',
  '"Was" + verb-ing forms the past continuous. The action of writing was in progress when the interruption (lights went out) happened.');
