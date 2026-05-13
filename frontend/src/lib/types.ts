export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SiteSettings {
  email: string;
  contact_recipient_email: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  endereco: string;
}

export type MembroNivel = "presidencia" | "diretoria" | "coordenacao" | "equipe";

export interface Membro {
  id: number;
  nome: string;
  cargo: string;
  nivel: MembroNivel;
  semestre: string;
  foto: string;
  linkedin_url: string;
  github_url: string;
  ativo: boolean;
  ordem: number;
}

export interface Evento {
  id: number;
  titulo: string;
  subtitulo: string;
  palestrante: string;
  descricao: string;
  data: string;
  imagem: string;
  link: string;
  destaque: boolean;
  passado: boolean;
  is_passado?: boolean;
}

export type RecursoSecao = "material" | "cursos";
export type RecursoNivel = "iniciante" | "intermediario" | "avancado";

export interface Recurso {
  id: number;
  titulo: string;
  descricao: string;
  url: string;
  secao: RecursoSecao;
  nivel: RecursoNivel;
  autor: string;
  data: string;
  ordem: number;
}

export type ArtigoSetor = "engenharia" | "direito" | "financas";

export interface Edicao {
  id: number;
  week_id: string;
  segment: ArtigoSetor;
  date: string;
  title: string;
  description: string;
  story_count: number;
  url: string;
}

export interface Artigo {
  id: number;
  titulo: string;
  resumo: string;
  link: string;
  fonte: string;
  importancia: number;
  por_que_importa: string;
  tema: string;
  empresas: string[];
  explicacao_jargao: string;
  destaque: boolean;
  ordem: number;
}

export interface EdicaoDetail extends Edicao {
  artigos: Artigo[];
}

export interface InscricaoNewsletter {
  email: string;
  setor: ArtigoSetor;
}

export interface Faq {
  id: number;
  pergunta: string;
  resposta: string;
  ordem: number;
}

export interface Parceiro {
  id: number;
  nome: string;
  logo: string;
  url: string;
  ordem: number;
}

export interface Depoimento {
  id: number;
  autor: string;
  cargo: string;
  texto: string;
  foto: string;
}

export interface ContatoBody {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export type ProcessoStatus = "aberto" | "fechado" | "em_breve";

export interface Etapa {
  id: number;
  titulo: string;
  descricao: string;
  ordem: number;
  ativa: boolean;
}

export interface Criterio {
  id: number;
  titulo: string;
  descricao: string;
  icon: string;
  ordem: number;
  ativa: boolean;
}

export interface ProcessoSeletivo {
  status: ProcessoStatus;
  proxima_edicao: string;
  url_inscricao: string;
  texto_cta: string;
  etapas: Etapa[];
  criterios: Criterio[];
}
