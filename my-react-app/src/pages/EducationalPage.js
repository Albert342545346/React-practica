import React, { useState, useEffect } from 'react';

export default function EducationalPage() {
  const [likes, setLikes] = useState(0);
  const increment = () => setLikes(likes + 1);
  const decrement = () => setLikes(likes - 1);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    deadline: '',
    resources: [''],
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [technologies, setTechnologies] = useState([]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Название должно содержать минимум 2 символа';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Название не должно превышать 50 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание технологии обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    formData.resources.forEach((resource, index) => {
      if (resource && !isValidUrl(resource)) {
        newErrors[`resource_${index}`] = 'Введите корректный URL';
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData((prev) => ({ ...prev, resources: newResources }));
  };

  const addResourceField = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, ''],
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, resources: newResources }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const cleanedData = {
        ...formData,
        id: Date.now(),
        status: 'not-started',
        resources: formData.resources.filter((r) => r.trim() !== ''),
      };
      setTechnologies([...technologies, cleanedData]);

      setFormData({
        title: '',
        description: '',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: '',
        resources: [''],
      });
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getStatusStyle = (status) => {
    let bgColor = '#f8d7da'; // default: not-started
    if (status === 'completed') bgColor = '#d4edda';
    else if (status === 'in-progress') bgColor = '#fff3cd';
    return {
      fontSize: '0.85rem',
      padding: '2px 6px',
      backgroundColor: bgColor,
      borderRadius: '4px',
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Счётчик лайков */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Обучающий пример: счётчик лайков</h2>
        <p>Текущее количество лайков:</p>
        <h1 style={{ color: '#007bff' }}>{likes}</h1>
        <div>
          <button
            onClick={increment}
            style={{
              padding: '8px 15px',
              margin: '0 8px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Increment
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
              cursor: 'pointer',
            }}
          >
            Decrement
          </button>
        </div>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '32px' }}>
        <h3>Добавить новую технологию (практика №25 + №26)</h3>

        {/* Название */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Название технологии *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.title ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.title && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.title}</div>}
        </div>

        {/* Описание */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Описание *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.description ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.description && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.description}</div>}
        </div>

        {/* Категория */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Категория</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">База данных</option>
            <option value="devops">DevOps</option>
            <option value="other">Другое</option>
          </select>
        </div>

        {/* Сложность */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Сложность</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="beginner">Начальный</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>

        {/* Дедлайн */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Дедлайн (необязательно)</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: errors.deadline ? '1px solid red' : '1px solid #ccc',
            }}
          />
          {errors.deadline && <div style={{ color: 'red', fontSize: '0.9em' }}>{errors.deadline}</div>}
        </div>

        {/* Ресурсы */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Ресурсы для изучения</label>
          {formData.resources.map((resource, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
              <input
                type="url"
                placeholder="https://example.com"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px',
                  border: errors[`resource_${index}`] ? '1px solid red' : '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
              {formData.resources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeResourceField(index)}
                  style={{
                    padding: '4px 8px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addResourceField}
            style={{
              padding: '6px 12px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Добавить ресурс
          </button>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            padding: '10px 20px',
            backgroundColor: isFormValid ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
          }}
        >
          Сохранить технологию
        </button>
      </form>

      {/* Список технологий */}
      {technologies.length > 0 && (
        <div>
          <h3>Добавленные технологии ({technologies.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {technologies.map((tech) => (
              <div
                key={tech.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#fafafa',
                }}
              >
                <h4 style={{ margin: '0 0 8px 0' }}>{tech.title}</h4>
                <p style={{ fontSize: '0.9em', color: '#555', margin: '0 0 12px 0' }}>{tech.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      padding: '2px 6px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    {tech.category}
                  </span>
                  <span style={getStatusStyle(tech.status)}>{getStatusLabel(tech.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}