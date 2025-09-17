import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pageRouter from './page_router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use the page router for handling routes
app.use('/page', pageRouter);

// Main route
app.get('/', (req, res) => {
  res.render('index', { currentPage: 'home' });
});

// Example htmx endpoint
// app.get('/about', (req, res) => {
//   res.render('about-partial', { currentPage: 'about' });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
