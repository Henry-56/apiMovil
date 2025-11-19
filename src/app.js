const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Importando rutas
const practicasRoutes = require('./routes/practicas');
const emocionesRoutes = require('./routes/emociones');
const usuariosRoutes = require('./routes/usuarios');
const sugerenciasRoutes = require('./routes/sugerencias');

// Seteando views
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando rutas (todas trabajan con JSON)
app.use('/', practicasRoutes);
app.use('/', emocionesRoutes);
app.use('/', usuariosRoutes);
app.use('/', sugerenciasRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () =>
  console.log(`Example app listening on port ${app.get('port')}`)
);
