import React, { useState } from 'react';

function Note({ id, text, createdAt, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '10px',
        position: 'relative',
      }}
    >
      {isEditing ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'vertical',
            }}
            rows={3}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '4px 8px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Сохранить
            </button>
            <button
              onClick={() => {
                setEditText(text); // Отмена — возвращаем исходный текст
                setIsEditing(false);
              }}
              style={{
                padding: '4px 8px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ margin: '0 0 5px 0' }}>{text}</p>
          <small style={{ color: '#888' }}>Создано: {createdAt}</small>

          {/* Кнопки управления */}
          <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '5px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#ffc107',
              }}
            >
              Редактирование
            </button>
            <button
              onClick={() => onDelete(id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#dc3545',
              }}
            >
              ✖
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;