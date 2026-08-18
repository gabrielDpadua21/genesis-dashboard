export const FLUXOS = {
  exploracao: {
    label: '🧭 Exploração',
    subtitulo: 'Sessão de Fila — Segunda a Quinta',
    passos: [
      'Abrir PDF preparado da disciplina',
      'Leitura ativa com grifo (até 2h/disciplina)',
      'Anotação curta (opcional)',
      'Questões de fixação do PDF (não oficiais)',
      'Registrar via skill registro-de-quest (Fluxo A)',
    ],
    resultado: 'A tarefa não fecha — vai pro 🌀 Portal Pós-Fight, aguardando Contra-Ataque.',
  },
  contraAtaque: {
    label: '⚔️ Contra-Ataque',
    subtitulo: 'Revisão reversa — Sexta e Sábado',
    passos: [
      'Não reler nada antes',
      'Abrir bateria no TEC Concursos',
      'Resolver o bloco completo',
      'Voltar à teoria só no que errar',
      'Anotar no Caderno de Erros',
      'Registrar via skill registro-de-quest (Fluxo B)',
    ],
    resultado: 'A tarefa fecha de verdade (✅).',
  },
}

export const LEGENDA_CORES = [
  { nome: 'Conceito', hex: '#4ADE80' },
  { nome: 'Definição', hex: '#60A5FA' },
  { nome: 'Exemplo', hex: '#FB923C' },
  { nome: 'Situação/Caso', hex: '#C084FC' },
  { nome: 'Atenção/Pegadinha', hex: '#FDE047' },
]

export const RITUAL_ENTRADA = [
  'Todoist',
  'Pomodoro (TickTick)',
  'iPad + Apple Pencil prontos',
  'Focus Mode ativado',
]
