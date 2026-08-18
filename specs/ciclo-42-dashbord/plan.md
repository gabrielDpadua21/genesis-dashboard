# Plan — Ciclo 4.2 na Dashboard

## Stack e convenções existentes (reaproveitar, não recriar)

- React + Vite, deploy Vercel
- `@supabase/supabase-js` com anon key, já configurado (`SUPABASE_URL` /
  `SUPABASE_ANON_KEY` já nas envs do projeto)
- Design system: fundo `#0A0C12`, cards `#1C1F2B`, bordas `#2A2E3D`, acentos
  violeta `#8C7FFF` e ciano `#4EDAE0`, fontes Cinzel (títulos) / Inter
  (corpo) / JetBrains Mono (números/labels)
- Projeto: `operacao-genesis` (ref `gzuxjiruljdsyxgizlzb`), região
  `sa-east-1`. RLS habilitado, SELECT liberado pra `anon`/`authenticated` em
  todas as tabelas/views relevantes — sem necessidade de auth adicional.

## ⚠️ Restrição técnica confirmada

Artifacts do Claude não conseguem `fetch()` pra APIs externas (sandbox
bloqueia) — confirmado em teste real em 08/08/2026. A dashboard só carrega
dado ao vivo quando publicada de verdade (fora da sandbox do Claude). Se
estiver prototipando dentro do Claude antes do deploy, os dados aparecerão
mockados — isso é esperado, não é bug.

## Fontes de dado (Supabase)

| Elemento da UI | View/Tabela | Colunas relevantes |
|---|---|---|
| Card de Fase | `fase_volume WHERE ativa = true` | `fase`, `nome`, `meta_dia_util_min`, `meta_fds_min`, `data_inicio` |
| Progresso por Grupo | `v_grupo_stats` | `grupo`, `total_tarefas`, `tarefas_concluidas`, `pct_concluido` |
| Portal Pós-Fight | `v_portal_pendente` | `tarefa`, `trilha`, `materia`, `grupo`, `data_leitura`, `minutos`, `paginas` |
| Progresso geral do ciclo (opcional) | `v_ciclo_status` | `trilha`, `tarefa`, `materia`, `status` |
| Stats gerais (reaproveitar de outra aba) | `v_player_stats`, `v_rank_atual` | já usados em Geral |

Roda da Semana e conteúdo da Guia da Sessão são **estáticos** — não vêm do
banco, são a estrutura fixa do método (ver `spec.md` e conteúdo abaixo).

## Componentes

### Aba "🔄 Ciclo 4.2" (nova, junto das 7 existentes)
1. **Card de Fase** — nome, número, meta convertida pra "Xh" (minutos → horas
   no client), data de início
2. **Roda da Semana** — grid estático de 7 dias, dia atual destacado via
   `new Date().getDay()` no client
3. **Progresso por Grupo** — duas barras de progresso (A/B), cor
   diferenciada (sugestão: ciano = A/TI, âmbar = B/Base)
4. **Portal Pós-Fight** — lista/cards a partir de `v_portal_pendente`; estado
   vazio tratado explicitamente
5. **Progresso geral do ciclo** (opcional, se não duplicar a aba "Por
   Trilha") — a partir de `v_ciclo_status`

### Página "Guia da Sessão" (nova, standalone)
- Toggle entre dois fluxos: 🧭 Exploração (5 passos) / ⚔️ Contra-Ataque (6
  passos) — conteúdo exato no `tasks.md`
- Legenda de cores fixa (5 cores)
- Bloco de "Ritual de Entrada" fixo no topo

## Decisões de design tomadas

- **Não criar visão de Roster/Fila/Manutenção** — ver `spec.md`, seção Fora
  de Escopo. Evita inventar granularidade que não existe na fonte de dado.
- **Guia da Sessão é conteúdo estático**, não puxa nada do banco — é
  documentação de processo, não dado.
- **Reaproveitar padrão visual já validado** em rascunhos HTML anteriores
  (fundo escuro, cards com borda sutil, gradiente violeta→ciano em elementos
  de destaque).