const express = require('express');
const path = require('path');
const app = express();

// Статические файлы из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Маршрут для доступа к папке uploads из бэкенда
app.use('/uploads', express.static('/home/gtr/Рабочий стол/kursProj/back/uploads'));

// Все остальные GET-запросы отправляем на index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
