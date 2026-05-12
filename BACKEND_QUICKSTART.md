# Backend Quickstart

## Start the Development Server

```bash
cd backend
python manage.py runserver
```

Server runs at `http://localhost:8000`

---

## Admin Panel

Visit `http://localhost:8000/admin`

**Login credentials:**
- Username: `admin`
- Password: `insperai123`

---

## Test the API

```bash
# Get all members
curl http://localhost:8000/api/membros/

# Get resources (material or cursos)
curl "http://localhost:8000/api/recursos/?secao=material"

# Get articles by sector
curl "http://localhost:8000/api/newsletter/artigos/?setor=engenharia"

# Get site settings
curl http://localhost:8000/api/core/settings/

# Get process selection config with timeline
curl http://localhost:8000/api/processo-seletivo/
```

---

## Frontend Integration

All frontend pages should fetch from `/api/` endpoints:

| Page | Endpoints |
|------|-----------|
| Home | `/api/core/settings/`, `/api/membros/?ativo=true`, `/api/core/parceiros/` |
| About | `/api/core/depoimentos/` |
| Members | `/api/membros/` (all, grouped by `nivel`) |
| Events | `/api/eventos/?destaque=true` + `/api/eventos/?passado=true` |
| Resources | `/api/recursos/?secao=material` + `/api/recursos/?secao=cursos` |
| Newsletter | `/api/newsletter/artigos/?setor=engenharia` (etc) |
| Contact | `POST /api/contato/enviar/` → emails sent to admin |
| Selection | `/api/processo-seletivo/` (includes embedded timeline) |

**See `API_CONTRACT.md` for complete endpoint reference.**

---

## Adding Content in Admin

### Members
1. Go to `/admin/membros/membro/`
2. Click "Add Member"
3. Fill in: nome, cargo, nivel, semestre, foto, linkedin_url, github_url
4. Check `ativo` to display on site
5. Save

### Events
1. Go to `/admin/eventos/evento/`
2. Click "Add Event"
3. Check `destaque` for FeaturedHero on homepage
4. Check `passado` for past events list
5. Save

### Newsletter Articles
1. Go to `/admin/newsletter/artigo/`
2. Click "Add Article"
3. Select `setor` (engenharia, direito, financas)
4. Check `destaque` to feature as first article in that sector
5. Save

### Selection Process
1. Go to `/admin/processo_seletivo/procesoseletivo/`
2. Edit the config (status, edition, url)
3. Add/edit timeline stages in the inline table
4. Drag to reorder by changing `ordem`

---

## Contact Form

When someone submits the contact form via `/api/contato/enviar/`:

1. An email is sent to `SiteSettings.contact_recipient_email`
2. No database record is created (email-only)
3. Update recipient in admin: `/admin/core/sitesettings/`

---

## Image Uploads

Images are stored in `media/` folder locally. Admins can upload:
- Member photos (membros/)
- Event images (eventos/)
- Partner logos (parceiros/)
- Testimonial photos (depoimentos/)

---

## Troubleshooting

**Admin login not working?** Reset password:
```bash
python manage.py changepassword admin
```

**Database error?** Reset migrations (dev only):
```bash
rm db.sqlite3
python manage.py migrate
python manage.py shell
# Then in shell: from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@insperai.local', 'insperai123')
```

**Email not sending?** Check `.env`:
```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

(For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password)

---

## Production Deployment

When deploying to production:

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

2. Install postgres adapter: `pip install psycopg`

3. Collect static files: `python manage.py collectstatic`

4. Run migrations: `python manage.py migrate`

---

## Next: Frontend

Frontend team should:
1. Read `API_CONTRACT.md` for complete endpoint spec
2. Update the Reference Next.js pages to fetch from `/api/` instead of Sanity
3. Handle pagination on list endpoints (50 items per page)
4. Support query parameters for filtering (e.g. `?ativo=true`, `?setor=engenharia`)

Happy coding! 🚀
