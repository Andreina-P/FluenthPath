-- 006_update_all_content.sql
-- Updates ALL exercise content to match the new audio files.
-- RUN FROM pgAdmin Query Tool or Supabase SQL Editor (NOT PowerShell).

-- ═══════════════════════════════════════════════════════
-- SPEAKING EXERCISES — Lesson 1 (Greetings)
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  question_text = 'Practice this greeting conversation:',
  transcript = 'Hi Eleanor. I''m Michael, how are you today? I''m great, thanks for asking.',
  pro_tip = 'Notice the casual greeting pattern: name + "how are you today?" followed by a positive response. "Thanks for asking" is a polite way to acknowledge the question.'
WHERE type = 'speaking' AND lesson_id = 1 AND order_index = 3;

UPDATE exercises SET
  question_text = 'Practice this introduction conversation:',
  transcript = 'Hi Al, how are you? I''m fine, thank you. And you? I''m doing good. Who''s your friend? Oh, this is Bob. We went to school together. Bob, this is Anita. Hi. Nice to meet you, Anita. Hi. Nice to meet you, too.',
  pro_tip = 'Notice how introductions work in groups: "This is [name]" introduces someone, followed by context ("We went to school together"). Both people say "Nice to meet you" — the second person adds "too" at the end.'
WHERE type = 'speaking' AND lesson_id = 1 AND order_index = 4;


-- ═══════════════════════════════════════════════════════
-- READING EXERCISES — Lesson 1 (Greetings): "What's Your Name?"
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  question_text = 'What''s Your Name?',
  reading_text = 'Man: Hello! What''s your name?
Woman: Hi! My name''s Marie.
Man: What? Mary?
Woman: No, no. Marie.
Man: Sorry, I didn''t hear what you said. Maria! Got it.
Woman: Err... no. Not Maria. Marie.
Man: How do you spell it?
Woman: M-A-R-I-E
Man: Oh, I''m sorry. My English isn''t so good.
Woman: That''s alright. What''s your name?
Man: Sorry?
Woman: What''s your name?
Man: Oh! My name''s Ben.
Woman: Nice to meet you.
Man: Yes, and you. Where are you from?
Woman: I''m from Slovakia.
Man: Pardon?
Woman: Slovakia!
Man: I''m sorry, I didn''t catch what you said.
Woman: Never mind... See you later!
Man: Oh, ok. Bye...',
  transcript = 'Hello! What is your name? Hi! My name is Marie. What? Mary? No, no. Marie. Sorry, I did not hear what you said. Maria! Got it. No. Not Maria. Marie. How do you spell it? M-A-R-I-E. Oh, I am sorry. My English is not so good. That is alright. What is your name? Sorry? What is your name? Oh! My name is Ben. Nice to meet you. Yes, and you. Where are you from? I am from Slovakia. Pardon? Slovakia! I am sorry, I did not catch what you said. Never mind. See you later! Oh, ok. Bye.',
  pro_tip = 'Notice the useful phrases for when you do not understand someone: "Sorry?", "Pardon?", "I didn''t hear what you said", "I didn''t catch what you said", and "How do you spell it?" These are essential in real conversations.'
WHERE type = 'reading' AND lesson_id = 1 AND order_index = 5;

-- Update comprehension questions for Lesson 1 reading (if any exist)
-- First delete old comprehension questions for lesson 1 reading
DELETE FROM exercises WHERE parent_exercise_id = (
  SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 1 AND order_index = 5 LIMIT 1
);

