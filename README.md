# LinkedIn AI Analyzer

Analyze a LinkedIn profile against a job description using AI. The app scrapes a LinkedIn profile, compares it to a given job description, and returns an ATS-style compatibility score along with strengths, missing keywords, and AI-generated improvement suggestions.

## Features

- Submit a LinkedIn profile URL + a job description for analysis
- Automated LinkedIn profile scraping via **Enrich Layer**
- AI-powered scoring (overall, experience, projects, skills, summary) via **OpenAI**
- Strengths, missing keywords, and actionable recommendations
- Shareable results page per analysis (`/results/:analysisId`)
- REST API with auto-generated OpenAPI docs (drf-spectacular)

## Tech Stack

**Backend**
- Django 5 + Django REST Framework
- MySQL
- Redis + Celery (background/async processing)
- Enrich Layer (LinkedIn scraping)
- OpenAI (AI analysis)

**Frontend**
- Next.js (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- React Hook Form + Zod (form validation)
- Axios

## Project Structure

```
.
├── apps/
│   ├── analysis/       # Analysis model, API views, serializers
│   ├── linkedin/       # LinkedIn profile scraping/model
│   └── common/         # Shared utilities, health check, pagination
├── config/
│   ├── settings/       # base / development / production settings
│   ├── urls.py
│   └── wsgi.py / asgi.py
├── core/
│   └── constants/       # AI + Enrich Layer constants
├── frontend/            # Next.js application
│   ├── app/              # Routes (home, results/[analysisId])
│   ├── components/       # Analyzer + dashboard UI components
│   ├── services/          # API service layer
│   └── ...
├── manage.py
├── requirements.txt
└── .env.example
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- MySQL
- Redis (for Celery)
- An [Enrich Layer](https://enrichlayer.com/) API key
- An [OpenAI](https://platform.openai.com/) API key

## Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/chanchalkmaurya/LinkedinAIAnalyzerForJob.git
   cd LinkedinAIAnalyzerForJob
   ```

2. **Create a virtual environment and install dependencies**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the values:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `SECRET_KEY` | Django secret key |
   | `DEBUG` | `True` / `False` |
   | `ALLOWED_HOSTS` | Comma-separated list of allowed hosts |
   | `DB_NAME` | MySQL database name |
   | `DB_USER` | MySQL user |
   | `DB_PASSWORD` | MySQL password |
   | `DB_HOST` | MySQL host |
   | `DB_PORT` | MySQL port |
   | `CACHE_TIMEOUT_DAYS` | How long cached profile data is kept |
   | `ENRICHLAYER_API_KEY` | Enrich Layer API key |
   | `ENRICHLAYER_BASE_URL` | Enrich Layer API base URL |
   | `OPENAI_API_KEY` | OpenAI API key |

4. **Set up the database**

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional, for Django admin)**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**

   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://127.0.0.1:8000/`.

7. **(Optional) Run Celery worker**, if background processing is enabled:

   ```bash
   celery -A config worker -l info
   ```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000/`.

Update the API base URL used by the frontend (see `frontend/constants/api.ts` / `frontend/lib/axios.ts`) to point to your running backend if it's not on the default host/port.

## API Overview

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/health/` | GET | Health check |
| `/api/analyze/` | POST | Submit a LinkedIn URL + job description for analysis |
| `/api/analyze/<analysis_id>/` | GET | Retrieve a previously generated analysis |
| `/api/schema/` | GET | OpenAPI schema |
| `/api/docs/` | GET | Swagger UI |

## Running Tests

```bash
python manage.py test
```

## License

No license specified yet.