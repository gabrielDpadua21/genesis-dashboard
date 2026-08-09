# 🗡️ Operação Genesis — Dashboard

Dashboard de progresso de estudos (Season I), lendo dado ao vivo do Supabase.

## Stack

- React + Vite
- Supabase (`@supabase/supabase-js`) — leitura via chave `anon` (RLS protege escrita)
- CSS puro (sem framework), tema escuro/violeta/ciano

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

As chaves do Supabase já estão em `.env.local` (não vai pro Git — veja `.env.example` pro formato).

## Estrutura

```
src/
├── lib/supabaseClient.js      → conexão única com o Supabase
├── hooks/                      → um hook por fonte de dado (busca + isolamento)
├── components/
│   ├── layout/                 → TabBar (navegação)
│   ├── geral/                  → Header do player, Timeline, Rank Ladder
│   ├── materias/                → Cards de matéria, abas Geral/Por Trilha
│   ├── conquistas/              → Badges de achievement
│   ├── loots/                   → Histórico de loot
│   └── semanal/                 → Cards de semana com status
├── utils/format.js             → formatação de horas, acurácia, datas
└── styles/                     → theme.css (tokens) + components.css (componentes)
```

## Build para produção

```bash
npm run build
```

Gera a pasta `dist/` — é isso que a Vercel/Netlify publica.

## Deploy

1. Suba este projeto pro GitHub
2. Conecte o repositório na Vercel ou Netlify
3. Configure as variáveis de ambiente no painel deles:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático a cada `git push`

## Banco de dados

Toda a documentação do schema Supabase (tabelas, views, queries) está no Notion:
**🗄️ Documentação Completa — Banco de Dados Supabase**
