const TIPO_ICON = { Comum: '🎁', Incomum: '🎁', Raro: '💎' }

export function LootRow({ loot }) {
  const isUsado = loot.status === 'Usado'

  return (
    <div className="loot-row">
      <div className={`loot-icon ${loot.tipo.toLowerCase()}`}>
        {TIPO_ICON[loot.tipo] ?? '🎁'}
      </div>
      <div className="loot-info">
        <div className="loot-tipo">{loot.tipo} — dado {loot.resultado_dado}</div>
        <div className="loot-origem">{loot.tarefa_sessao} · {loot.data}</div>
      </div>
      <div className={`loot-status ${isUsado ? 'usado' : 'nao-usado'}`}>{loot.status}</div>
    </div>
  )
}
