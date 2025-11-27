import React, { useState } from 'react';
import Note from './pages/Note'; // Теперь импорт из pages

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (text) => {
    if (text.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: text.trim(),
        createdAt: new Date().toLocaleString()
      };
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📝 Список заметок</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Введите текст заметки..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNote(e.target.value);
              e.target.value = '';
            }
          }}
          style={{
            width: '300px',
            padding: '8px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input[type="text"]');
            addNote(input.value);
            input.value = '';
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Добавить заметку
        </button>
      </div>

      <div>
        {notes.length === 0 ? (
          <p>Нет заметок. Добавьте первую!</p>
        ) : (
          notes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              createdAt={note.createdAt}
              onDelete={deleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;