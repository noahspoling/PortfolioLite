import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pageRouter from './page_router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/page', pageRouter);

app.get('/', (_req, res) => {
  res.render('index', { currentPage: 'home' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});