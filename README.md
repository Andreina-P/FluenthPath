# FluentPath

Accessible web platform for learning English. Built for the Usability and Accessibility course at Escuela Politecnica Nacional.

Complies with **WCAG 2.2 Level AA**. Designed to work equally well for sighted users and screen reader users (tested with NVDA). Accessibility is the default behavior — there is no "accessible mode" to activate.

**Live:** Deployed on Vercel + Supabase.

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Views | EJS (Server-Side Rendering) |
| Styles | Native CSS (Deep Ocean palette) |
| Client JS | Vanilla JS, minimal |
| Database | PostgreSQL (Supabase) |
| Sessions | express-session + connect-pg-simple |
| Passwords | bcryptjs |
| Hosting | Vercel |

---

## Project Structure

```
FluenthPath/
├── app.js
├── .env.example
├── package.json
│
├── database/
│   ├── migrations/
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_lessons.sql
│   │   ├── 003_create_exercises.sql
│   │   ├── 004_create_user_progress.sql
│   │   ├── 005_create_user_stats.sql
│   │   ├── 006_create_vocabulary.sql
│   │   ├── 007_add_skill_and_reading.sql
│   │   └── 008_add_parent_exercise_id.sql
│   └── seeds/
│       ├── 001_all_seeds.sql
│       ├── 002_vocabulary_and_speaking.sql
│       ├── 003_reading_and_listening_cloze.sql
│       ├── 004_fix_encoding_and_answers.sql
│       ├── 005_conversational_level.sql
│       └── 006_update_all_content.sql
│
└── src/
    ├── config/
    │   └── database.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── assessmentController.js
    │   ├── dashboardController.js
    │   ├── exerciseController.js
    │   ├── helpController.js
    │   ├── lessonController.js
    │   ├── onboardingController.js
    │   ├── profileController.js
    │   ├── progressController.js
    │   └── vocabularyController.js
    │
    ├── models/
    │   ├── User.js
    │   ├── UserStats.js
    │   ├── UserProgress.js
    │   ├── Lesson.js
    │   ├── Exercise.js
    │   └── Vocabulary.js
    │
    ├── routes/
    │   ├── index.js
    │   ├── authRoutes.js
    │   ├── assessmentRoutes.js
    │   ├── dashboardRoutes.js
    │   ├── exerciseRoutes.js
    │   ├── helpRoutes.js
    │   ├── lessonRoutes.js
    │   ├── onboardingRoutes.js
    │   ├── profileRoutes.js
    │   └── progressRoutes.js
    │
    ├── middleware/
    │   ├── requireAuth.js
    │   ├── setLocals.js
    │   └── errorHandler.js
    │
    ├── views/
    │   ├── layouts/main.ejs
    │   ├── partials/ (header, sidebar, flash, keyboard-hint)
    │   ├── auth/ (login, register)
    │   ├── onboarding/ (step-1 through step-5)
    │   ├── dashboard/index.ejs
    │   ├── lessons/ (index, show)
    │   ├── vocabulary/index.ejs
    │   ├── exercises/ (multiple-choice, translate, listening, word-bank, speaking, reading, feedback)
    │   ├── assessment/ (settings, question, results)
    │   ├── progress/index.ejs
    │   ├── profile/index.ejs
    │   ├── help/index.ejs
    │   └── errors/ (404, 500)
    │
    └── public/
        ├── css/ (base, layout, components, exercises, animations, focus)
        ├── js/ (focus-manager, live-region, exercise, word-bank)
        └── audio/ (10 audio files)
```

---

## Installation (Local)

```bash
# Instalar dependencias
npm install
cp .env.example .env
# Edit .env with your PostgreSQL connection and session secret
```

---

## Database Setup

### Create the database

```sql
CREATE DATABASE fluentpath;
\q
```

### Run migrations in order

Run these from **pgAdmin Query Tool** or **Supabase SQL Editor** (not PowerShell):

```bash
psql -U postgres -d fluentpath -f database/migrations/001_create_users.sql
psql -U postgres -d fluentpath -f database/migrations/002_create_lessons.sql
psql -U postgres -d fluentpath -f database/migrations/003_create_exercises.sql
psql -U postgres -d fluentpath -f database/migrations/004_create_user_progress.sql
psql -U postgres -d fluentpath -f database/migrations/005_create_user_stats.sql
psql -U postgres -d fluentpath -f database/migrations/006_create_vocabulary.sql
psql -U postgres -d fluentpath -f database/migrations/007_add_skill_and_reading.sql
```

