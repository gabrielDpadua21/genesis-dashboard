# Operação Genesis — Dashboard

## O que é este projeto

Dashboard de progresso de estudos para concurso público (Auditor de TI —
Fisco/Controle, foco SEFAZ-DF). Mostra Rank, XP, streak, progresso por
matéria, por trilha de estudo, achievements, loots (mecânica de jogo) e
estatísticas semanais. Lê dado **ao vivo** do Supabase.

## Stack

- React + Vite (sem framework CSS — CSS puro com variáveis)
- `@supabase/supabase-js` — cliente único em `src/lib/supabaseClient.js`
- Sem TypeScript (JS puro por enquanto)

## Arquitetura — regras a seguir sempre

1. **Hooks buscam dado, componentes só renderizam.** Nunca colocar
   `supabase.from(...)` dentro de um componente visual — sempre criar/usar
   um hook em `src/hooks/`.
2. **Um hook por fonte de dado.** Não criar hook genérico "buscarTudo" —
   siga o padrão existente (`usePlayerStats`, `useMateriaStats`, etc.),
   cada um busca uma tabela/view específica.
3. **Componentes recebem dado via props**, nunca buscam sozinhos (exceção:
   os componentes `*Tab.jsx` dentro de cada pasta de aba, que orquestram
   os hooks daquela aba — ver `GeralTab.jsx` como referência).
4. **Nunca hardcodar chave do Supabase** em componente — sempre via
   `import.meta.env.VITE_SUPABASE_*`, que já vem de `.env.local`.
5. **Escrita no banco não acontece pelo front.** Este app é **só leitura**
   (RLS no Supabase só libera SELECT pra chave `anon`). Se precisar
   registrar dado novo, isso é feito fora deste projeto (via Claude no
   chat principal, com a chave `service_role`).

## Design system (não inventar cor nova sem necessidade)

Tokens em `src/styles/theme.css`:
- Fundo: `--bg: #0A0C12` (quase preto, com gradiente radial violeta/ciano
  sutil)
- Acentos: `--violet: #8C7FFF`, `--cyan: #4EDAE0`, `--amber: #F2B84B`,
  `--fire: #F2884B`
- Categorias de matéria: `--ti`, `--direito`, `--exatas`, `--outros`
- Fontes: **Cinzel** (títulos/display), **Inter** (corpo), **JetBrains
  Mono** (dados/números) — carregadas via Google Fonts no `index.html`

## Estrutura de pastas

```
src/
├── lib/supabaseClient.js
├── hooks/              # 1 hook por tabela/view do Supabase
├── components/
│   ├── layout/          # TabBar (navegação principal)
│   ├── geral/            # aba Geral (header, timeline, rank ladder)
│   ├── materias/          # abas Matérias Geral e Por Trilha
│   ├── conquistas/        # aba Achievements (badges)
│   ├── loots/              # aba Loots
│   ├── semanal/            # aba Semanal
│   └── mensal/             # aba Mensal (gráfico de barras por dia)
├── utils/format.js      # formatação (horas, acurácia, datas)
└── styles/              # theme.css (tokens) + components.css
```

## Banco de dados (Supabase)

Schema completo documentado no Notion: **"🗄️ Documentação Completa —
Banco de Dados Supabase"**. Resumo rápido:

- `sessions` é a **única fonte de verdade numérica** — todo o resto
  (`v_player_stats`, `v_materia_stats`, `v_rank_atual`, etc.) é **view
  calculada**, nunca dado duplicado.
- Nunca sugerir adicionar uma coluna de "total" numa tabela — se é
  soma/cálculo, deve ser view.

## Convenções de código

- Nomes de arquivo de componente: PascalCase (`MateriaCard.jsx`)
- Nomes de hook: camelCase com prefixo `use` (`useMateriaStats.js`)
- Sempre tratar 3 estados em componente que busca dado: `loading`,
  `error`, sucesso — seguir o padrão já usado em todas as `*Tab.jsx`
- Comentários e nomes de variável em português (consistência com o resto
  do projeto — "Operação Genesis" é um projeto pessoal em PT-BR)

## Componente Timeline (src/components/geral/Timeline.jsx)

O `.streak-callout` tem **4 boxes** (não 2), nesta ordem fixa da
esquerda pra direita: **Streak atual → Maior streak → Dias estudados →
Dias no período**. Ao alterar esse componente, manter a ordem e reusar
sempre as classes `.streak-box`/`.streak-box-value`/`.streak-box-label`
já existentes em `components.css` — nunca criar estilo novo pra um box
igual aos outros.

## Aba Mensal (src/components/mensal/MonthlyTab.jsx)

- Gráfico de barras é **sempre CSS puro** (divs com altura proporcional)
  — o projeto nunca usa biblioteca de gráfico (recharts, chart.js, etc.),
  mesma filosofia de "sem framework" do resto do projeto.
- Sub-abas de mês são **dinâmicas**, geradas só a partir de meses que
  realmente têm sessão registrada em `sessions` — nunca mostrar mês
  vazio "adiantado".
- Nome do mês sempre por extenso em português (ex: "Agosto 2026"), nunca
  número.
- O dia com mais horas do mês é destacado em `var(--violet)`; os demais
  dias com sessão usam `var(--cyan)`; dias sem sessão ficam com barra
  mínima em tom neutro (`var(--pending)` ou similar).

## O que NÃO fazer

- Não adicionar autenticação de usuário (é uso pessoal, single-user)
- Não remover a separação hooks/componentes "pra simplificar"
- Não trocar a paleta de cor sem confirmar antes — é a mesma identidade
  visual usada também no board do Todoist e nas páginas do Notion do
  projeto