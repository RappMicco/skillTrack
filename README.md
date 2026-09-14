# SkillTrack

SkillTrack is a web-based Training and Skill Management System that helps organizations manage employee skills, assign and track training, monitor skill gaps, and support continuous team growth — all from a single unified platform.

## Features

### Public Landing Page

- Marketing landing page with live stats pulled from the platform (active employees, training completion rate, skill experts, learning activities)
- Certifications and team highlights showcase
- Watch-video modal with a custom video player

### Dashboard

- Training status overview (upcoming, ongoing, completed, pending)
- Skill category and skill matrix summaries
- Recent completed trainings feed
- Top expert skills chart

### Skill Matrix

- Grid of every employee against every skill, grouped by competency
- Per-employee average proficiency, with color-coded proficiency levels
- Inline editing for admins (create/update scores)
- Hover tooltips showing proficiency level names

### Insight

- Auto-generated insights on skill strengths, gaps, and single points of failure
- Highlights skills with low average expertise across the team

### Training Assignment

- Assign training programs to employees with schedules and status
- Search and filter assigned trainings by employee or status
- Full edit history per assignment (dates, progress, remarks)

### Maintenance (Admin)

Centralized CRUD for all reference data:

- Skills, Proficiency Levels, Training Providers, Competencies
- Employee registration and active/inactive status management
- Skill ↔ Competency assignments
- Employee ↔ Skill matrix assignments

## Tech Stack

This is a two-package monorepo — the frontend and backend are independent apps with their own `package.json`, run separately.

**Frontend** (`front-end/`)
- React 19 + Vite
- React Router (`react-router`, not `react-router-dom`)
- Redux Toolkit (feature-sliced: service → slice → thunk per domain)
- Tailwind CSS v4
- Recharts (charts), Swiper (carousels), GSAP (scroll animations), Lucide (icons)

**Backend** (`server/`)
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication (httpOnly cookie)
- express-validator for request validation
- Helmet + CORS allowlist

## Project Structure

```
skilltrack/
├── front-end/          # React + Vite SPA
│   └── src/
│       ├── pages/       # route-level containers
│       ├── components/  # presentational/reusable UI
│       ├── features/    # Redux: <name>Service.js / Slice.js / Thunk.js
│       ├── context/     # cross-cutting UI state (PageContext)
│       └── store/       # Redux store
└── server/              # Express + MongoDB API
    ├── routes/          # grouped by concern (employee, admin, summary, insight)
    ├── controllers/     # request handlers
    ├── models/          # Mongoose schemas
    ├── middlewares/      # auth guards, validation
    └── validators/       # express-validator chains
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB instance (local or hosted, e.g. MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/skilltrack.git
cd skilltrack
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in `server/.env`:

```
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
CLIENT_URL_PROD=
```

Run the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd front-end
npm install
cp .env.example .env
```

Fill in `front-end/.env`:

```
VITE_API_URL=http://localhost:<PORT>/api
```

Run the frontend:

```bash
npm run dev
```

The app will be available at the local URL Vite prints (default `http://localhost:5173`).

## Available Scripts

**Frontend** (run inside `front-end/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

**Backend** (run inside `server/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with nodemon (auto-restart) |
| `node index.js` | Start the API (cross-platform) |

## Authentication

Auth is cookie-based: on login, the server sets an httpOnly JWT cookie. The frontend always calls the API with `credentials: "include"` — no bearer tokens are used. Two roles are supported: `admin` (full access to Maintenance and matrix editing) and standard employees (read access plus their own training/insights).

---

Developed with ❤️ by **Rapp Micco Rizo**