-- Insert new comprehension questions
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, options, correct_answer, pro_tip, parent_exercise_id)
VALUES
(1, 'multiple_choice', 'reading', 6,
  'Answer this question about the conversation you just read.',
  'What is the woman''s name?',
  '[{"label":"A","text":"Mary"},{"label":"B","text":"Maria"},{"label":"C","text":"Marie"},{"label":"D","text":"Marina"}]',
  'Marie',
  'The man confuses her name several times (Mary, Maria) but she spells it out: M-A-R-I-E.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 1 AND order_index = 5 LIMIT 1)),

(1, 'multiple_choice', 'reading', 7,
  'Answer this question about the conversation you just read.',
  'Where is Marie from?',
  '[{"label":"A","text":"Slovenia"},{"label":"B","text":"Slovakia"},{"label":"C","text":"Serbia"},{"label":"D","text":"Sweden"}]',
  'Slovakia',
  'Marie says "I''m from Slovakia" but Ben has trouble hearing it — a common situation in real conversations.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 1 AND order_index = 5 LIMIT 1));


-- ═══════════════════════════════════════════════════════
-- READING EXERCISES — Lesson 2 (Basic Verbs): "Social Life"
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  question_text = 'Social Life',
  reading_text = 'A: I''m meeting up with Stephanie after work. Do you wanna tag along?
B: Oh yes... it would be good to catch up. I don''t think I''ve seen her since she left. You know what! She was the first person I met here when I started! Where are you going?
A: Not sure yet. We''re gonna meet outside the library, but don''t know after that. We might just get a few drinks. Maybe a bite to eat and a walk along the canal if it stays nice. Would you be up for a walk or just drinks?
B: Don''t mind. I''ll fit in with whatever you decide.
A: OK. Shall we head over together when work finishes?
B: Yeah, let''s do that.
A: Great! See you in the car park at 5.
B: Sure thing!',
  transcript = 'I am meeting up with Stephanie after work. Do you want to tag along? Oh yes, it would be good to catch up. I do not think I have seen her since she left. You know what, she was the first person I met here when I started. Where are you going? Not sure yet. We are going to meet outside the library, but do not know after that. We might just get a few drinks. Maybe a bite to eat and a walk along the canal if it stays nice. Would you be up for a walk or just drinks? Do not mind. I will fit in with whatever you decide. OK. Shall we head over together when work finishes? Yeah, let us do that. Great! See you in the car park at 5. Sure thing!',
  pro_tip = 'Notice the informal expressions: "wanna" (want to), "gonna" (going to), "tag along" (come with), "catch up" (talk after a long time), "a bite to eat" (a meal), "head over" (go to a place). These are very common in casual British English.'
WHERE type = 'reading' AND lesson_id = 2 AND order_index = 3;

-- Delete old comprehension questions for lesson 2 reading
DELETE FROM exercises WHERE parent_exercise_id = (
  SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 2 AND order_index = 3 LIMIT 1
);

-- Insert new comprehension questions
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, options, correct_answer, pro_tip, parent_exercise_id)
VALUES
(2, 'multiple_choice', 'reading', 4,
  'Answer this question about the conversation you just read.',
  'Where are they going to meet Stephanie?',
  '[{"label":"A","text":"At the car park"},{"label":"B","text":"At the canal"},{"label":"C","text":"Outside the library"},{"label":"D","text":"At a restaurant"}]',
  'Outside the library',
  'Speaker A says "We''re gonna meet outside the library" — though they haven''t decided what to do after that.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 2 AND order_index = 3 LIMIT 1)),

(2, 'multiple_choice', 'reading', 5,
  'Answer this question about the conversation you just read.',
  'What time will they meet at the car park?',
  '[{"label":"A","text":"4 PM"},{"label":"B","text":"5 PM"},{"label":"C","text":"6 PM"},{"label":"D","text":"3 PM"}]',
  '5 PM',
  'Speaker A says "See you in the car park at 5" — this is where the two coworkers will meet before heading to the library together.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 2 AND order_index = 3 LIMIT 1));


-- ═══════════════════════════════════════════════════════
-- READING — Lesson 5 (Conversational): "Ordering in a Restaurant"
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  question_text = 'Ordering in a Restaurant',
  reading_text = 'A: What are we doing then? Starter and main course, or main course and dessert?
B: Er... probably main course and dessert. Trouble is the steaks are always really filling so if you have a starter, you risk not finishing your main.
A: Ooh, I do fancy an appetiser though. Why don''t we get some olives to share?
B: Nah, not for me, but don''t starve yourself on my account. You have what you like!
C: Are you ready to order?
A: Yes, I think we''re both gonna have the early evening special please, but could you bring some olives to pick at while we wait?
C: Of course. And how would you like your steaks?
A: Medium rare for me please.
B: And for me - thank you. Actually, no, rare - tell the chef to just show it to the heat and put it straight on the plate.
C: Understood! And any sides for you?
A: Um... what does it come with?
C: You get chips and a salad but some people like to choose one of the light bites to have on the side.
A: Oh yes, here they are... er... ooh, what about portobello mushrooms?
C: OK, and for you sir?
B: No, I won''t have anything else to eat, thanks. But could I switch drinks? I don''t really want the glass of wine that''s included. What soft drinks can I have instead?
C: You can have any of the bottled juices on the back of the menu there.
B: Ah... um... could you give me a minute to think.
C: Tell you what, let me put the food order through and I''ll come back for the drinks. Oh, er... are there any dietary requirements I need to know about?
A: Yeah, lots please!
C: (laughs) Of course!
B: Actually I''m gluten-free, but I think we''re safe with steak and chips, aren''t we?
C: Yes, not a problem, but I''ll let the kitchen know.',
  transcript = 'What are we doing then? Starter and main course, or main course and dessert? Probably main course and dessert. Trouble is the steaks are always really filling so if you have a starter, you risk not finishing your main. I do fancy an appetiser though. Why do we not get some olives to share? No, not for me, but do not starve yourself on my account. You have what you like. Are you ready to order? Yes, I think we are both going to have the early evening special please, but could you bring some olives to pick at while we wait? Of course. And how would you like your steaks? Medium rare for me please. And for me, thank you. Actually, no, rare. Tell the chef to just show it to the heat and put it straight on the plate. Understood. And any sides for you? What does it come with? You get chips and a salad but some people like to choose one of the light bites to have on the side. What about portobello mushrooms? OK, and for you sir? No, I will not have anything else to eat, thanks. But could I switch drinks? I do not really want the glass of wine that is included. What soft drinks can I have instead? You can have any of the bottled juices on the back of the menu. Could you give me a minute to think. Tell you what, let me put the food order through and I will come back for the drinks. Are there any dietary requirements I need to know about? Actually I am gluten-free, but I think we are safe with steak and chips. Yes, not a problem, but I will let the kitchen know.',
  pro_tip = 'Notice restaurant-specific phrases: "early evening special" (a deal), "how would you like your steak?" (rare, medium rare, well done), "sides" (extra dishes), "switch drinks" (change your choice), "dietary requirements" (food restrictions like gluten-free). The humour at the end ("Yeah, lots please!") is typical casual British banter.'
WHERE type = 'reading' AND lesson_id = 5 AND order_index = 7;

-- Delete old comprehension questions for conversational reading
DELETE FROM exercises WHERE parent_exercise_id = (
  SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 5 AND order_index = 7 LIMIT 1
);

-- Insert new comprehension questions
INSERT INTO exercises
  (lesson_id, type, skill, order_index, instruction, question_text, options, correct_answer, pro_tip, parent_exercise_id)
VALUES
(5, 'multiple_choice', 'reading', 8,
  'Answer this question about the conversation you just read.',
  'How does person B want their steak cooked?',
  '[{"label":"A","text":"Medium rare"},{"label":"B","text":"Well done"},{"label":"C","text":"Rare"},{"label":"D","text":"Medium"}]',
  'Rare',
  'Person B first says "And for me" (agreeing with medium rare) but then changes: "Actually, no, rare — tell the chef to just show it to the heat." This is a humorous way of saying very rare.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 5 AND order_index = 7 LIMIT 1)),

(5, 'multiple_choice', 'reading', 9,
  'Answer this question about the conversation you just read.',
  'What dietary requirement does person B have?',
  '[{"label":"A","text":"Vegetarian"},{"label":"B","text":"Lactose intolerant"},{"label":"C","text":"Gluten-free"},{"label":"D","text":"Vegan"}]',
  'Gluten-free',
  'Person B says "Actually I''m gluten-free" near the end of the conversation when the waiter asks about dietary requirements.',
  (SELECT id FROM exercises WHERE type = 'reading' AND lesson_id = 5 AND order_index = 7 LIMIT 1));


-- ═══════════════════════════════════════════════════════
-- LISTENING (Dictation) — Lesson 3
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  question_text = 'What sentence do you hear?',
  transcript = 'I was hiding under your porch because I love you.',
  correct_answer = 'I was hiding under your porch because I love you',
  pro_tip = '"Was hiding" is the past continuous — it describes an action in progress. The structure is: subject + was/were + verb-ing. Here it explains the reason for an ongoing action.'
WHERE type = 'listening' AND lesson_id = 3 AND order_index = 1;

UPDATE exercises SET
  question_text = 'What sentence do you hear?',
  transcript = 'I was wondering what would break first.',
  correct_answer = 'I was wondering what would break first',
  pro_tip = '"Was wondering" is the past continuous used for a thought in progress. "Would break" is a conditional form expressing uncertainty about the future from a past perspective.'
WHERE type = 'listening' AND lesson_id = 3 AND order_index = 2;


-- ═══════════════════════════════════════════════════════
-- LISTENING CLOZE — Lesson 3
-- ═══════════════════════════════════════════════════════

UPDATE exercises SET
  instruction = 'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  question_text = 'We were just _____ about you.',
  transcript = 'We were just talking about you.',
  options = '[{"label":"A","text":"talking"},{"label":"B","text":"talked"},{"label":"C","text":"talks"},{"label":"D","text":"talk"}]',
  correct_answer = 'talking',
  pro_tip = 'The past continuous uses "were" + verb ending in "-ing". Since "were" is already in the sentence, the missing word must be the "-ing" form: "talking".'
WHERE type = 'multiple_choice' AND skill = 'listening' AND lesson_id = 3 AND order_index = 3;

UPDATE exercises SET
  instruction = 'Listen to the audio carefully, then choose the missing word to complete the sentence.',
  question_text = 'I was _____ someone with your reputation to be a little... older.',
  transcript = 'I was expecting someone with your reputation to be a little older.',
  options = '[{"label":"A","text":"expecting"},{"label":"B","text":"expected"},{"label":"C","text":"expects"},{"label":"D","text":"expect"}]',
  correct_answer = 'expecting',
  pro_tip = '"Was expecting" is the past continuous. After "was", you need the "-ing" form of the verb. This sentence expresses a past assumption that turned out to be wrong.'
WHERE type = 'multiple_choice' AND skill = 'listening' AND lesson_id = 3 AND order_index = 4;


-- ═══════════════════════════════════════════════════════
-- ADDITIONAL VOCABULARY
-- ═══════════════════════════════════════════════════════

-- Lesson 1 — extra vocab from the new reading
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index)
SELECT 1, word, definition, example, order_index FROM (VALUES
  ('Spell',     'To say or write the letters of a word in the correct order.', 'How do you spell your name? M-A-R-I-E.', 4),
  ('Pardon',    'A polite way to ask someone to repeat what they said.',       'Pardon? I did not hear you.', 5),
  ('Never mind','An expression used when you decide something is not important.','Never mind, it does not matter.', 6)
) AS v(word, definition, example, order_index)
WHERE NOT EXISTS (SELECT 1 FROM vocabulary WHERE lesson_id = 1 AND word = 'Spell');

-- Lesson 2 — extra vocab from Social Life
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index)
SELECT 2, word, definition, example, order_index FROM (VALUES
  ('Tag along',  'To go somewhere with someone, often without a specific invitation.', 'Do you wanna tag along with us?', 4),
  ('Catch up',   'To talk with someone you have not seen for a while.',                'It would be good to catch up with her.', 5),
  ('Head over',  'To go to a place.',                                                   'Shall we head over together?', 6)
) AS v(word, definition, example, order_index)
WHERE NOT EXISTS (SELECT 1 FROM vocabulary WHERE lesson_id = 2 AND word = 'Tag along');

-- Lesson 5 — extra vocab from restaurant conversation
INSERT INTO vocabulary (lesson_id, word, definition, example, order_index)
SELECT 5, word, definition, example, order_index FROM (VALUES
  ('Starter',    'A small dish served before the main course.',                'Would you like a starter before your main?', 5),
  ('Side',       'An extra dish served alongside the main course.',            'Would you like any sides with that?', 6),
  ('Gluten-free','Food that does not contain gluten, a protein found in wheat.','I am gluten-free, so I cannot eat bread.', 7)
) AS v(word, definition, example, order_index)
WHERE NOT EXISTS (SELECT 1 FROM vocabulary WHERE lesson_id = 5 AND word = 'Starter');
