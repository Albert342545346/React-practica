import { Link } from 'react-router-dom';

const getStatusStyle = (status) => {
  switch (status) {
    case 'completed': return { background: '#e8f5e9', border: '#4caf50', label: 'Выполнено' };
    case 'in-progress': return { background: '#fff8e1', border: '#ff9800', label: 'В работе' };
    default: return { background: '#ffebee', border: '#f44336', label: 'Не начат' };
  }
};

export default function RoadmapList({ items }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '20px'
    }}>
      {items.map(item => {
        const style = getStatusStyle(item.status);
        return (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              border: `2px solid ${style.border}`,
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: style.background,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.1em' }}>{item.title}</h3>
                <span style={{
                  fontSize: '0.8em',
                  fontWeight: 'bold',
                  color: style.border
                }}>{style.label}</span>
              </div>
              <p style={{ margin: 0, color: '#555', fontSize: '0.95em' }}>
                {item.description.length > 100
                  ? item.description.substring(0, 100) + '...'
                  : item.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}