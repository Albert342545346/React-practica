import React from 'react';

function Note({ id, text, createdAt, onDelete }) {
  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '10px',
        position: 'relative'
      }}
    >
      <p style={{ margin: '0 0 5px 0' }}>{text}</p>
      <small style={{ color: '#888' }}>Создано: {createdAt}</small>

      <button
        onClick={() => onDelete(id)}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          color: '#dc3545'
        }}
      >
        ✖
      </button>
    </div>
  );
}

export default Note;