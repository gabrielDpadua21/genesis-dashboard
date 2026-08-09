import { useLoots } from '../../hooks/useLoots'
import { LootRow } from './LootRow'

export function LootsTab() {
  const { data: loots, loading, error } = useLoots()

  if (loading) return <div className="loading-box">Carregando...</div>
  if (error) return <div className="error-box">Erro ao carregar: {error.message}</div>

  const pendentes = loots.filter(l => l.status === 'Não usado').length

  return (
    <div className="panel">
      <div className="section-title">🎲 Loots ({pendentes} pendente{pendentes === 1 ? '' : 's'})</div>
      {loots.map(l => <LootRow key={l.id} loot={l} />)}
    </div>
  )
}
