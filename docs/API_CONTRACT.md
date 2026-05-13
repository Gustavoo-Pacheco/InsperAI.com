# API Contract: InsperAI Backend

This document describes all API endpoints for the InsperAI.com backend. Frontend developers should use these endpoints to fetch dynamic content managed via the Django admin panel.

**Base URL:** `http://localhost:8000/api/` (dev) or `https://api.insperai.com/` (production)

---

## Response Format

All responses are JSON. Paginated list endpoints return:

```json
{
  "count": 42,
  "next": "http://api.../path?page=2",
  "previous": null,
  "results": [...]
}
```

Images are served from `/media/{path}` (e.g., `/media/membros/usuario.jpg`).

Error responses:

```json
{
  "detail": "Error message"
}
```

---

## Core Settings

### GET `/api/core/settings/`

Returns singleton site configuration.

**Response:**
```json
{
  "email": "contato@insperai.com.br",
  "contact_recipient_email": "admin@insperai.com.br",
  "instagram_url": "https://instagram.com/insperai",
  "linkedin_url": "https://linkedin.com/company/insperai",
  "github_url": "https://github.com/insperai",
  "endereco": "Rua ..., São Paulo, SP"
}
```

---

## Members / Membros

### GET `/api/membros/`

List all members. Supports filtering and ordering.

**Query Parameters:**
- `ativo=true|false` — filter by active status
- `alumni=true|false` — filter by alumni flag
- `nivel=presidencia|diretoria|coordenacao|equipe` — filter by level
- `ordering=nome|ordem|-data` — sort results

**Response:**
```json
{
  "count": 12,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "nome": "João Silva",
      "cargo": "Coordenador de IA",
      "nivel": "coordenacao",
      "semestre": "2024.1",
      "foto": "/media/membros/joao.jpg",
      "linkedin_url": "https://linkedin.com/in/joao",
      "github_url": "https://github.com/joao",
      "ativo": true,
      "alumni": false,
      "ordem": 0
    }
  ]
}
```

### GET `/api/membros/{id}/`

Get a single member by ID.

---

## Events / Eventos

### GET `/api/eventos/`

List all events. Supports filtering.

**Query Parameters:**
- `destaque=true|false` — show featured event only
- `passado=true|false` — filter by past/upcoming

**Response:**
```json
{
  "count": 3,
  "results": [
    {
      "id": 1,
      "titulo": "Workshop de IA",
      "subtitulo": "Uma imersão prática em redes neurais",
      "palestrante": "Ana Costa — Mestranda USP",
      "descricao": "Aprenda os fundamentos...",
      "data": "2026-06-15",
      "imagem": "/media/eventos/workshop.jpg",
      "link": "https://eventbrite.com/...",
      "destaque": true,
      "passado": false,
      "is_passado": false
    }
  ]
}
```

**Evento fields:**
- Required: `titulo`, `descricao`, `data`, `imagem`
- Optional (may be empty string): `subtitulo` (one-liner shown under the hero title), `palestrante` (speaker / org name shown in the metadata line), `link` (registration URL for upcoming events, recording / LinkedIn URL for past events)
- Booleans: `destaque` (admin toggle for the featured hero card), `passado` (whether to show in the past-events grid)
- Read-only: `is_passado` (true if `data < today`)

### GET `/api/eventos/{id}/`

Get a single event.

---

## Resources / Recursos

### GET `/api/recursos/`

List all resources (material próprio + cursos recomendados). Supports filtering.

**Query Parameters:**
- `secao=material|cursos` — filter by section
- `nivel=iniciante|intermediario|avancado` — filter by difficulty

**Response:**
```json
{
  "count": 15,
  "results": [
    {
      "id": 1,
      "titulo": "Introduction to Neural Networks",
      "descricao": "A comprehensive guide...",
      "url": "https://deeplearning.ai/...",
      "secao": "cursos",
      "nivel": "iniciante",
      "autor": "Andrew Ng",
      "data": "2024-01-15",
      "ordem": 0
    }
  ]
}
```

### GET `/api/recursos/{id}/`

Get a single resource.

---

## Newsletter

Each `(week_id, segment)` pair is its own edition. Admins create an `Edicao` and add
`Artigo` rows inline. The public newsletter page shows the latest edition of each
segment (engenharia, direito, financas). Clicking a card opens
`/newsletter/<week_id>/<segment>` which renders all articles of that edition.

### GET `/api/newsletter/edicoes/`

Paginated list of editions, ordered by `-date`. Optional `?segment=` filter.

**Query Parameters:**
- `segment=engenharia|direito|financas` — filter by segment
- `page=<n>` — pagination

