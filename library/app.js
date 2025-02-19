const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Cargar rutas
const routes = require('./routes/libroRoutes');

// Configurar el motor de plantillas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas definidas en routes.js
app.use(routes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
