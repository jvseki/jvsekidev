// Conteúdo da Seklyn (seklyn.com.br) — produto próprio do João.
// Textos alinhados com a landing em produção; nada de número inventado.

const V = "/video/seklyn";

export const seklyn = {
  name: "Seklyn",
  path: "/seklyn",
  url: "https://seklyn.com.br",
  signupUrl: "https://seklyn.com.br/personal/cadastro.html",
  logo: "/seklyn/logo-s.png",
  tagline: "Treino acompanhado de verdade, sem fricção pro seu aluno.",
  pitch:
    "Saiba exatamente quais séries seus alunos treinaram e quais eles pularam. O personal monta a ficha, o aluno marca série por série por um link sem senha, e o painel mostra quem está levando a sério.",
  video: {
    promo: { src: `${V}/promo.mp4`, poster: `${V}/promo.jpg` },
    vertical: { src: `${V}/promo-vertical.mp4`, poster: `${V}/promo-vertical.jpg` },
  },
};

export type SeklynStep = {
  n: string;
  title: string;
  body: string;
  detail: string;
  video: { src: string; poster: string };
};

export const seklynSteps: SeklynStep[] = [
  {
    n: "01",
    title: "Você monta a ficha",
    body: "Exercícios, séries, repetições e carga pra cada aluno, num painel pensado pro computador.",
    detail: "Ficha pronta em poucos minutos, com o histórico de execução de cada aluno guardado.",
    video: { src: `${V}/loop-ficha.mp4`, poster: `${V}/loop-ficha.jpg` },
  },
  {
    n: "02",
    title: "Envia um link. Sem senha.",
    body: "Cada aluno recebe um link único. Abre no celular, sem cadastro, sem baixar app.",
    detail: "Menos fricção = mais gente treinando. Senha esquecida é aluno que desiste no primeiro dia.",
    video: { src: `${V}/loop-link.mp4`, poster: `${V}/loop-link.jpg` },
  },
  {
    n: "03",
    title: "O aluno marca cada série",
    body: "Interface mobile-first, com modo escuro, feita pra usar na academia com uma mão só.",
    detail: "Conclusão hierárquica: o treino só conta como feito quando todas as séries de todos os exercícios foram marcadas.",
    video: { src: `${V}/loop-aluno.mp4`, poster: `${V}/loop-aluno.jpg` },
  },
  {
    n: "04",
    title: "Você vê quem leva a sério",
    body: "Analytics de aderência mostra quais exercícios são pulados — antes que o aluno desista.",
    detail: "Em vez de perguntar “fez o treino?” no WhatsApp, você já chega sabendo o que ficou pra trás.",
    video: { src: `${V}/loop-adesao.mp4`, poster: `${V}/loop-adesao.jpg` },
  },
];

export const seklynFeatures = [
  { title: "Conclusão hierárquica", body: "Treino só é “feito” quando todas as séries foram marcadas. Cada série vira dado." },
  { title: "Acesso sem fricção", body: "Link único por aluno. Sem senha, sem cadastro — é só abrir e treinar." },
  { title: "Analytics de aderência", body: "Descubra quais exercícios costumam ser pulados e ajuste o plano a tempo." },
  { title: "Dicas do personal", body: "Links de produtos que você recomenda numa aba separada — renda extra sem atrapalhar o treino." },
  { title: "Mobile-first pro aluno", body: "Interface limpa, modo escuro opcional, pensada pra academia." },
  { title: "Painel completo", body: "Alunos, treinos e séries num painel desktop, na cor da sua marca." },
] as const;

/** As decisões por trás do produto — é aqui que o portfólio explica o "porquê". */
export const seklynDecisions = [
  {
    n: "01",
    title: "Começar pela pergunta certa",
    body: "Todo personal faz a mesma pergunta: “o aluno fez o treino?”. A Seklyn existe pra responder isso com dado, não com print de WhatsApp.",
  },
  {
    n: "02",
    title: "Tirar a senha do caminho",
    body: "O aluno é o elo mais fraco: se precisar criar conta, metade não cria. Por isso o acesso é por link único — segurança do lado do servidor, zero atrito do lado de quem treina.",
  },
  {
    n: "03",
    title: "Multi-tenant desde o dia 1",
    body: "Cada personal tem seu espaço isolado, sua marca e sua assinatura. A modelagem do banco foi pensada pra crescer sem precisar refazer a base.",
  },
  {
    n: "04",
    title: "Dado que vira ação",
    body: "Não basta mostrar gráfico. O painel aponta o exercício que nunca é feito, pra o personal agir antes de perder o aluno.",
  },
  {
    n: "05",
    title: "Do banco ao deploy, sozinho",
    body: "FastAPI, PostgreSQL e SQLAlchemy no back, front leve e mobile-first, VPS Linux com domínio e DNS configurados, assinatura por Pix e cartão. Projetado, construído e mantido por mim.",
  },
] as const;

export const seklynStack = ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "HTML/CSS/JS", "VPS Linux", "DNS", "Pix e cartão"] as const;
