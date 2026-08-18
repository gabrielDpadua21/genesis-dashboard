# Spec — Refatoração de Layout (Sidebar + Responsividade)

> Escrita retroativamente: a feature foi conduzida em conversa direta com o
> Claude Code, iterando visualmente, em vez de especificada antes de
> implementar. Documentada aqui pra manter o padrão spec → plan → tasks do
> `GUIA-DE-USO.md` e deixar rastro do que foi decidido e por quê.

## Resumo

Reestrutura o shell da dashboard: o container de 760px centralizado vira um
layout full-bleed (ocupa a tela toda) com navegação em sidebar lateral no
lugar das abas de topo, com comportamento próprio pra desktop e mobile.
Ajustes pontuais de legibilidade na listagem de matérias (`MateriaCard`)
foram feitos na sequência, dentro da mesma sessão.

## Motivação

O layout original (`max-width:760px`, abas horizontais no topo) foi pensado
pra uma tela pequena/mobile. Rodando em desktop, sobrava muito espaço morto
nas laterais e a navegação por abas de topo não escalava bem pras 8 abas já
existentes. Pedido do usuário: usar a tela inteira, menu virar sidebar, e
ter um comportamento mobile de verdade (não só o desktop espremido).

## Requisitos funcionais

1. Em desktop, a navegação fica numa sidebar lateral fixa, colapsável
   (ícone-só por padrão, expande pra ícone+label no clique).
2. Em mobile, a sidebar vira um drawer escondido por padrão, aberto por um
   botão de hambúrguer numa topbar, fechado ao tocar no backdrop, no botão
   ✕, ou ao escolher um item de navegação.
3. O conteúdo das abas ocupa a largura total disponível ao lado da sidebar
   (sem `max-width` fixo herdado do layout antigo).
4. Cada bloco de conteúdo (painel) ocupa uma linha inteira — não reflui em
   colunas lado a lado — respeitando o espaçamento já existente entre
   blocos.
5. A listagem de matérias (`MateriaCard`) mostra nome da matéria e as
   estatísticas (Horas/Questões/Acertos/Acurácia) alinhados na mesma linha,
   com fonte maior que a versão original.
6. A flag de categoria (TI/Direito/Exatas/Outros) na listagem de matérias
   usa a cor da categoria (já definida em `--ti`/`--direito`/`--exatas`/
   `--outros`) em vez de cinza neutro.

## Critérios de aceite

- [x] Sidebar visível e funcional em desktop (≥881px), colapsa/expande sem
      recarregar a página
- [x] Em mobile (≤880px), sidebar vira drawer, hambúrguer abre, backdrop e
      botão ✕ fecham
- [x] Navegar por um item da sidebar no mobile fecha o drawer automaticamente
- [x] Nenhum `max-width` herdado do layout antigo restringindo o conteúdo
- [x] Painéis empilhados um por linha, sem grid multi-coluna
- [x] `MateriaCard` numa linha só, fonte maior, nome alinhado com as stats
- [x] Flag de categoria colorida por categoria, sem introduzir cor nova
      (reaproveita tokens já existentes no `theme.css`)

## Fora de escopo

- Mudança de paleta de cor ou tokens novos no design system — tudo reaproveita
  tokens já existentes (`--ti`, `--direito`, `--exatas`, `--outros`, `--cyan`,
  `--violet`, etc.)
- Mudança de comportamento de dado/fetch — só camada visual
- Multi-coluna no conteúdo das abas — testado durante a sessão, revertido a
  pedido do usuário em favor de um bloco por linha em largura máxima

## Referências

- Conversa direta com o usuário nesta sessão do Claude Code (sem página
  Notion associada a esta spec).
