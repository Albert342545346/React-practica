// src/pages/EducationalPage.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function EducationalPage() {
  // ===== Счётчик лайков =====
  const [likes, setLikes] = useState(0);

  const increment = () => setLikes(likes + 1);
  const decrement = () => setLikes(likes - 1);

  // ===== Форма добавления технологии =====
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

  // Валидация
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

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  React.useEffect(() => {
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

      // Сброс формы
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

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* === Счётчик лайков === */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>🎓 Обучающий пример: счётчик лайков</h2>
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
              cursor: 'pointer',
            }}
          >
            👎 Decrement
          </button>
        </div>
      </div>

      {/* === Форма добавления технологии === */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, mb: 4 }}
        noValidate
      >
        <Typography variant="h5" gutterBottom>
          ➕ Добавить новую технологию (практика №25 + №26)
        </Typography>

        {/* Название */}
        <TextField
          fullWidth
          label="Название технологии *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          margin="normal"
        />

        {/* Описание */}
        <TextField
          fullWidth
          label="Описание *"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
        />

        {/* Категория */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Категория</InputLabel>
          <Select name="category" value={formData.category} onChange={handleChange} label="Категория">
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="database">База данных</MenuItem>
            <MenuItem value="devops">DevOps</MenuItem>
            <MenuItem value="other">Другое</MenuItem>
          </Select>
        </FormControl>

        {/* Сложность */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Сложность</InputLabel>
          <Select name="difficulty" value={formData.difficulty} onChange={handleChange} label="Сложность">
            <MenuItem value="beginner">Начальный</MenuItem>
            <MenuItem value="intermediate">Средний</MenuItem>
            <MenuItem value="advanced">Продвинутый</MenuItem>
          </Select>
        </FormControl>

        {/* Дедлайн */}
        <TextField
          fullWidth
          label="Дедлайн (необязательно)"
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          error={!!errors.deadline}
          helperText={errors.deadline}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Ресурсы */}
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Ресурсы для изучения
          </Typography>
          {formData.resources.map((resource, index) => (
            <Box key={index} display="flex" gap={1} alignItems="center" mb={1}>
              <TextField
                fullWidth
                type="url"
                placeholder="https://example.com"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                error={!!errors[`resource_${index}`]}
                helperText={errors[`resource_${index}`]}
              />
              {formData.resources.length > 1 && (
                <IconButton
                  onClick={() => removeResourceField(index)}
                  color="error"
                  aria-label={`Удалить ресурс ${index + 1}`}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addResourceField}
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
          >
            Добавить ресурс
          </Button>
        </Box>

        {/* Кнопки */}
        <Box display="flex" gap={2} mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
            Сохранить технологию
          </Button>
        </Box>
      </Paper>

      {/* === Список добавленных технологий === */}
      {technologies.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            📚 Добавленные технологии ({technologies.length})
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
            {technologies.map((tech) => (
              <Paper key={tech.id} sx={{ p: 2 }}>
                <Typography variant="h6">{tech.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {tech.description}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <span style={{ fontSize: '0.85rem', padding: '2px 6px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {tech.category}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      padding: '2px 6px',
                      backgroundColor: tech.status === 'completed' ? '#d4edda' : tech.status === 'in-progress' ? '#fff3cd' : '#f8d7da',
                      borderRadius: '4px',
                    }}
                  >
                    {tech.status === 'completed' ? 'Завершено' : tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}
                  </span>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}
