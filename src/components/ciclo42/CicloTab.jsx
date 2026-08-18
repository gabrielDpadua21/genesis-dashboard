import { useFaseVolume } from '../../hooks/useFaseVolume'
import { useGrupoStats } from '../../hooks/useGrupoStats'
import { usePortalPendente } from '../../hooks/usePortalPendente'
import { useCicloStatus } from '../../hooks/useCicloStatus'
import { FaseCard } from './FaseCard'
import { RodaSemana } from './RodaSemana'
import { GrupoProgress } from './GrupoProgress'
import { PortalPendente } from './PortalPendente'
import { CicloGeral } from './CicloGeral'

export function CicloTab() {
  const { data: fase, loading: l1, error: e1 } = useFaseVolume()
  const { data: grupos, loading: l2, error: e2 } = useGrupoStats()
  const { data: pendentes, loading: l3, error: e3 } = usePortalPendente()
  const { data: cicloStatus, loading: l4, error: e4 } = useCicloStatus()

  if (l1 || l2 || l3 || l4) return <div className="loading-box">Carregando...</div>
  const err = e1 || e2 || e3 || e4
  if (err) return <div className="error-box">Erro ao carregar: {err.message}</div>

  return (
    <>
      <FaseCard fase={fase} />
      <RodaSemana />
      <GrupoProgress grupos={grupos} />
      <PortalPendente pendentes={pendentes} />
      <CicloGeral statusList={cicloStatus} />
    </>
  )
}
