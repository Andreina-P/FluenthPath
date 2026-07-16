# FluentPath

Plataforma web accesible para el aprendizaje del idioma inglés, desarrollada como proyecto de Usabilidad y Accesibilidad — Escuela Politécnica Nacional.

Cumple **WCAG 2.2 nivel AA**. Diseñada para ser utilizada indistintamente por personas videntes y personas ciegas mediante lector de pantalla (probado con **NVDA**), sin ningún modo o ajuste de accesibilidad que activar: la accesibilidad es el comportamiento por defecto de toda la interfaz.

---

## Tabla de contenido

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Variables de entorno](#variables-de-entorno)
- [Levantar el proyecto](#levantar-el-proyecto)
- [Archivos de audio pendientes](#archivos-de-audio-pendientes)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Decisiones de accesibilidad](#decisiones-de-accesibilidad)
- [Checklist WCAG 2.2 AA implementado](#checklist-wcag-22-aa-implementado)
- [Solución de problemas](#solución-de-problemas)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework HTTP | Express.js |
| Motor de vistas | EJS (Server-Side Rendering) |
| Estilos | CSS nativo (sin frameworks) |
| JavaScript cliente | Vanilla JS, mínimo e imprescindible |
| Base de datos | PostgreSQL |
| Sesiones | express-session + connect-pg-simple |
| Contraseñas | bcryptjs |

**Por qué SSR y no una SPA:** los lectores de pantalla funcionan de forma más predecible con HTML real enviado por el servidor. Cada navegación dispara el anuncio automático del `<title>`, y el foco se resetea de forma natural al inicio del documento — comportamiento que una SPA tendría que replicar manualmente y es fácil de hacer mal.

---

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL 14 o superior
- npm

---

## Estructura del proyecto

```
fluentpath/
├── app.js                          # Punto de entrada de Express
├── .env.example                    # Plantilla de variables de entorno
├── package.json
│
├── database/
│   ├── migrations/                 # 6 migraciones SQL, numeradas en orden
│   └── seeds/                      # Datos iniciales (lecciones, ejercicios, vocabulario)
│
└── src/
    ├── config/
    │   └── database.js             # Pool de conexión a PostgreSQL
    │
    ├── controllers/                # Lógica de negocio por dominio
    │   ├── authController.js
    │   ├── dashboardController.js
    │   ├── lessonController.js
    │   ├── exerciseController.js
    │   ├── assessmentController.js
    │   ├── onboardingController.js
    │   ├── progressController.js
    │   └── vocabularyController.js
    │
    ├── models/                     # Acceso a datos (SQL plano, sin ORM)
    │   ├── User.js
    │   ├── UserStats.js
    │   ├── Lesson.js
    │   ├── Exercise.js
    │   ├── UserProgress.js
    │   └── Vocabulary.js
    │
    ├── routes/                     # Definición de endpoints Express
    │
    ├── middleware/
    │   ├── requireAuth.js          # Protege rutas autenticadas
    │   ├── setLocals.js            # Inyecta datos comunes a todas las vistas
    │   └── errorHandler.js         # Manejo centralizado de errores → 404/500
    │
    ├── views/                      # Plantillas EJS
    │   ├── layouts/main.ejs        # Layout base: skip link, live region, landmarks
    │   ├── partials/               # Header, sidebar, flash, keyboard-hint
    │   ├── auth/                   # Login, registro
    │   ├── onboarding/             # 3 páginas de bienvenida (no modal)
    │   ├── dashboard/
    │   ├── lessons/                # Lista y detalle de lecciones
    │   ├── vocabulary/             # Tarjetas estáticas de vocabulario
    │   ├── exercises/              # 5 tipos de ejercicio + feedback
    │   ├── assessment/             # Configuración de timer, pregunta, resultados
    │   ├── progress/
    │   └── errors/                 # 404, 500
    │
    └── public/
        ├── css/                    # base, layout, components, exercises, animations, focus
        ├── js/                     # focus-manager, live-region, exercise, word-bank
        └── audio/                  # Archivos .mp3 de los ejercicios (ver sección aparte)
```

---

## Instalación

```bash
# Instalar dependencias
npm install
```

---

## Configuración de la base de datos

### 1. Crear la base de datos

```bash
psql -U postgres
```

```sql
CREATE DATABASE fluentpath;
\q
```

### 2. Ejecutar las migraciones en orden

Las migraciones están numeradas y deben ejecutarse en secuencia porque hay dependencias de llaves foráneas (`lessons` debe existir antes que `exercises`, por ejemplo):

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
| `users` | Cuentas de usuario (nombre, email, hash de contraseña) |
| `lessons` | Lecciones agrupadas por nivel (beginner, elementary, conversational) |
| `exercises` | Los 5 tipos de ejercicio + assessment, con `pro_tip` para feedback |
| `user_progress` | Registro de intentos y aciertos por usuario y ejercicio |
| `user_stats` | XP, racha, nivel de assessment, porcentaje por habilidad |
| `vocabulary` | Tarjetas de palabra + definición + ejemplo por lección |
| `user_sessions` | Creada automáticamente por `connect-pg-simple` al arrancar el servidor |

---

## Variables de entorno

Copia la plantilla y complétala:

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/fluentpath
SESSION_SECRET=una_cadena_aleatoria_de_al_menos_32_caracteres
NODE_ENV=development
PORT=3000
```

**`DATABASE_URL`** — cadena de conexión completa a PostgreSQL. Ajusta usuario, contraseña, host y puerto según tu instalación local.

**`SESSION_SECRET`** — cualquier cadena larga y aleatoria. Puedes generar una rápido con:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**`NODE_ENV`** — `development` en local. En producción, cambia a `production` para que las cookies de sesión exijan HTTPS (`secure: true`).

**`PORT`** — puerto donde corre el servidor Express. 3000 por defecto.

---

## Levantar el proyecto

Antes que nada se realiza:
```bash
npm install express-ejs-layouts
```

**Modo desarrollo** (reinicia automáticamente al guardar cambios, requiere `nodemon` ya incluido en `devDependencies`):

```bash
npm run dev
```

**Modo producción:**

```bash
npm start
```

La aplicación queda disponible en `http://localhost:3000`. La ruta raíz `/` redirige automáticamente a `/login` si no hay sesión activa, o a `/dashboard` (u `/onboarding/1` en el primer ingreso) si ya hay sesión.

---

## Archivos de audio pendientes

El proyecto referencia 4 archivos de audio que **vienen incluidos(pero son incorrectos)** y deben corregirse en `src/public/audio/`:

| Archivo | Usado en | Contenido a grabar |
|---|---|---|
| `ex-listening-01.mp3` | Lección 3, ejercicio 1 | "They were walking to the market yesterday morning." |
| `ex-listening-02.mp3` | Lección 3, ejercicio 2 | "She was studying English when the phone rang." |
| `ex-speaking-01.mp3` | Lección 1, ejercicio 3 | "Good morning! How are you today?" |
| `ex-speaking-02.mp3` | Lección 1, ejercicio 4 | "Nice to meet you. My name is Alex." |
| `ex-reading-01.mp3` | --- | --- |
| `ex-reading-02.mp3` | --- | --- |
| `ex-listening-cloze-01.mp3` | --- | --- |
| `ex-listening-cloze-02.mp3` | --- | --- |

Pueden grabarse manualmente o generarse con cualquier herramienta de texto a voz (TTS) en inglés. Sin estos archivos, los ejercicios de tipo `listening` y `speaking` mostrarán el reproductor de audio vacío, pero el resto de la aplicación funciona con normalidad.

---

## Rutas de la aplicación

| Método | Ruta | Requiere sesión |
|---|---|:---:|
| GET/POST | `/login`, `/register` | No |
| POST | `/logout` | Sí |
| GET | `/onboarding/:step` (1–3) | Sí |
| POST | `/onboarding/complete` | Sí |
| GET | `/dashboard` | Sí |
| GET | `/lessons` | Sí |
| GET | `/lessons/:id` | Sí |
| GET | `/lessons/:id/vocabulary` | Sí |
| GET | `/exercises/:id` | Sí |
| POST | `/exercises/:id/submit` | Sí |
| GET | `/exercises/:id/feedback` | Sí |
| GET | `/assessment` | Sí |
| POST | `/assessment/start` | Sí |
| GET | `/assessment/question` | Sí |
| POST | `/assessment/submit` | Sí |
| GET | `/assessment/results` | Sí |
| GET | `/progress` | Sí |

Todas las rutas POST usan el patrón **Post-Redirect-Get (PRG)** para evitar reenvíos duplicados al refrescar el navegador.

---

## Decisiones de accesibilidad

Estas decisiones de diseño están tomadas deliberadamente y no deben revertirse sin volver a evaluar el impacto en accesibilidad:

- **Sin modales ni pop-ups.** El feedback de ejercicios y el onboarding son páginas reales con su propia URL, no overlays. Evita el manejo manual de trampas de foco.
- **Sin hover para vocabulario.** Las definiciones se muestran siempre visibles en tarjetas `<article>`, nunca ocultas detrás de un tooltip.
- **Sin pantalla de ajustes de accesibilidad.** No existe un "modo accesible" que activar — el comportamiento accesible es el único disponible.
- **Sin reconocimiento de voz.** El ejercicio de speaking usa un botón "I practiced this" en lugar de la Web Speech API, que tiene soporte inconsistente con lectores de pantalla.
- **Sin audio de fondo.** El único audio de la aplicación es el de los ejercicios de listening/speaking, bajo control directo del usuario mediante `<audio controls>` nativo, sin autoplay.
- **Botón "Continue/Check Answer" con `aria-disabled`, no `disabled`.** El atributo HTML `disabled` saca el botón del orden de Tab, dejándolo invisible para un usuario de lector de pantalla hasta que ya haya respondido. `aria-disabled="true"` lo mantiene alcanzable y anunciado como "dimmed", con un texto de ayuda vinculado por `aria-describedby`.
- **`focus.css` se carga siempre último y no debe modificarse** para dar prioridad a preferencias estéticas — la visibilidad del foco de teclado no es negociable.
- **Orden DOM del sidebar:** en `main.ejs`, `<main>` aparece antes que `<aside>` en el HTML; la posición visual (sidebar a la izquierda) se logra únicamente con `order` de CSS flexbox, nunca reordenando el DOM.

---

## Checklist WCAG 2.2 AA implementado

Los siguientes criterios están cubiertos por el código tal como está estructurado. Nivel A y AA únicamente — no se implementó ningún criterio AAA.

**Perceptible:** 1.1.1, 1.2.1, 1.2.2, 1.3.1, 1.3.2, 1.3.3, 1.4.1, 1.4.2, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12

**Operable:** 2.1.1, 2.1.2, 2.2.1, 2.3.1, 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.6, 2.4.7, 2.4.11, 2.5.3, 2.5.7, 2.5.8

**Comprensible:** 3.1.1, 3.2.1, 3.2.2, 3.2.6, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8

**Robusto:** 4.1.2, 4.1.3

Verificación recomendada antes de entrega: recorrido completo de cada página con Tab/Shift+Tab, prueba de lectura con NVDA en cada flujo (login → onboarding → lección → ejercicio → feedback → assessment), y validación de contraste con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) sobre los tokens definidos en `src/public/css/base.css`.

---

## Solución de problemas

**Error `ECONNREFUSED` al arrancar** — PostgreSQL no está corriendo o `DATABASE_URL` en `.env` tiene datos incorrectos. Verifica con `psql -U postgres -d fluentpath` que puedes conectarte manualmente con esas mismas credenciales.

**Error `relation "users" does not exist`** — las migraciones no se ejecutaron o se ejecutaron en la base de datos equivocada. Repite el paso de migraciones apuntando explícitamente a la base `fluentpath`.

**La sesión no persiste entre requests** — revisa que `SESSION_SECRET` esté definido en `.env`. `connect-pg-simple` crea automáticamente la tabla `user_sessions` en el primer arranque; si falla, confirma que el usuario de PostgreSQL tiene permisos de `CREATE TABLE`.

**Los ejercicios de listening/speaking no reproducen audio** — faltan los 4 archivos `.mp3` en `src/public/audio/` (ver sección correspondiente arriba).

**Cambios en CSS/EJS no se reflejan** — si usas `npm start` en lugar de `npm run dev`, el servidor no observa cambios de archivo. Usa `npm run dev` durante el desarrollo.
