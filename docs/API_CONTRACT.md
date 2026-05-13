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
  "endereco": "Rua ..., São Paulo, SP",
  "google_maps_embed_url": "https://maps.google.com/..."
}
```

---

## Members / Membros

### GET `/api/membros/`

List all members. Supports filtering and ordering.

**Query Parameters:**
- `ativo=true|false` — filter by active status
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
      "descricao": "Aprenda os fundamentos...",
      "data": "2026-06-15",
      "imagem": "/media/eventos/workshop.jpg",
      "link": "https://eventbrite.com/...",
      "destaque": true,
      "passado": false
    }
  ]
}
```

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

### GET `/api/newsletter/artigos/`

List all newsletter articles. Supports filtering.

**Query Parameters:**
- `setor=engenharia|direito|financas` — filter by sector
- `destaque=true|false` — show featured articles only

**Response:**
```json
{
  "count": 8,
  "results": [
    {
      "id": 1,
      "titulo": "Regulação de IA no Brasil",
      "resumo": "Entenda os novos marcos regulatórios...",
      "setor": "direito",
      "edicao": "Ed. 3",
      "destaque": true,
      "publicado_em": "2026-03-01"
    }
  ]
}
```

### GET `/api/newsletter/artigos/{id}/`

Get a single article.

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
  "email": "user@example.com",
  "setor": "engenharia"
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

### GET `/api/core/parceiros/`

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
      "ordem": 0
    }
  ]
}
```

---

## Testimonials / Depoimentos

### GET `/api/core/depoimentos/`

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
  ]
}
```

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
