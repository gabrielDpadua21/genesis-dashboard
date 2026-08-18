# Guia de Uso — Spec-Driven Development no genesis-dashboard

## O que é cada arquivo

```
genesis-dashboard-kit/
├── PERSONA.md              ← quem constrói, princípios não-negociáveis
├── STANDARDS.md             ← stack, design system, convenções técnicas
├── GUIA-DE-USO.md           ← este arquivo
└── specs/
    └── ciclo-42-dashboard/  ← primeira feature: aba Ciclo 4.2 + Guia da Sessão
        ├── spec.md           (o quê e por quê)
        ├── plan.md           (como, tecnicamente)
        └── tasks.md          (checklist de execução)
```

`PERSONA.md` e `STANDARDS.md` são **permanentes** — valem pra todo o
projeto, não mudam a cada feature. A pasta `specs/` cresce: uma
subpasta nova por feature, seguindo sempre o mesmo padrão de 3 arquivos.

## Passo 1 — Importar pro repositório

Copiar a pasta `genesis-dashboard-kit/` inteira pra raiz do repositório
do `genesis-dashboard` (ou renomear pra algo como `/specs-kit/` se
preferir não usar o nome da pasta gerada aqui).

## Passo 2 — Iniciar sessão no Claude Code

Prompt de abertura, toda vez que for trabalhar no projeto:

```
Antes de qualquer coisa, leia PERSONA.md e STANDARDS.md na raiz do
projeto. Eles definem os princípios e convenções que valem pra tudo que
você for construir aqui — não são sugestão, são requisito.
```

Isso substitui precisar reexplicar contexto toda sessão nova.

## Passo 3 — Implementar a feature já especificada (Ciclo 4.2)

```
Agora implemente a feature descrita em specs/ciclo-42-dashboard/ —
leia spec.md (requisitos), depois plan.md (arquitetura e queries
exatas), e execute seguindo o checklist de tasks.md em ordem. Marque
cada item do tasks.md conforme for concluindo.
```

## Passo 4 — Validar contra o critério de aceite

Antes de considerar a feature pronta, reabrir `spec.md` e conferir cada
item da seção "Critérios de aceite" um por um — não é o Claude Code que
declara "pronto", é o checklist que decide.

```
Confira cada item de "Critérios de aceite" em spec.md contra o que foi
implementado. Se algum não bater, não está pronto — corrija antes de
seguir.
```

Lembrar: dado real só valida **pós-deploy** (ver restrição de sandbox em
`STANDARDS.md`). Não aceitar "funcionou" baseado só em preview interno.

## Passo 5 — Criar a próxima feature (o ciclo se repete)

Quando a próxima necessidade aparecer (ex: uma nova aba, um ajuste
grande), o padrão é sempre:

1. **Você e o Claude (aqui, em conversa)** desenham o `spec.md` — o quê e
   por quê, critérios de aceite, fora de escopo. Isso é decisão de
   produto, mais fácil de pensar em conversa do que já dentro do código.
2. Ainda em conversa, o `plan.md` — como, tecnicamente, referenciando
   `STANDARDS.md` pra não reinventar convenção.
3. O `tasks.md` — checklist granular, na ordem de execução.
4. Criar a pasta `specs/<nome-da-feature>/` com os 3 arquivos.
5. Levar pro Claude Code com o mesmo prompt de abertura do Passo 2 + 3,
   trocando o caminho da spec.

```
Nova feature especificada em specs/<nome-da-feature>/. Leia PERSONA.md
e STANDARDS.md primeiro (se ainda não leu nesta sessão), depois
spec.md, plan.md e tasks.md dessa pasta, e implemente seguindo o
checklist.
```

## Regra de ouro

`PERSONA.md` e `STANDARDS.md` **nunca são reescritos por feature** — se
uma feature exigir quebrar um princípio deles (ex: precisar escrever no
banco a partir da UI), isso é sinal pra parar e decidir conscientemente
se o princípio muda pra sempre (edita o arquivo, com essa decisão
explícita) — nunca uma exceção silenciosa só pra aquela feature.