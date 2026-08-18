# Spec — Ciclo 4.2 na Dashboard

## Resumo
Adicionar visualização do sistema Método 4.2 (fase de volume, progresso por
grupo A/B, Portal Pós-Fight) e uma página de referência dos fluxos de sessão
à dashboard já existente (`genesis-dashboard`).

## Motivação
O sistema operacional (Todoist) e o banco de dados (Supabase) já foram
reestruturados pro Método 4.2. A dashboard ainda reflete só o sistema antigo
(7 abas: Geral, Matérias Geral, Por Trilha, Conquistas, Loots, Semanal,
Mensal) — não existe visão nenhuma da fase de volume, dos grupos A/B, ou do
fluxo de revisão reversa.

## Requisitos funcionais

1. Usuário consegue ver a fase de volume atual (nome, meta de tempo dia
   útil/fim de semana) sem consultar o Supabase direto.
2. Usuário consegue ver o progresso de tarefas concluídas por Grupo (A/B),
   separado.
3. Usuário consegue ver quais tarefas estão aguardando a bateria de
   Contra-Ataque (Portal Pós-Fight), com dado real.
4. Usuário consegue consultar o passo a passo de cada tipo de sessão
   (Exploração / Contra-Ataque) como referência, mesmo sem estar numa sessão
   ativa.
5. Usuário consegue ver a legenda de cores da leitura ativa como referência
   fixa.

## Critérios de aceite

- [ ] Fase atual visível, com meta convertida pra formato legível (ex: "2h",
      não "120min")
- [ ] Progresso por grupo mostra números reais batendo com o Supabase
      (`v_grupo_stats`) — nunca estimado ou hardcoded
- [ ] Portal Pós-Fight mostra lista vazia de forma clara quando não há nada
      pendente (não deixa a seção em branco sem explicação)
- [ ] Guia da Sessão acessível sem precisar de sessão ativa ou dado do banco
- [ ] Nenhuma parte da interface implica que existe dado ao vivo de
      Roster/Fila/Manutenção (ver Fora de Escopo)

## Fora de escopo

- **Visão ao vivo de Roster Ativo / Fila / Manutenção**: essa granularidade
  só existe como arranjo de seções no Todoist, não é dado armazenado no
  Supabase. Não faz parte desta spec mostrar isso — se for necessário no
  futuro, é uma spec separada que exigiria decidir se vale a pena replicar
  esse dado no Supabase (o que fere o princípio de fonte única de verdade já
  estabelecido no sistema) ou integrar a dashboard direto ao Todoist.
- **Escrita**: a dashboard continua somente leitura. Nenhuma ação do usuário
  na dashboard grava no Todoist ou Supabase.
- **Autenticação**: fora de escopo, a dashboard já funciona com anon key
  read-only, sem mudança de modelo de acesso.

## Referências
- [📘 Sistema 2.0 — Método 4.2 + Roster/Fila](https://app.notion.com/p/3bd8b5b4222f8118a62fca0b2703cb07) (Notion)
- [🗄️ Documentação Completa — Banco de Dados Supabase](https://app.notion.com/p/3b68b5b4222f81758375ded035c6ba21) (Notion)