// Conteúdo real do site. Textos preservados do repositório jvseki-dev
// (a apresentação muda a cada etapa; o conteúdo, não).

export type Capability = {
  n: string;
  title: string;
  body: string;
};

export const capabilities: Capability[] = [
  {
    n: "01",
    title: "APIs REST em Python",
    body: "FastAPI e Flask, com autenticação e integrações sob medida para o sistema do cliente.",
  },
  {
    n: "02",
    title: "Plataformas SaaS multi-tenant",
    body: "Isolamento por cliente, assinatura mensal e painel administrativo — como a Seklyn, em produção.",
  },
  {
    n: "03",
    title: "Modelagem de banco de dados",
    body: "PostgreSQL e SQLAlchemy, com estrutura relacional pensada para crescer sem retrabalho.",
  },
  {
    n: "04",
    title: "Sistemas web sob medida",
    body: "Pedidos, agendamento, catálogo e painéis administrativos, desenhados para o fluxo real do negócio.",
  },
  {
    n: "05",
    title: "Infraestrutura e deploy",
    body: "VPS Linux, domínio e DNS configurados — aplicação no ar e mantida, não só entregue.",
  },
];

export type HowWeWorkStep = {
  n: string;
  title: string;
  body: string;
};

export const howWeWork: HowWeWorkStep[] = [
  {
    n: "01",
    title: "Conversa inicial",
    body: "Por videochamada ou WhatsApp, sem custo. Entendo o problema antes de falar em solução.",
  },
  {
    n: "02",
    title: "Escopo fechado",
    body: "Levantamento de requisitos e escopo por escrito — você sabe exatamente o que está contratando.",
  },
  {
    n: "03",
    title: "Desenvolvimento",
    body: "Entregas parciais ao longo do projeto, para acompanhar o andamento sem surpresa no final.",
  },
  {
    n: "04",
    title: "Publicação e manutenção",
    body: "Domínio configurado, aplicação no ar e manutenção contínua depois do lançamento.",
  },
];

export const timelines = [
  { label: "Projetos simples", value: "1–2 semanas" },
  { label: "Sistemas completos", value: "2–4 semanas" },
] as const;

export type CaseStudy = {
  n: string;
  name: string;
  kind: string;
  description: string;
  stack: string[];
  href: string;
  linkLabel: string;
};

export const cases: CaseStudy[] = [
  {
    n: "01",
    name: "DS A Fonte",
    kind: "Loja",
    description:
      "Site vitrine para loja de importados: catálogo com dezenas de produtos, busca, filtros por categoria, modal com tamanhos e pedido pré-montado no WhatsApp. Sem checkout — o fechamento acontece na conversa.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    href: "https://ds-story-coral.vercel.app",
    linkLabel: "Ver site",
  },
  {
    n: "02",
    name: "Agendamentos Augusto Mariani",
    kind: "Escola",
    description:
      "PWA para professores reservarem notebooks, tablets e equipamentos do laboratório por dia e horário, com controle de estoque, fila de espera e integração com Google Sheets. A versão aberta e a demo pública (sem dados do cliente) ficam no projeto Lab Reserva, do TCC.",
    stack: ["HTML/CSS/JS", "Flask", "Google Sheets", "OAuth"],
    href: "https://augustomarianireserva.vercel.app",
    linkLabel: "Site do cliente",
  },
  {
    n: "03",
    name: "Aprendizado7",
    kind: "Estúdio criativo",
    description:
      "Portfólio de estúdio criativo com agenda presencial: login Google, horários semanais, painel admin, histórico em PostgreSQL e apoio operacional via Google Sheets. Front na Vercel, API Flask no Render.",
    stack: ["Flask", "PostgreSQL", "Google OAuth", "Sheets"],
    href: "https://aprendizado7.vercel.app",
    linkLabel: "Ver site",
  },
  {
    n: "04",
    name: "Pastelaria Delivery",
    kind: "Delivery",
    description:
      "Sistema de delivery com cardápio, carrinho, cadastro/login Google, pagamento Pix via Mercado Pago e painel admin para status dos pedidos e comunicação com o motoboy.",
    stack: ["FastAPI", "PostgreSQL", "Mercado Pago", "Admin"],
    href: "https://pastelaria-mu.vercel.app",
    linkLabel: "Ver site",
  },
  {
    n: "05",
    name: "MTHS.PUBLI",
    kind: "Portfólio audiovisual",
    description:
      "Portfólio audiovisual para o publicitário Matheus Rial: fotos e vídeos atualizados direto pela Google Sheets, sem precisar republicar o site a cada mudança de mídia.",
    stack: ["Flask", "Google Sheets", "PWA", "Render"],
    href: "https://portfolio-matheus-rial.onrender.com",
    linkLabel: "Ver site",
  },
  {
    n: "06",
    name: "Seklyn",
    kind: "SaaS",
    description:
      "Plataforma SaaS multi-tenant de acompanhamento de treinos para personal trainers. Cada personal tem painel administrativo isolado com assinatura mensal: cadastro de alunos, montagem de treinos semanais, acompanhamento de execução e relatórios de adesão. O aluno acessa por link exclusivo, sem senha, em interface mobile-first. Desenvolvido individualmente do banco ao deploy em VPS.",
    stack: ["FastAPI", "PostgreSQL", "SQLAlchemy", "HTML/CSS/JS"],
    href: "https://seklyn.com.br",
    linkLabel: "Ver site",
  },
];

/** TCC público — a mesma lógica do case 02, sem dados de cliente. */
export const labReserva = {
  name: "Lab Reserva",
  description:
    "Mesma lógica do sistema Augusto Mariani (agenda, estoque, Sheets, login Google), em versão acadêmica sem dados de cliente. Entre com qualquer conta Google e teste o fluxo.",
  demoHref: "https://labreserva-tcc.vercel.app",
  repoHref: "https://github.com/jvseki/labreserva-tcc",
};

export const skills = [
  "Python",
  "JavaScript",
  "SQL",
  "FastAPI",
  "Flask",
  "SQLAlchemy",
  "PostgreSQL",
  "Git",
  "Linux",
  "VPS",
  "DNS",
] as const;

export const sobreParagraphs = [
  "Desenvolvedor de software focado em back-end Python, APIs REST e modelagem de banco de dados relacional.",
  "Cursando Análise e Desenvolvimento de Sistemas na AEMS, 3º semestre. Experiência anterior como estagiário PROATI na SEDUC/SP, com suporte técnico e infraestrutura de rede.",
  "Desenvolvo projetos de ponta a ponta, do banco ao deploy — incluindo uma plataforma SaaS em operação (Seklyn).",
] as const;
