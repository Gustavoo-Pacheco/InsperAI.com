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

```bash
python manage.py createsuperuser
```

For local development the project ships with a seeded superuser `admin` / `insperai123`. Change this before any non-local deployment.

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

### Adding content

**Members** — `/admin/membros/membro/` → add `nome`, `cargo`, `nivel`, `semestre`, `foto`, `linkedin_url`, `github_url`. Check `ativo` to display on site.

**Events** — `/admin/eventos/evento/` → check `destaque` for the homepage FeaturedHero; check `passado` to list under past events.

**Newsletter articles** — `/admin/newsletter/artigo/` → pick `setor` (engenharia, direito, financas); check `destaque` to feature it first within the sector.

**Selection process** — `/admin/processo_seletivo/procesoseletivo/` → edit status, edition, URL, and reorder timeline stages via the `ordem` field.

---

## API Endpoints

All endpoints live under `/api/`. See [`../docs/API_CONTRACT.md`](../docs/API_CONTRACT.md) for the complete contract.

### Example requests

```bash
# Get all members
curl http://localhost:8000/api/membros/

# Filter active members by level
curl "http://localhost:8000/api/membros/?ativo=true&nivel=presidencia"

# Get resources by section
curl "http://localhost:8000/api/recursos/?secao=material"

# Get articles by sector
curl "http://localhost:8000/api/newsletter/artigos/?setor=engenharia"

# Get site settings
curl http://localhost:8000/api/core/settings/

# Selection process config + timeline
curl http://localhost:8000/api/processo-seletivo/

# Submit contact form (emails the admin)
curl -X POST http://localhost:8000/api/contato/enviar/ \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","assunto":"Test","mensagem":"Hello"}'
```

### Endpoint map per frontend page

| Page       | Endpoints                                                                            |
|------------|--------------------------------------------------------------------------------------|
| Home       | `/api/core/settings/`, `/api/membros/?ativo=true`, `/api/core/parceiros/`            |
| About      | `/api/core/depoimentos/`                                                             |
| Members    | `/api/membros/` (grouped by `nivel`)                                                 |
| Events     | `/api/eventos/?destaque=true`, `/api/eventos/?passado=true`                          |
| Resources  | `/api/recursos/?secao=material`, `/api/recursos/?secao=cursos`                       |
| Newsletter | `/api/newsletter/artigos/?setor=engenharia` (etc)                                    |
| Contact    | `POST /api/contato/enviar/`                                                          |
| Selection  | `/api/processo-seletivo/` (timeline embedded)                                        |

---

## Database

By default uses SQLite (`db.sqlite3`) for local development. To use PostgreSQL:

1. Install `psycopg`: `pip install psycopg[binary]`
2. Set `DATABASE_URL` in `.env`: `DATABASE_URL=postgresql://user:pass@localhost/insperai`
3. Run migrations: `python manage.py migrate`

---

## Media Files

Images are stored in `media/` locally. Admin upload paths:
- `membros/` — member photos
- `eventos/` — event images
- `parceiros/` — partner logos
- `depoimentos/` — testimonial photos

To use S3:
1. Set `USE_S3=True` in `.env`
2. Configure AWS credentials:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_STORAGE_BUCKET_NAME`
   - `AWS_S3_REGION_NAME`

---

## Contact form

`POST /api/contato/enviar/` sends an email to `SiteSettings.contact_recipient_email`. No database record is created. Change the recipient in admin at `/admin/core/sitesettings/`.

---

## Troubleshooting

**"Couldn't import Django"** — make sure dependencies are installed: `pip install -r requirements.txt`.

**Email not sending** — check `.env` has correct SMTP credentials. For Gmail use an [App Password](https://support.google.com/accounts/answer/185833), not your account password.

**Admin login not working** — reset with `python manage.py changepassword admin`.

**Static files missing on admin** — `python manage.py collectstatic --noinput`.

**Reset local DB (dev only)**:
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

---

## Frontend Integration

Frontend (Next.js) lives at `../frontend/` and fetches from `/api/`. See [`../docs/API_CONTRACT.md`](../docs/API_CONTRACT.md) for the full contract.

When deploying, update `CORS_ORIGINS` in `.env` to allow the frontend domain:

```
CORS_ORIGINS=https://insperai.com,https://www.insperai.com
```

---

## Production Deployment

1. Update `.env`:
   ```env
   DEBUG=False
   SECRET_KEY=<generate-random-key>
   ALLOWED_HOSTS=insperai.com,www.insperai.com
   DATABASE_URL=postgresql://...
   CORS_ORIGINS=https://insperai.com,https://www.insperai.com
   USE_S3=True
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_STORAGE_BUCKET_NAME=...
   ```
2. Install postgres adapter: `pip install psycopg[binary]`
3. Collect static files: `python manage.py collectstatic --noinput`
4. Run migrations: `python manage.py migrate`

The `Procfile` handles release (migrate + collectstatic) and web (gunicorn) on platforms like Heroku/Render.

---

## Development Notes

- Admin is customizable per app via `{app}/admin.py`.
- All list endpoints support filtering, search, and ordering.
- Images auto-resize on upload (Pillow).
- Singleton models (SiteSettings, ProcessoSeletivo) prevent accidental duplication.
- The contact form does not persist data — it only notifies the admin by email.
