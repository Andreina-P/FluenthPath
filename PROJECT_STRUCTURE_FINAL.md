# FluentPath — Estructura Final del Proyecto

> **Stack:** Node.js · Express.js · EJS (SSR) · CSS nativo (Deep Ocean) · JS mínimo · PostgreSQL
> **Cumplimiento:** WCAG 2.2 — Nivel A y AA únicamente
> **Estado:** Fases 0–2 (scaffold, config, auth) ya construidas. Este documento define la estructura completa restante.

---

## Árbol de archivos completo

```
fluentpath/
├── app.js                                    ✅ construido
├── .env.example                               ✅ construido
├── package.json                                ✅ construido
│
├── database/
│   ├── migrations/                             ✅ construido (5 tablas)
│   └── seeds/                                  ✅ construido (10 ejercicios base)
│
└── src/
    ├── config/
    │   └── database.js                         ✅ construido
    │
    ├── controllers/
    │   ├── authController.js                   ✅ construido
    │   ├── dashboardController.js               🔲 nuevo
    │   ├── lessonController.js                  🔲 nuevo
    │   ├── exerciseController.js                 🔲 nuevo — incluye lógica de los 5 tipos
    │   ├── assessmentController.js               🔲 nuevo
    │   ├── progressController.js                 🔲 nuevo
    │   ├── onboardingController.js               🔲 nuevo — secuencia de páginas, no modal
    │   └── vocabularyController.js                🔲 nuevo
    │
    ├── models/
    │   ├── User.js                              ✅ construido
    │   ├── UserStats.js                          ✅ construido
    │   ├── Lesson.js                             ✅ construido
    │   ├── Exercise.js                           ✅ construido
    │   ├── UserProgress.js                       ✅ construido
    │   └── Vocabulary.js                         🔲 nuevo — palabra, definición, ejemplo
    │
    ├── routes/
    │   ├── index.js                             ✅ construido
    │   ├── authRoutes.js                         ✅ construido
    │   ├── dashboardRoutes.js                     ✅ construido (stub → completar)
    │   ├── lessonRoutes.js                        ✅ construido (stub → completar)
    │   ├── exerciseRoutes.js                      🔲 completar
    │   ├── assessmentRoutes.js                    🔲 completar
    │   ├── progressRoutes.js                      ✅ construido (stub → completar)
    │   ├── onboardingRoutes.js                    🔲 nuevo
    │   └── vocabularyRoutes.js                    🔲 nuevo
    │
    ├── middleware/
    │   ├── requireAuth.js                        ✅ construido
    │   ├── setLocals.js                           ✅ construido
    │   └── errorHandler.js                        ✅ construido
    │
    ├── views/
    │   ├── layouts/
    │   │   └── main.ejs                          ✅ construido
    │   │
    │   ├── partials/
    │   │   ├── header.ejs                        ✅ construido — sin ícono de Settings de accesibilidad
    │   │   ├── sidebar.ejs                        ✅ construido
    │   │   ├── flash.ejs                          ✅ construido
    │   │   └── keyboard-hint.ejs                   🔲 nuevo — leyenda de atajos reutilizable
    │   │
    │   ├── auth/
    │   │   ├── login.ejs                         ✅ construido
    │   │   └── register.ejs                       ✅ construido
    │   │
    │   ├── onboarding/                            🔲 nuevo — reemplaza el wizard modal del Figma
    │   │   ├── step-1.ejs                         "Welcome to FluentPath"
    │   │   ├── step-2.ejs                         "Types of exercises"
    │   │   └── step-3.ejs                         "You're ready to start"
    │   │
    │   ├── dashboard/
    │   │   └── index.ejs                         🔲 completar (placeholder existe)
    │   │
    │   ├── lessons/
    │   │   ├── index.ejs                          🔲 completar (placeholder existe)
    │   │   └── show.ejs                            🔲 nuevo — detalle + lista de ejercicios
    │   │
    │   ├── vocabulary/                             🔲 nuevo — tarjetas estáticas, sin hover
    │   │   └── index.ejs
    │   │
    │   ├── exercises/                               🔲 nuevo — 5 tipos
    │   │   ├── multiple-choice.ejs                 fieldset + radio nativo
    │   │   ├── translate.ejs                        input de texto + word bank opcional
    │   │   ├── listening.ejs                         audio controls + transcript + input
    │   │   ├── word-bank.ejs                         sentence builder con botones
    │   │   ├── speaking.ejs                           audio modelo + botón "I practiced this"
    │   │   └── feedback.ejs                            página completa, no modal
    │   │
    │   ├── assessment/                               🔲 nuevo
    │   │   ├── settings.ejs                          config de timer antes de iniciar
    │   │   ├── question.ejs                           pregunta activa
    │   │   └── results.ejs                            nivel asignado
    │   │
    │   ├── progress/
    │   │   └── index.ejs                             🔲 completar (placeholder existe)
    │   │
    │   └── errors/
    │       ├── 404.ejs                               ✅ construido
    │       └── 500.ejs                                ✅ construido
    │
    └── public/
        ├── css/
        │   ├── base.css                             ✅ construido — tokens Deep Ocean
        │   ├── layout.css                            ✅ construido
        │   ├── components.css                        ✅ construido
        │   ├── exercises.css                          🔲 completar (ya iniciado, agregar .vocabulary-card, .speaking-*)
        │   ├── animations.css                         ✅ construido — prefers-reduced-motion
        │   └── focus.css                              ✅ construido — 🔒 protegido
        │
        ├── audio/
        │   ├── ex-listening-01.mp3                   🔲 pendiente de grabar/generar
        │   ├── ex-listening-02.mp3                   🔲 pendiente
        │   ├── ex-speaking-01.mp3                     🔲 nuevo — audio modelo
        │   └── ex-speaking-02.mp3                     🔲 nuevo — audio modelo
        │
        └── js/
            ├── focus-manager.js                       ✅ construido
            ├── live-region.js                          ✅ construido
            ├── exercise.js                              🔲 nuevo — controla aria-disabled del botón Continue
            └── word-bank.js                              🔲 nuevo — append/remove de palabras
```

