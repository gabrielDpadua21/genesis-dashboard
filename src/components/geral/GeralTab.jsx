import { usePlayerStats } from '../../hooks/usePlayerStats'
import { useRankAtual } from '../../hooks/useRankAtual'
import { useRanks } from '../../hooks/useRanks'
import { useStudyDays } from '../../hooks/useStudyDays'
import { PlayerHeader } from './PlayerHeader'
import { Timeline } from './Timeline'
import { RankLadder } from './RankLadder'

export function GeralTab() {
  const { data: player, loading: l1, error: e1 } = usePlayerStats()
  const { data: rankAtual, loading: l2, error: e2 } = useRankAtual()
  const { data: ranks, loading: l3, error: e3 } = useRanks()
  const { studyDates, loading: l4, error: e4 } = useStudyDays()

  if (l1 || l2 || l3 || l4) return <div className="loading-box">Carregando...</div>
  const err = e1 || e2 || e3 || e4
  if (err) return <div className="error-box">Erro ao carregar: {err.message}</div>

  return (
    <>
      <PlayerHeader player={player} rankAtual={rankAtual} />
      <Timeline studyDates={studyDates} streakAtual={player.streak_atual} />
      <RankLadder ranks={ranks} player={player} rankAtualNome={rankAtual.rank_atual} />
    </>
  )
}
