require('dotenv').config();

const express     = require('express');
const path        = require('path');
const ejsLayouts  = require('express-ejs-layouts');
const session     = require('express-session');
const PgSession   = require('connect-pg-simple')(session);
const { pool }    = require('./src/config/database');
const setLocals   = require('./src/middleware/setLocals');
const errorHandler = require('./src/middleware/errorHandler');
const routes      = require('./src/routes/index');

const app = express();

/* ── View engine ─────────────────────────────────────── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/* ── Layout engine ───────────────────────────────────── */
/* express-ejs-layouts wraps every rendered view inside layouts/main.ejs.
   The view's HTML is injected where <%- body %> appears in the layout.
   Without this middleware, views render WITHOUT the layout — meaning
   no <head>, no CSS links, no header, no skip link, no live region. */
app.set('layout', 'layouts/main');
app.use(ejsLayouts);

/* ── Static files ────────────────────────────────────── */
app.use(express.static(path.join(__dirname, 'src/public')));

/* ── Body parsing ────────────────────────────────────── */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ── Sessions ────────────────────────────────────────── */
app.use(session({
  store: new PgSession({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie: {
    secure:   process.env.NODE_ENV === 'production',
    httpOnly: true,                        // Prevents JS access to cookie
    sameSite: 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000,    // 7 days
  },
}));

/* ── Global view locals ──────────────────────────────── */
app.use(setLocals);

/* ── Routes ──────────────────────────────────────────── */
app.use('/', routes);

/* ── Centralised error handler ───────────────────────── */
app.use(errorHandler);

/* ── Start server ────────────────────────────────────── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FluentPath running → http://localhost:${PORT}`);
});