**Ya no existen en la estructura** (por las decisiones tomadas): `views/settings/`, cualquier `modal.ejs`, `views/exercises/drag-drop.ejs`, JS de reconocimiento de voz.

---

## Qué cambia respecto a la primera versión de la estructura

| Elemento | Antes | Ahora | Razón |
|---|---|---|---|
| Feedback de ejercicio | Posible modal | `views/exercises/feedback.ejs` — página con su propia ruta y `<title>` | Evita manejo manual de focus-trap; NVDA anuncia la página al cargar |
| Onboarding | Wizard con pasos 1/5–5/5 en una sola vista | 3 páginas reales en `views/onboarding/` | Mismo principio — sin overlay, sin trampa de foco |
| Vocabulario | No definido | `views/vocabulary/index.ejs` — tarjetas siempre visibles | Reemplaza cualquier tooltip/hover por HTML estático |
| Ajustes de accesibilidad | Pantalla `Accessibility Settings` del Figma | Eliminada — no existe ruta ni vista | La accesibilidad es el comportamiento por defecto, no un toggle |
| Speaking | Pendiente de definir | `views/exercises/speaking.ejs` con botón "I practiced this" | Sin dependencia de Web Speech API, que tiene soporte inconsistente con lectores de pantalla |
| Botón Continue | `disabled` HTML | `aria-disabled="true"` + `exercise.js` | `disabled` saca el botón del orden de Tab; `aria-disabled` lo mantiene alcanzable y anunciado |
| `word-bank.js` | No existía | Nuevo archivo dedicado | Reemplaza el drag-and-drop del Figma con botones accesibles |

---

## Modelo de datos — ajuste a `exercises`

La tabla `exercises` ya soporta `type` como `multiple_choice`, `translate`, `listening`, `word_bank`, `assessment`. Para Speaking se agrega un sexto valor al `CHECK` constraint:

```sql
ALTER TABLE exercises
  DROP CONSTRAINT exercises_type_check,
  ADD CONSTRAINT exercises_type_check
  CHECK (type IN ('multiple_choice','translate','listening','word_bank','speaking','assessment'));
```