### 3. Cargar los datos semilla

```bash
psql -U postgres -d fluentpath -f database/seeds/001_all_seeds.sql
psql -U postgres -d fluentpath -f database/seeds/002_vocabulary_and_speaking.sql
psql -U postgres -d fluentpath -f database/seeds/003_reading_and_listening_cloze.sql
```

Esto carga 4 lecciones, 12 ejercicios (2 de cada tipo: multiple choice, translate, listening, word bank, speaking, más 2 de assessment) y 13 tarjetas de vocabulario.

### Tablas creadas

| Tabla | Contenido |
|---|---|
| `ex-speaking-01.mp3` | Hi Eleanor, I'm Michael conversation |
| `ex-speaking-02.mp3` | Al, Bob, and Anita introduction |
| `ex-reading-01.mp3` | What's Your Name? (Marie and Ben) |
| `ex-reading-02.mp3` | Social Life (meeting Stephanie) |
| `ex-reading-conv-01.mp3` | Ordering in a Restaurant |
| `ex-reading-03.mp3` | Additional reading audio |
| `ex-listening-01.mp3` | "I was hiding under your porch because I love you." |
| `ex-listening-02.mp3` | "I was wondering what would break first." |
| `ex-listening-cloze-01.mp3` | "We were just talking about you." |
| `ex-listening-cloze-02.mp3` | "I was expecting someone with your reputation..." |

---

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@host:5432/fluentpath
SESSION_SECRET=random_string_minimum_32_characters
NODE_ENV=development
PORT=3000
```

Generate a session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Running

```bash
npm run dev    # Development (auto-restart on changes)
npm start      # Production
```

The app runs at `http://localhost:3000`.

---

## Routes

| Method | Path | Auth | Description |
|---|---|:---:|---|
| GET/POST | `/login`, `/register` | No | Authentication |
| POST | `/logout` | Yes | End session |
| GET | `/onboarding/:step` | Yes | Welcome guide (5 steps) |
| POST | `/onboarding/complete` | Yes | Mark onboarding as seen |
| GET | `/dashboard` | Yes | Main dashboard |
| GET | `/lessons` | Yes | All lessons by level |
| GET | `/lessons/:id` | Yes | Lesson detail + exercises |
| GET | `/lessons/:id/vocabulary` | Yes | Vocabulary cards |
| GET | `/exercises/:id` | Yes | Exercise (dispatches by type) |
| POST | `/exercises/:id/submit` | Yes | Submit answer |
| GET | `/exercises/:id/feedback` | Yes | Result + Pro-Tip |
| GET | `/assessment` | Yes | Timer settings |
| POST | `/assessment/start` | Yes | Begin assessment |
| GET | `/assessment/question` | Yes | Current question |
| POST | `/assessment/submit` | Yes | Submit + advance |
| GET | `/assessment/results` | Yes | Assigned level |
| GET | `/assessment/retake` | Yes | Reset and retake |
| GET | `/progress` | Yes | Full progress page |
| GET | `/profile` | Yes | Account settings |
| POST | `/profile/update` | Yes | Change name/email |
| POST | `/profile/password` | Yes | Change password |
| POST | `/profile/delete` | Yes | Delete account |
| GET | `/help` | Yes | Help and FAQ |

---

## Lessons and Content

| Lesson | Level | Exercises | Skills Covered |
|---|---|---|---|
| 1.1 Intro to Greetings | Beginner | Translation, Speaking, Reading + comprehension | Writing, Speaking, Reading |
| 1.2 Basic Verbs | Beginner | Word Bank, Reading + comprehension | Writing, Reading |
| 2.1 Past Continuous | Elementary | Listening dictation, Listening cloze | Listening |
| 2.2 Third Conditional | Elementary | Multiple choice (grammar) | Writing |
| 3.1 Real-World Conversations | Conversational | Grammar, Translation, Listening cloze, Speaking, Reading + comprehension | All four skills |

---

## WCAG 2.2 AA Compliance

33 criteria implemented across the four POUR principles. Key decisions:

- No modals or pop-ups (feedback and onboarding are real pages)
- No hover for vocabulary (always-visible cards)
- No accessibility settings screen (accessible by default)
- No voice recognition (speaking uses "I practiced this" button)
- No background audio (only user-triggered exercise audio)
- `aria-disabled` instead of `disabled` on Continue buttons
- `focus.css` loaded last and never overridden
- DOM order: main before sidebar, CSS handles visual placement
