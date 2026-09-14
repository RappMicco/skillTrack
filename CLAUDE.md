# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

SkillTrack is a web-based Training and Skill Management System: dashboards, training assignment, skill matrices/competency tracking, and skill-gap insights for employees. It's a two-package monorepo with no root-level tooling — each package (`front-end/`, `server/`) has its own `package.json` and must be run from its own directory.

## Commands

### front-end (React + Vite)

```bash
cd front-end
npm run dev       # start Vite dev server with HMR
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # eslint .
```

There is no frontend test suite configured.

### server (Express + MongoDB)

```bash
cd server
npm run dev       # nodemon index.js (auto-restart)
npm start         # start index.js (uses Windows `start` — see note below)
```

`npm start` invokes the shell builtin `start index.js`, which only behaves as intended on Windows; use `node index.js` or `npm run dev` cross-platform. There is no test suite configured (`npm test` is a placeholder that exits 1).

### Environment variables

Both packages load `.env` via `dotenv`/Vite and ship a `.env.example` to copy from.

- `server/.env`: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `CLIENT_URL_PROD`
- `front-end/.env`: `VITE_API_URL` (base URL the frontend calls, e.g. `http://localhost:5565/api`)

Note: the root `README.md` lists PostgreSQL as the database, but the server actually connects to MongoDB via Mongoose (`server/configs/db.js`, `MONGO_URI`). Trust the code over the README on this point.

## Architecture

### Backend (`server/`)

Layered Express app, entry point `server/index.js`:

- **Routing is grouped by concern, not by resource**: `routes/employeeRoutes.js` (auth/employee CRUD, mounted at `/api`), `routes/adminRoutes.js` (all create/update endpoints for training providers, skills, proficiency, skill matrix, competency, assigned training — mounted at `/api/admin`), `routes/summaryRoutes.js` (read-only dashboard/report GET endpoints, mounted at `/api/dashboard`), `routes/insightRoutes.js` (skill-gap insights, mounted at `/api`).
- **Request pipeline per route**: `isAuthenticated` (verifies JWT cookie) → `protect`/`protectUser` (loads the `Employee`, `protect` additionally requires `group === "admin"`) → `express-validator` chain from `validators/employeeValidator.js` → `validateResult` (middleware in `middlewares/validateRequest.js`, formats validation errors as `{success, errors: [{field, message}]}`) → controller.
- **Auth**: JWT stored in an httpOnly cookie (`req.cookies.token`), set on login via `controllers/auth.js`, verified with `JWT_SECRET`. There is no bearer-token flow — the frontend always calls with `credentials: "include"`.
- **Controllers → Models**: controllers in `controllers/` talk directly to Mongoose models in `models/` (one file per collection: `employeesModel`, `trainingModel`, `skillModel`, `skillMatrixModel`, `skillProficiencyModel`, `skillCompetencyModel`, `competencyMatrixModel`, `employeeTrainingModel`, `statusModel`). A couple of read-heavy features go through a `services/` layer instead (`services/skillInsightService.js`, `services/skillOverviewService.js`) that controllers call into (`insightController.js`, `skillOverviewController.js`).
- **Security middleware**: `configs/helmetConfig.js` (Helmet) and a CORS allowlist built from `CLIENT_URL`/`CLIENT_URL_PROD` are applied globally in `index.js`, ahead of route mounting.
- Some routes are marked `// for removal` in comments (e.g. skill-competency endpoints in `adminRoutes.js`/`summaryRoutes.js`) — treat these as deprecated/in-flux rather than canonical.

### Frontend (`front-end/`)

Vite + React 19 SPA using `react-router` (v8, imported from `"react-router"` not `"react-router-dom"`) and Redux Toolkit.

- **Routing** (`src/App.jsx`): `/` is the public `LoginPage`; everything else nests under `/skill-track` inside `SkillTrackLayout`, which acts as the authenticated shell (`Dashboard`, `SkillMatrix`, `Insight`, `AssignTraining`, `Maintenance`).
- **Auth gating**: `useAuth()` (`src/hook/useAuth.js`) runs on every `App` mount, dispatches `getCurrentUser`, and redirects to `/` on failure. It is not a route guard per page — it's a single top-level effect, so all route-level access control currently relies on this one check plus the backend rejecting unauthenticated API calls.
- **State — feature-sliced Redux**: each domain lives under `src/features/<name>/` with three files: `*Service.js` (raw `fetch` calls, always `credentials: "include"`, base URL from `VITE_API_URL`), `*Slice.js` (`createSlice`, holds loading/error/data state), `*Thunk.js` (`createAsyncThunk` wrapping the service call, unwraps `express-validator` error shape via `error.response?.data?.errors?.[0]?.message`). Slices are combined in `src/store/store.js`. When adding a new API-backed feature, follow this same service/slice/thunk split rather than calling `fetch` from components.
- **Cross-cutting UI state**: `src/context/PageProvider.jsx` (React Context, not Redux) holds transient UI state shared across components that doesn't belong in the store — active description panel, selected status filter, modal open/closed.
- **Components vs. pages**: `src/pages/` are route-level containers; `src/components/` are the presentational/reusable pieces they compose (cards, tables, modals, charts via `recharts`). `src/utils/` holds config/mapping objects consumed by components (e.g. `StatusTableConfig.jsx`, `insightConfig.jsx`) rather than generic helpers.
- Styling is Tailwind CSS v4 via `@tailwindcss/vite` (no separate `tailwind.config.js` — config lives in `vite.config.js`/CSS).
