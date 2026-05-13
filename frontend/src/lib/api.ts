import type {
  ArtigoSetor,
  ContatoBody,
  Depoimento,
  Edicao,
  EdicaoDetail,
  Etapa,
  Evento,
  Faq,
  InscricaoNewsletter,
  Membro,
  MembroNivel,
  Paginated,
  Parceiro,
  ProcessoSeletivo,
  Recurso,
  RecursoNivel,
  RecursoSecao,
  SiteSettings,
} from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Params = Record<string, string | number | boolean | undefined>;

function buildQuery(params?: Params): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function mediaUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized.startsWith("/media/") ? normalized : `/media/${path}`}`;
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      // not JSON
    }
    throw new ApiError(res.status, body, `API ${res.status} ${res.statusText} — ${path}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// --- Core ---

export function getSettings(): Promise<SiteSettings> {
  return apiFetch<SiteSettings>("/api/core/settings/");
}

export function getFaq(): Promise<Faq[]> {
  return apiFetch<Paginated<Faq>>("/api/core/faq/").then((r) => r.results);
}

export function getParceiros(): Promise<Parceiro[]> {
  return apiFetch<Paginated<Parceiro>>("/api/core/parceiros/").then((r) => r.results);
}

export function getDepoimentos(): Promise<Depoimento[]> {
  return apiFetch<Paginated<Depoimento>>("/api/core/depoimentos/").then((r) => r.results);
}

// --- Membros ---

export function getMembros(params?: {
  ativo?: boolean;
  nivel?: MembroNivel;
  ordering?: string;
}): Promise<Membro[]> {
  return apiFetch<Paginated<Membro>>(`/api/membros/${buildQuery(params)}`).then(
    (r) => r.results,
  );
}

// --- Eventos ---

export function getEventos(params?: {
  destaque?: boolean;
  passado?: boolean;
}): Promise<Evento[]> {
  return apiFetch<Paginated<Evento>>(`/api/eventos/${buildQuery(params)}`).then(
    (r) => r.results,
  );
}

// --- Recursos ---

export function getRecursos(params?: {
  secao?: RecursoSecao;
  nivel?: RecursoNivel;
}): Promise<Recurso[]> {
  return apiFetch<Paginated<Recurso>>(`/api/recursos/${buildQuery(params)}`).then(
    (r) => r.results,
  );
}

// --- Newsletter ---

export function getLatestEdicoesBySegment(): Promise<Edicao[]> {
  return apiFetch<Edicao[]>("/api/newsletter/edicoes/latest-by-segment/");
}

export function getEdicoes(params?: {
  segment?: ArtigoSetor;
  page?: number;
}): Promise<Paginated<Edicao>> {
  return apiFetch<Paginated<Edicao>>(`/api/newsletter/edicoes/${buildQuery(params)}`);
}

export function getEdicaoDetail(
  weekId: string,
  segment: ArtigoSetor | string,
): Promise<EdicaoDetail | null> {
  return apiFetch<EdicaoDetail>(
    `/api/newsletter/edicoes/${encodeURIComponent(weekId)}/${encodeURIComponent(segment)}/`,
  ).catch((err) => {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  });
}

export function subscribeNewsletter(
  body: InscricaoNewsletter,
): Promise<InscricaoNewsletter> {
  return apiFetch<InscricaoNewsletter>("/api/newsletter/inscricoes/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// --- Contato ---

export function enviarContato(body: ContatoBody): Promise<{ detail: string }> {
  return apiFetch<{ detail: string }>("/api/contato/enviar/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// --- Processo Seletivo ---

export function getProcessoSeletivo(): Promise<ProcessoSeletivo> {
  return apiFetch<ProcessoSeletivo>("/api/processo-seletivo/");
}

export function getEtapas(params?: { ativa?: boolean }): Promise<Etapa[]> {
  return apiFetch<Paginated<Etapa>>(
    `/api/processo-seletivo/etapas/${buildQuery(params)}`,
  ).then((r) => r.results);
}
