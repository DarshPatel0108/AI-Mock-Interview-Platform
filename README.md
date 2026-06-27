# AI Mock Interview Platform

An AI-powered platform that helps candidates prepare for job interviews. Users upload their resume, a self description, and a job description, and the app generates a personalized interview report — including likely technical and behavioral questions, skill gap analysis, and a day-by-day preparation plan. It can also generate a tailored, ATS-friendly resume PDF based on the same inputs.

## Features

- 🔐 **Authentication** — register, login, logout, and session handling via JWT (stored in cookies)
- 📄 **Resume upload** — upload a resume PDF along with a self description and job description
- 🤖 **AI-generated interview report** — powered by Google's Gemini API, includes:
  - Match score against the job description
  - Technical questions (with intention and suggested answers)
  - Behavioral questions (with intention and suggested answers)
  - Skill gap analysis with severity ratings
  - A day-wise preparation plan
- 📑 **AI-generated resume PDF** — generates a tailored, ATS-friendly resume based on the candidate's profile and the job description, rendered to PDF via Puppeteer
- 📚 **Report history** — view all past interview reports for the logged-in user

## Tech Stack

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication (`jsonwebtoken`, `bcryptjs`)
- Google GenAI SDK (`@google/genai`) — Gemini API
- `zod` + `zod-to-json-schema` for structured AI output validation
- `multer` for file uploads, `pdf-parse` for reading resume PDFs
- `puppeteer` for HTML-to-PDF generation

**Frontend**
- React 19 + Vite
- React Router 7
- Axios for API calls
- Sass for styling

## Project Structure

```
.
├── Backend/
│   ├── server.js                # Entry point — loads env, connects DB, starts server
│   └── src/
│       ├── app.js               # Express app setup (middleware, routes)
│       ├── config/               # Database connection
│       ├── controllers/          # Auth & interview route handlers
│       ├── middlewares/          # JWT auth middleware, file upload middleware
│       ├── models/                # Mongoose schemas (User, InterviewReport, Blacklist)
│       ├── routes/                # Express routers
│       └── services/              # Gemini AI integration (report + resume generation)
└── Frontend/
    └── src/
        ├── features/
        │   ├── auth/             # Login/Register pages, auth context, API calls
        │   └── interview/        # Home/Interview pages, interview context, API calls
        └── style/                # Shared styles
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [Google Gemini API key](https://aistudio.google.com/api-keys)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd interview-ai-yt-main
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | Secret used to sign/verify JWTs — use a long, random string |
| `GOOGLE_GENAI_API_KEY` | API key for the Google Gemini API, used to generate interview reports and resumes |

Start the backend:

```bash
npm run dev
```

The server runs on **http://localhost:3000**.

### 3. Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173** (the backend's CORS config expects this origin).

## API Overview

### Auth — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Log in with email & password | Public |
| GET | `/logout` | Log out (blacklists current token) | Public |
| GET | `/get-me` | Get the logged-in user's details | Private |

### Interview — `/api/interview`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/` | Generate a new interview report (resume PDF + self description + job description) | Private |
| GET | `/` | Get all interview reports for the logged-in user | Private |
| GET | `/report/:interviewId` | Get a specific interview report by ID | Private |
| POST | `/resume/pdf/:interviewReportId` | Generate a tailored resume PDF for a given report | Private |

## Notes

- The backend port (`3000`) and the allowed CORS origin (`http://localhost:5173`) are currently hardcoded in `Backend/src/app.js` and `Backend/server.js` — update these directly in code if you deploy or change ports.
- The AI service uses the `gemini-3-flash-preview` model. If Google rotates/deprecates preview model names in the future, update the model string in `Backend/src/services/ai.service.js`.

## License

ISC
