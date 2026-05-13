# InsperAI.com

Institutional website for [InsperAI](https://insperai.com) — Insper's AI student organization.

## Layout

```
backend/    Django REST API + admin panel    (see backend/README.md)
frontend/   Next.js site                      (see frontend/README.md)
docs/       API contract, design notes, frontend conventions
```

## Quickstart

**Backend** (Django, port 8000):
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

**Frontend** (Next.js, port 3000):
```bash
cd frontend
npm install
npm run dev
```

## Documentation

- [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) — REST API contract between backend and frontend
- [`docs/design.md`](docs/design.md) — design system and visual direction
- [`docs/conventions.md`](docs/conventions.md) — frontend code conventions
- [`backend/README.md`](backend/README.md) — backend setup, admin panel, deployment
- [`frontend/README.md`](frontend/README.md) — frontend setup
