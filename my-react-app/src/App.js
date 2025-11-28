// src/App.js
import React, { useState } from 'react';
import Note from './pages/Note';
import WeatherWidget from './pages/WeatherWidget';

function App() {
  const [currentPage, setCurrentPage] = useState('notes'); // 'notes' или 'weather'
  const [notes, setNotes] = useState([]);

  const addNote = (text) => {
    if (text.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: text.trim(),
        createdAt: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Моё React-приложение</h1>

      {/* Переключатель страниц */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentPage('notes')}
          style={{
            padding: '10px 16px',
            marginRight: '10px',
            backgroundColor: currentPage === 'notes' ? '#007bff' : '#eee',
            color: currentPage === 'notes' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          📝 Список заметок
        </button>
        <button
          onClick={() => setCurrentPage('weather')}
          style={{
            padding: '10px 16px',
            backgroundColor: currentPage === 'weather' ? '#007bff' : '#eee',
            color: currentPage === 'weather' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🌤️ Погодный виджет
        </button>
      </div>

      {/* Отображение выбранной "страницы" */}
      {currentPage === 'notes' ? (
        <div>
          <h2>📝 Список заметок</h2>
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
                border: '1px solid #ccc',
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
                cursor: 'pointer',
              }}
            >
              Добавить заметку
            </button>
          </div>

          <div>
            {notes.length === 0 ? (
              <p>Нет заметок. Добавьте первую!</p>
            ) : (
              notes.map((note) => (
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
      ) : (
        <WeatherWidget />
      )}
    </div>
  );
}

export default App;