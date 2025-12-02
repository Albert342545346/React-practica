import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function RoadmapDetail({ items, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const originalItem = items.find(item => String(item.id) === String(id));
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!originalItem) {
      navigate('/');
      return;
    }
    setItem({ ...originalItem });
  }, [originalItem, navigate]);

  if (!item) return null;

  const handleChange = (field, value) => {
    setItem(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(item);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>

      {item.link && (
        <p>
          <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#1976d2' }}>
            Перейти к ресурсу
          </a>
        </p>
      )}

      <div style={{ marginTop: '24px' }}>
        <label>Статус:</label>
        <select
          value={item.status}
          onChange={(e) => handleChange('status', e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value="not-started">Не начат</option>
          <option value="in-progress">В работе</option>
          <option value="completed">Выполнено</option>
        </select>
      </div>

      <div style={{ marginTop: '16px' }}>
        <label>Дата завершения:</label>
        <input
          type="date"
          value={item.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        <label>Ваша заметка:</label>
        <textarea
          value={item.note}
          onChange={(e) => handleChange('note', e.target.value)}
          rows="6"
          placeholder="Добавьте сюда свои мысли, конспект или полезные ссылки..."
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Сохранить
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}