**Response:**
```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "week_id": "2026-W18",
      "segment": "engenharia",
      "date": "2026-05-06",
      "title": "Engenharia & IA",
      "description": "Avanços técnicos, novos modelos...",
      "story_count": 3,
      "url": "/newsletter/2026-W18/engenharia"
    }
  ]
}
```

### GET `/api/newsletter/edicoes/latest-by-segment/`

Returns the most recent edition of each segment (up to 3 items, one per segment that
has at least one edition).

**Response:**
```json
[
  { "id": 1, "week_id": "2026-W18", "segment": "engenharia", "date": "2026-05-06",
    "title": "Engenharia & IA", "description": "...", "story_count": 3,
    "url": "/newsletter/2026-W18/engenharia" },
  { "id": 2, "week_id": "2026-W18", "segment": "direito", "date": "2026-05-06",
    "title": "Direito & Regulação", "description": "...", "story_count": 3,
    "url": "/newsletter/2026-W18/direito" }
]
```

### GET `/api/newsletter/edicoes/<week_id>/<segment>/`

Detail endpoint with all articles nested. Returns `404` if no edition matches.

**Response:**
```json
{
  "id": 2,
  "week_id": "2026-W18",
  "segment": "direito",
  "date": "2026-05-06",
  "title": "Direito & Regulação",
  "description": "Legal tech, regulação de IA e impacto jurídico...",
  "story_count": 3,
  "url": "/newsletter/2026-W18/direito",
  "artigos": [
    {
      "id": 4,
      "titulo": "Freshfields adota Claude da Anthropic em toda a organização",
      "resumo": "O escritório global Freshfields fechou contrato corporativo...",
      "link": "https://lightjur.com/freshfields-anthropic",
      "fonte": "LightJur",
      "importancia": 9,
      "por_que_importa": "Sinaliza a normalização do uso corporativo de IA...",
      "tema": "Adoção corporativa de IA",
      "empresas": ["Anthropic", "Freshfields"],
      "explicacao_jargao": "agentes de IA — sistemas capazes de executar tarefas em várias etapas.",
      "destaque": true,
      "ordem": 1
    }
  ]
}
```

**Artigo fields:**
- Required: `titulo`, `resumo`, `link`, `fonte`, `importancia` (1–10)
- Optional: `por_que_importa`, `tema`, `empresas[]`, `explicacao_jargao` (may be empty string / `[]`)
- `destaque` (boolean) marks the featured story of the edition
- `ordem` controls manual ordering within the edition

### POST `/api/newsletter/inscricoes/`

Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "user@example.com",
  "setor": "engenharia"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "email": "user@example.com",
  "setor": "engenharia",
  "criado_em": "2026-04-01T12:00:00Z"
}
```

---

## FAQ

### GET `/api/core/faq/`

List all FAQ items.

**Response:**
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "pergunta": "Como faço para me inscrever?",
      "resposta": "Você pode se inscrever através...",
      "ordem": 0
    }
  ]
}
```

---

## Partners / Parceiros

### GET `/api/parceiros/`

List all partners/sponsors.

**Response:**
```json
{
  "count": 3,
  "results": [
    {
      "id": 1,
      "nome": "Empresa X",
      "logo": "/media/parceiros/logo.png",
      "url": "https://empresax.com",
      "descricao": "Parceiro institucional desde 2023.",
      "ordem": 0
    }
  ]
}
```

`logo` and `url` may be `null`/empty when not provided. `descricao` is an optional short blurb shown on hover in the partners grid.

---

## Testimonials / Depoimentos

### GET `/api/depoimentos/`

List all testimonials.

**Response:**
```json
{
  "count": 4,
  "results": [
    {
      "id": 1,
      "autor": "Maria Silva",
      "cargo": "Engenheira de Software",
      "texto": "Participar da InsperAI foi transformador...",
      "foto": "/media/depoimentos/maria.jpg"
    }
  ]
}
```

---

## About Page / Sobre

### GET `/api/sobre/`

Aggregator endpoint that returns all content for the `/sobre` page in a single request: Quem Somos copy, core values, milestones (with optional photos), free-text content blocks, and organization-wide stats. Counts in `stats` are computed live from existing tables; manual values (semester, applicants, projects, founding year) come from the `SobreContent` singleton (admin-editable). The events carousel is sourced separately from `GET /api/eventos/?passado=true`.

> Backend layout: `SobreContent`, `Valor`, `Milestone`, `ContentBlock`, `Parceiro`, and `Depoimento` all live in the dedicated `sobre` Django app (tables `sobre_*`). Only `SiteSettings` and `FAQ` remain in `core`.

