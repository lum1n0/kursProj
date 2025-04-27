// File path: /home/gtr/Рабочий стол/kursProj/front/src/utils.js
const API_BASE_URL = 'http://localhost:8080';

export const getImageUrl = (relativePath) => {
  if (!relativePath) return '/img/default-product.svg'; // Если путь пустой, используем заглушку
  if (relativePath.startsWith('http')) return relativePath; // Если это внешний URL, возвращаем как есть
  return `${API_BASE_URL}${relativePath}`; // Для локальных путей добавляем базовый URL
};