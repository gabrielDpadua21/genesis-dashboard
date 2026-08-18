# Tasks — Refatoração de Layout (Sidebar + Responsividade)

## Shell / navegação

1. [x] Criar `Sidebar.jsx` (nav vertical, ícone + label)
2. [x] Remover `TabBar.jsx` (sem uso após a troca)
3. [x] Reestruturar `App.jsx`: `.app-shell` (sidebar + main), estado de
       aba elevado pro nível do App (persiste entre rotas `/` e `/guia`)
4. [x] Sidebar colapsável no desktop (ícone-só por padrão, toggle `»`/`«`)
5. [x] Drawer mobile: hambúrguer na topbar, backdrop, botão ✕, fecha ao
       navegar
6. [x] Breakpoint único (880px) entre os dois comportamentos

## Largura e disposição do conteúdo

7. [x] Remover `max-width:760px` do container (`.wrap` → `.app-shell`/`.app-main`)
8. [x] Primeira tentativa: grid multi-coluna responsivo (`auto-fit`,
       `minmax(380px,460px)`) — implementado e depois revertido
9. [x] Versão final: `.tab-content{display:flex; flex-direction:column}` —
       um bloco por linha, largura máxima disponível
10. [x] Remover `margin-bottom` duplicado do `.panel` (espaçamento unificado
        no `gap` do `.tab-content`)

## Listagem de matérias (`MateriaCard`)

11. [x] Nome da matéria e estatísticas realinhados pra mesma linha (antes:
        nome numa linha, stats em grid de 4 colunas embaixo)
12. [x] Fonte aumentada (nome 12.5px→15px; labels 8px→9.5px; valores
        12.5px→14px)
13. [x] Flag de categoria (TI/Direito/Exatas/Outros) colorida por categoria
        — badge com `currentColor` + `color-mix`, reaproveitando
        `--ti`/`--direito`/`--exatas`/`--outros`

## Checklist final

14. [ ] Testar com dado real após deploy (não confiar em preview dentro do
        Claude) — pendente, aguardando o usuário validar via `npm run dev`
        e, depois, pós-deploy no Vercel
