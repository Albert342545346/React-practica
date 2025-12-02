import React, { useState } from 'react';
import Note from './pages/Note';
import WeatherWidget from './pages/WeatherWidget';
import EducationalPage from './pages/EducationalPage';

function App() {
  const [currentPage, setCurrentPage] = useState('notes');
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
      <h1>Контрольная работа №4</h1>

      <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setCurrentPage('notes')} style={navButtonStyle(currentPage === 'notes')}>
          Заметки
        </button>
        <button onClick={() => setCurrentPage('weather')} style={navButtonStyle(currentPage === 'weather')}>
          Погода
        </button>
        <button onClick={() => setCurrentPage('educational')} style={navButtonStyle(currentPage === 'educational')}>
          Обучение
        </button>
      </div>

      {currentPage === 'notes' ? (
        <div>
          <h2>Список заметок</h2>
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
              Добавить
            </button>
          </div>

          <div>
            {notes.length === 0 ? (
              <p>Нет заметок. Добавьте первую!</p>
            ) : (
              notes.map((note) => (
                <Note key={note.id} id={note.id} text={note.text} createdAt={note.createdAt} onDelete={deleteNote} />
              ))
            )}
          </div>
        </div>
      ) : currentPage === 'weather' ? (
        <WeatherWidget />
      ) : (
        <EducationalPage />
      )}
    </div>
  );
}

const navButtonStyle = (isActive) => ({
  padding: '10px 16px',
  backgroundColor: isActive ? '#007bff' : '#f0f0f0',
  color: isActive ? 'white' : 'black',
  border: '1px solid #ccc',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'background 0.2s',
});

export default App;