Y una tabla nueva para vocabulario, independiente de `exercises` porque no es evaluable — es contenido de referencia:

```sql
CREATE TABLE IF NOT EXISTS vocabulary (
  id          SERIAL       PRIMARY KEY,
  lesson_id   INT          REFERENCES lessons(id) ON DELETE CASCADE,
  word        VARCHAR(100) NOT NULL,
  definition  TEXT         NOT NULL,
  example     TEXT,
  order_index INT          NOT NULL DEFAULT 0
);
```

---

## Rutas — tabla completa actualizada

| Método | Ruta | Controlador | Auth | Notas |
|---|---|---|---|---|
| GET | `/` | — | — | Redirect según sesión |
| GET/POST | `/login`, `/register` | auth | — | ✅ construido |
| POST | `/logout` | auth | ✓ | ✅ construido |
| GET | `/onboarding/1` `/2` `/3` | onboarding | ✓ (primer login) | Páginas reales, Next/Back/Skip |
| GET | `/dashboard` | dashboard | ✓ | |
| GET | `/lessons` | lesson | ✓ | |
| GET | `/lessons/:id` | lesson | ✓ | Detalle + lista de ejercicios + link a vocabulario de la lección |
| GET | `/lessons/:id/vocabulary` | vocabulary | ✓ | Tarjetas estáticas |
| GET | `/exercises/:id` | exercise | ✓ | Despacha a la vista según `type` |
| POST | `/exercises/:id/submit` | exercise | ✓ | PRG → redirige a feedback |
| GET | `/exercises/:id/feedback` | exercise | ✓ | Página completa, foco en `<h2 tabindex="-1">` |
| GET | `/assessment` | assessment | ✓ | Pantalla de configuración de timer |
| POST | `/assessment/start` | assessment | ✓ | Guarda config en sesión |
| GET | `/assessment/question` | assessment | ✓ | |
| POST | `/assessment/submit` | assessment | ✓ | |
| GET | `/assessment/results` | assessment | ✓ | |
| GET | `/progress` | progress | ✓ | |

**Nota:** no existe `/settings` ni `/accessibility-settings` — se eliminó del alcance según la decisión de que la accesibilidad no es opt-in. El ícono de ajustes que estaba en `header.ejs` debe removerse o redirigirse a algo no relacionado con accesibilidad (por ejemplo, preferencias de cuenta si se necesitara a futuro).

---

## Orden de construcción — fases restantes

**Fase 3 — Vocabulario y Lecciones**
`Vocabulary.js` → `vocabularyController.js` → `views/vocabulary/index.ejs` → completar `lessons/index.ejs` y crear `lessons/show.ejs`. Es la fase más simple porque no hay interacción compleja, solo contenido estático bien estructurado.

**Fase 4 — Motor de ejercicios (núcleo del proyecto)**
`exerciseController.js` con lógica de evaluación por tipo → las 5 vistas de ejercicio → `feedback.ejs` → `exercise.js` (maneja `aria-disabled`) → `word-bank.js`. Esta fase concentra la mayoría de los criterios WCAG del checklist: 2.1.1, 2.1.2, 3.3.4, 4.1.2, 4.1.3.

**Fase 5 — Level Assessment**
`assessmentController.js` con manejo de timer ajustable (2.2.1) → las 3 vistas de assessment.

**Fase 6 — Onboarding**
Las 3 páginas de onboarding, mostradas solo la primera vez que un usuario inicia sesión (se puede controlar con un campo `onboarding_seen` en `users` o `user_stats`).

**Fase 7 — Dashboard y Progreso reales**
Conectar `dashboardController.js` y `progressController.js` con los datos reales de `UserProgress` y `UserStats` que ya existen como modelos.

**Fase 8 — Verificación**
Recorrido completo con Tab/Shift+Tab en cada página, prueba con NVDA en cada flujo (login → onboarding → lección → ejercicio → feedback → assessment), y validación de contraste final con la herramienta de WebAIM sobre el CSS ya escrito.

---

¿Empezamos por la Fase 3 (Vocabulario y Lecciones) o prefieres saltar directo a la Fase 4 (motor de ejercicios), que es el núcleo funcional del proyecto?
