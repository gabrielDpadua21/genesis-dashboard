export function Sidebar({ tabs, active, onSelect, collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <span className="sidebar-brand">Operação Genesis</span>
        <button
          className="sidebar-collapse-btn"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? '»' : '«'}
        </button>
        <button className="sidebar-close-btn" onClick={onCloseMobile} aria-label="Fechar menu">✕</button>
      </div>
      <nav className="sidebar-nav">
        {tabs.map(t => {
          const [icon, ...rest] = t.label.split(' ')
          const label = rest.join(' ')
          return (
            <button
              key={t.id}
              className={`sidebar-nav-item ${active === t.id ? 'active' : ''}`}
              onClick={() => onSelect(t.id)}
              title={label}
            >
              <span className="sidebar-nav-icon">{icon}</span>
              <span className="sidebar-nav-label">{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