**Response:**
```json
{
  "quem_somos": {
    "headline": "A comunidade de IA do Insper",
    "body": "Somos a organização estudantil de inteligência artificial do Insper..."
  },
  "valores": [
    { "id": 1, "titulo": "Curiosidade Intelectual", "descricao": "...", "ordem": 1 }
  ],
  "milestones": [
    {
      "id": 1,
      "ano": 2022,
      "titulo": "Fundação da InsperAI",
      "descricao": "...",
      "foto": "/media/milestones/2022.jpg",
      "ordem": 0
    }
  ],
  "content_blocks": [
    {
      "id": 1,
      "slug": "mensagem-lideranca",
      "titulo": "Mensagem da liderança",
      "texto": "...",
      "ordem": 0,
      "posicao": "apos_quem_somos"
    }
  ],
  "stats": {
    "semester": "2026.1",
    "membros_ativos": 42,
    "eventos_realizados": 18,
    "parceiros": 7,
    "inscritos_processo_seletivo": 320,
    "projetos_entregues": 12,
    "anos_atuacao": 4
  }
}
```

`content_blocks[].posicao` enum (active positions): `apos_quem_somos`, `apos_stats`, `apos_parceiros`, `apos_depoimentos`, `apos_eventos`, `apos_valores`, `apos_historia`. Legacy position `apos_missao` remains in the schema for backward compatibility but is not rendered. Only blocks with `ativo=True` are returned.

`milestones[].foto` is `null` when no image has been uploaded.

`stats.projetos_entregues` and `stats.anos_atuacao` may be `null` when the corresponding `SobreContent` fields are unset. `stats.anos_atuacao` is computed live as `current_year − founding_year` (see `backend/core/views.py`); only `founding_year` is stored.

---

## Contact Form / Contato

### POST `/api/contato/enviar/`

Send a contact message via email. **No database record is created** — only an email is sent to the admin's `contact_recipient_email`.

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "assunto": "Parceria",
  "mensagem": "Gostaria de discutir uma possível parceria..."
}
```

**Response:** `200 OK` on success
```json
{
  "detail": "Mensagem enviada com sucesso"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `500 Internal Server Error`: Email sending failed

---

## Selection Process / Processo Seletivo

### GET `/api/processo-seletivo/`

Get selection process singleton config + embedded timeline stages.

**Response:**
```json
{
  "status": "aberto",
  "proxima_edicao": "2026.2",
  "url_inscricao": "https://form.typeform.com/...",
  "texto_cta": "Faça parte de uma equipe que constrói...",
  "etapas": [
    {
      "id": 1,
      "titulo": "Inscrição",
      "descricao": "Preencha o formulário de candidatura",
      "ordem": 0,
      "ativa": true
    },
    {
      "id": 2,
      "titulo": "Prova Online",
      "descricao": "Avaliação técnica de 2 horas",
      "ordem": 1,
      "ativa": true
    }
  ],
  "criterios": [
    {
      "id": 1,
      "titulo": "Curiosidade Intelectual",
      "descricao": "Interesse genuíno em IA e vontade de aprender continuamente.",
      "icon": "Lightbulb",
      "ordem": 0,
      "ativa": true
    }
  ]
}
```

`criterios[].icon` is a free-form string referencing a `lucide-react` icon name (e.g. `Lightbulb`, `Code2`, `Users`, `Sparkles`, `Target`, `BookOpen`). The frontend whitelists known names and falls back to `Lightbulb` for unknown values.

### GET `/api/processo-seletivo/etapas/`

List timeline stages separately (alternative to embedded list above).

**Query Parameters:**
- `ativa=true|false` — show only active stages

**Response:**
```json
{
  "count": 3,
  "results": [
    {
      "id": 1,
      "titulo": "Inscrição",
      "descricao": "...",
      "ordem": 0,
      "ativa": true
    }
  ]
}
```

---

## CORS

The backend allows requests from origins listed in the `CORS_ORIGINS` environment variable (comma-separated). Defaults to `http://localhost:3000` for local development.

---

## Enums / Choice Fields

**Member Level (`nivel`):**
- `presidencia` — Presidência
- `diretoria` — Diretoria
- `coordenacao` — Coordenação
- `equipe` — Equipe

**Resource Section (`secao`):**
- `material` — Material Próprio
- `cursos` — Cursos Recomendados

**Resource Level (`nivel`):**
- `iniciante` — Iniciante
- `intermediario` — Intermediário
- `avancado` — Avançado

**Newsletter Sector (`setor`):**
- `engenharia` — Engenharia
- `direito` — Direito
- `financas` — Finanças

**Selection Process Status (`status`):**
- `aberto` — Aberto
- `fechado` — Fechado
- `em_breve` — Em Breve

---

## Pagination

All list endpoints support pagination via `?page=2`. Default page size is 50 items.

---

## Last Updated

Version 1.0 — May 2026

For questions or changes, coordinate with the backend team before frontend implementation.
