# STANDARDS.md — Padrões técnicos do genesis-dashboard

Convenções que qualquer feature nova deve seguir. Itens marcados
**[confirmado]** vêm de decisões já tomadas nesta conversa/projeto. Itens
marcados **[a confirmar]** são proposta razoável, mas devem ser checados
contra o repositório real na primeira sessão — nunca assumir que já é
assim sem olhar o código existente.

## Stack **[confirmado]**

- React + Vite
- Deploy: Vercel
- Dados: `@supabase/supabase-js`, anon key, **somente leitura**
- Projeto Supabase: `operacao-genesis` (ref `gzuxjiruljdsyxgizlzb`), região
  `sa-east-1`
- Sem framework de state management externo — Context/useState é
  suficiente pro tamanho atual do projeto

## Design System **[confirmado]**

| Token | Valor |
|---|---|
| Fundo | `#0A0C12` |
| Card | `#1C1F2B` |
| Borda de card | `#2A2E3D` |
| Acento primário (violeta) | `#8C7FFF` |
| Acento secundário (ciano) | `#4EDAE0` |
| Fonte de título | Cinzel |
| Fonte de corpo | Inter |
| Fonte de dado numérico/label | JetBrains Mono |

Paleta de categoria (usada em blocos de conteúdo/leitura ativa, se algum
componente novo precisar): conceito verde `#4ADE80`, definição azul
`#60A5FA`, exemplo laranja `#FB923C`, situação roxo `#C084FC`, atenção
amarelo `#FDE047`. Versão viva/saturada — os tons pastel originais
(`#DFF5E3` etc.) ficavam apagados contra o fundo escuro do app; ajustado
na implementação da Legenda de Cores em `specs/ciclo-42-dashbord/`.

## Estrutura de arquivos **[a confirmar contra o repo real]**

Proposta, caso o projeto ainda não tenha convenção fixada:
```
/src
  /components
    /<feature>/       -- componentes específicos de uma feature
    /shared/          -- componentes reaproveitados entre features
  /lib
    supabase.js       -- client único, importado onde precisar
  /pages ou /routes    -- conforme o roteador em uso
```
Antes de criar pasta nova, olhar como as 7 abas existentes (Geral,
Matérias Geral, Por Trilha, Conquistas, Loots, Semanal, Mensal) estão
organizadas hoje, e seguir o mesmo padrão — não introduzir estrutura
paralela.

## Convenção de nomes **[a confirmar contra o repo real]**

- Componentes: PascalCase
- Arquivo de componente: mesmo nome do componente
- Hooks customizados: prefixo `use` + PascalCase

## Padrão de fetching de dados **[confirmado como princípio, detalhe de implementação a confirmar]**

- Sempre via view do Supabase quando existir uma pronta — nunca replicar
  lógica de agregação no client se a view já resolve
- Tratar estado vazio **explicitamente** — nunca deixar seção em branco
  sem explicação (ver PERSONA.md, princípio de honestidade de dado)
- Loading state obrigatório em qualquer fetch, por mais rápido que pareça

## Restrição técnica confirmada — sandbox do Claude

Artifacts do Claude não conseguem `fetch()` pra APIs externas (confirmado
em teste real, 08/08/2026). Prototipar dentro do Claude vai mostrar dado
mockado — isso é esperado, não é bug. Validação de dado real só acontece
pós-deploy (Vercel/Netlify).

## Commits **[proposta, ajustar ao gosto se já houver padrão]**

- Mensagens em português, imperativo curto (ex: "adiciona aba Ciclo 4.2",
  não "adicionei" nem "adding")
- Um commit por unidade discreta do `tasks.md` da feature em andamento —
  evitar commit único gigante cobrindo a feature inteira

## Testes

Sem framework de teste formal no momento (projeto pessoal, sem CI
configurado até onde se sabe). Critério de aceite é validação manual
pós-deploy contra dado real — ver checklist final de cada `tasks.md`.