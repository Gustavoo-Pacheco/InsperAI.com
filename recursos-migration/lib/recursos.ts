export type Difficulty = "Iniciante" | "Intermediário" | "Avançado";
export type ResourceSection = "cursos" | "material";

export interface Recurso {
  id: string;           // kebab-case unique id
  title: string;        // pt-BR
  description: string;  // 1-2 sentences, pt-BR, ~120 chars
  url: string;          // external link (http/https)
  difficulty: Difficulty;
  section: ResourceSection;
  author?: string;      // only set for section === 'material'
}

export const RECURSOS: Recurso[] = [
  // --- Cursos Recomendados (3) — external, curated
  {
    id: "coursera-ml-andrew-ng",
    title: "Machine Learning Specialization",
    description:
      "Série de 3 cursos de Andrew Ng que cobre regressão, redes neurais e aprendizado não supervisionado com implementações em Python. Ideal para quem está começando na área.",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    difficulty: "Iniciante",
    section: "cursos",
  },
  {
    id: "fastai-practical-dl",
    title: "Practical Deep Learning for Coders",
    description:
      "Curso prático do fast.ai com abordagem top-down: você treina modelos reais desde a primeira aula e entende os fundamentos ao longo do caminho.",
    url: "https://course.fast.ai/",
    difficulty: "Intermediário",
    section: "cursos",
  },
  {
    id: "deeplearning-ai-nlp",
    title: "Natural Language Processing Specialization",
    description:
      "Quatro cursos cobrindo desde classificação de texto e embeddings até modelos de atenção e transformers aplicados a tarefas de NLP modernas.",
    url: "https://www.deeplearning.ai/courses/natural-language-processing-specialization/",
    difficulty: "Avançado",
    section: "cursos",
  },

  // --- Material Próprio (3) — Jornal da Insper AI
  {
    id: "jornal-llms-financas",
    title: "LLMs aplicados ao mercado financeiro brasileiro",
    description:
      "Análise de como modelos de linguagem de grande escala estão sendo utilizados para análise de documentos regulatórios, relatórios de earnings e scoring de crédito.",
    url: "#",
    difficulty: "Avançado",
    section: "material",
    author: "Roberto Alves — Insper AI",
  },
  {
    id: "jornal-ia-direito",
    title: "IA e responsabilidade algorítmica no Brasil",
    description:
      "Discussão sobre os desafios jurídicos da responsabilidade civil em sistemas autônomos de IA, com foco no contexto brasileiro pós-LGPD e no Projeto de Lei de IA.",
    url: "#",
    difficulty: "Intermediário",
    section: "material",
    author: "Prof. Carlos Lima — FGV/Insper AI",
  },
  {
    id: "jornal-cv-industria",
    title: "Visão computacional na indústria 4.0",
    description:
      "Como redes convolucionais e modelos YOLO estão sendo aplicados em linhas de produção para controle de qualidade, detecção de defeitos e manutenção preditiva.",
    url: "#",
    difficulty: "Intermediário",
    section: "material",
    author: "Mariana Lima — Insper AI",
  },
];

/** Returns all resources filtered by section. */
export function getRecursosBySection(section: ResourceSection): Recurso[] {
  return RECURSOS.filter((r) => r.section === section);
}
