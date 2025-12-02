// src/pages/WeatherWidget.js
import React, { useState } from 'react';

const MOCK_WEATHER = {
  moscow: { temp: 18, condition: 'облачно' },
  spb: { temp: 12, condition: 'дождь' },
  sochi: { temp: 26, condition: 'солнечно' },
  ekb: { temp: 9, condition: 'пасмурно' },
  novosib: { temp: 5, condition: 'снег' },
};

const CITIES = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'sochi', label: 'Сочи' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'novosib', label: 'Новосибирск' },
];

export default function WeatherWidget() {
  const [city, setCity] = useState('moscow');
  const weather = MOCK_WEATHER[city];

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Погодный виджет (заглушка)</h2>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #aaa',
          marginBottom: '20px',
        }}
      >
        {CITIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {weather && (
        <div style={{ backgroundColor: '#e9f7fe', padding: '15px', borderRadius: '10px' }}>
          <p style={{ fontSize: '28px', margin: '5px 0' }}>{weather.temp}°C</p>
          <p style={{ color: '#555', fontSize: '16px' }}>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}