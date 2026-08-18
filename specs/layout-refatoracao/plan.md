# Plan — Refatoração de Layout (Sidebar + Responsividade)

## Decisões tomadas (confirmadas com o usuário via perguntas diretas)

- **Largura do conteúdo**: full-bleed, sem `max-width` — opção escolhida
  explicitamente sabendo do tradeoff de legibilidade (ver nota abaixo).
- **Navegação mobile**: hambúrguer + sidebar deslizante (drawer), reaproveitando
  o mesmo componente `Sidebar` usado no desktop, não um padrão separado
  (ex: bottom tab bar).
- **Sidebar desktop**: colapsável, ícone-só por padrão — não sempre expandida.
- **Breakpoint**: 880px — decisão técnica dentro da autoridade de "ajuste
  dentro do design system existente" (`PERSONA.md`), não perguntado
  explicitamente por ser um valor de engenharia comum, não uma escolha de
  marca/identidade.

## Nota sobre tensão com acessibilidade (PERSONA.md, princípio 3)

A primeira implementação do conteúdo full-bleed usava um grid multi-coluna
(`repeat(auto-fit, minmax(380px,460px))`) pra evitar painel/linha de texto
esticando até a borda da tela em monitor largo — respeitando o princípio de
legibilidade do `PERSONA.md` (usuário final é disléxico). O usuário testou e
pediu explicitamente pra reverter: um bloco por linha, largura máxima
possível, sem multi-coluna. Acatado — é decisão explícita do usuário sobre o
próprio produto, não uma omissão do princípio. Registrado aqui pra não ser
reintroduzido "corrigindo" algo que já foi decidido conscientemente.

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/components/layout/TabBar.jsx` | Removido (substituído pela Sidebar, ficou sem uso) |
| `src/components/layout/Sidebar.jsx` | Novo — nav vertical, usado em desktop (colapsável) e mobile (drawer) |
| `src/App.jsx` | Shell reestruturado: `.app-shell` (flex) com `Sidebar` + `.app-main`; estado de `collapsed`/`mobileOpen` elevado pro componente; topbar mobile com hambúrguer |
| `src/styles/theme.css` | `.wrap` (max-width:760px) trocado por `.app-shell`/`.app-main`; `.panel` perdeu `margin-bottom` (espaçamento passou a vir do `.tab-content`) |
| `src/styles/components.css` | Removido `.tabs`/`.tab-btn` (mortos); adicionado CSS de sidebar/topbar/backdrop com media query em 880px; `.tab-content` como `flex-direction:column` (um bloco por linha); `MateriaCard` redesenhado pra linha única; `.materia-cat-tag` virou badge colorido |
| `src/components/guia/GuiaSessaoPage.jsx` | Envolvido em `.tab-content`; header (voltar/eyebrow/nome) agrupado em `.page-header` |
| `src/components/materias/MateriaCard.jsx` | Nome + stats na mesma linha (`materia-info` + `materia-stats-row` como flex, não mais empilhados); cor da flag de categoria via `CAT_COLORS` inline |

## Comportamento por breakpoint (880px)

**Desktop (≥881px)**
- `.sidebar` é item flex normal dentro de `.app-shell` (`position:sticky`),
  largura 220px expandida / 64px colapsada
- `.mobile-topbar` e `.sidebar-backdrop` ficam `display:none`

**Mobile (≤880px)**
- `.sidebar` vira `position:fixed`, fora da tela por padrão
  (`transform:translateX(-100%)`), abre com `.mobile-open`
  (`translateX(0)`), sempre em largura fixa de 250px (estado "colapsado" do
  desktop é ignorado — no mobile a sidebar aberta sempre mostra ícone+label)
- `.mobile-topbar` (hambúrguer + título) aparece, sticky no topo do
  `.app-main`
- `.sidebar-backdrop` cobre a tela quando o drawer está aberto, fecha ao
  clicar

## Reaproveitamento de design system

Nenhum token de cor novo. `MateriaCard` usa `CAT_COLORS` (`--ti`,
`--direito`, `--exatas`, `--outros`) já existentes em `utils/format.js` e
`theme.css`. O badge de categoria usa `color-mix(in srgb, currentColor 14%,
transparent)` pro fundo tingido, sem precisar declarar uma cor de fundo por
categoria à parte.
