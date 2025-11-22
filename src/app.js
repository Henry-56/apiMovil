const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// importing routes
const authRoutes = require('./routes/auth.routes');
const diaryRoutes = require('./routes/diary.routes');
const practicesRoutes = require('./routes/practices.routes');
const assessmentsRoutes = require('./routes/assessments.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');
const reportsRoutes = require('./routes/reports.routes');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/diary', diaryRoutes);
app.use('/practices', practicesRoutes);
app.use('/assessments', assessmentsRoutes);
app.use('/suggestions', suggestionsRoutes);
app.use('/reports', reportsRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

module.exports = app;
