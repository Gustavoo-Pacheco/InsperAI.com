# InsperAI Backend

Django REST API backend for the InsperAI institutional website. Provides a complete admin panel for managing all content.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update SMTP settings:

```bash
cp .env.example .env
```

Edit `.env`:
- `EMAIL_HOST_USER` — your Gmail or SMTP account
- `EMAIL_HOST_PASSWORD` — app password (for Gmail, use an App Password)
- Other settings can remain as-is for local development

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Create Admin User

The superuser `admin` / `insperai123` should already exist. If not:

```bash
python manage.py createsuperuser
```

### 5. Start Development Server

```bash
python manage.py runserver
```

The server runs at `http://localhost:8000`.

---

## Admin Panel

Visit `http://localhost:8000/admin` to manage all content:

- **Site Settings** — Email, social links, address
- **Members** — Add/edit team members with photos, links
- **Events** — Manage featured and past events
- **Resources** — Material próprio + Cursos Recomendados
- **Newsletter Articles** — Manage articles by sector
- **Newsletter Subscriptions** — View subscriber emails (read-only)
- **FAQ** — Manage Q&A pairs
- **Partners** — Sponsor logos and links
- **Testimonials** — Member testimonials
- **Selection Process** — Timeline stages for recruitment

---

## API Endpoints

All endpoints live under `/api/`. See `../API_CONTRACT.md` for complete documentation.

**Example requests:**

```bash
# Get all members
curl http://localhost:8000/api/membros/

# Filter active members by level
curl "http://localhost:8000/api/membros/?ativo=true&nivel=presidencia"

# Get resources by section
curl "http://localhost:8000/api/recursos/?secao=material"

# Send contact form (admin gets email)
curl -X POST http://localhost:8000/api/contato/enviar/ \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","assunto":"Test","mensagem":"Hello"}'
```

---

## Database

By default uses SQLite (`db.sqlite3`) for local development. To use PostgreSQL:

1. Install `psycopg3`: `pip install psycopg[binary]`
2. Set `DATABASE_URL` in `.env`: `DATABASE_URL=postgresql://user:pass@localhost/insperai`
3. Run migrations: `python manage.py migrate`

---

## Media Files

Images are stored in `media/` directory locally. To use S3:

1. Set `USE_S3=True` in `.env`
2. Configure AWS credentials:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_STORAGE_BUCKET_NAME`
   - `AWS_S3_REGION_NAME`

---

## Troubleshooting

**"Couldn't import Django"**
Ensure you're in the correct directory and have run `pip install -r requirements.txt`.

**Email not sending**
Check `.env` has correct SMTP credentials. Test with Gmail App Password (not regular password).

**Admin panel won't load**
Run `python manage.py collectstatic --noinput` if static files are missing.

---

## Frontend Integration

Frontend app at `../Reference/` should fetch data from `/api/` endpoints. See `../API_CONTRACT.md` for the complete contract.

When deploying, update `CORS_ORIGINS` in `.env` to allow your frontend domain:

```
CORS_ORIGINS=https://insperai.com,https://www.insperai.com
```

---

## Development Notes

- Admin panel is fully customizable via `{app}/admin.py`
- All models support filtering, searching, and ordering
- Images auto-resize on upload (Pillow)
- Singleton models (SiteSettings, ProcessoSeletivo) prevent accidental duplication
- Contact form emails don't store data in DB — only notify admin
