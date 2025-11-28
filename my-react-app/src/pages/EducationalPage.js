// src/pages/EducationalPage.js
import React, { useState } from 'react';

export default function EducationalPage() {
  const [likes, setLikes] = useState(0);

  function increment() {
    setLikes(likes + 1);
  }

  function decrement() {
    setLikes(likes - 1);
  }

  return (
    <div className="Education" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🎓 Обучающий пример: счётчик лайков</h2>
      <p>Текущее количество лайков:</p>
      <h1 style={{ color: '#007bff' }}>{likes}</h1>
      <button
        onClick={increment}
        style={{
          padding: '8px 15px',
          margin: '0px 8px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        👍 Increment
      </button>
      <button
        onClick={decrement}
        style={{
          padding: '8px 16px',
          margin: '0 8px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        👎 Decrement
      </button>
    </div>
  );
}