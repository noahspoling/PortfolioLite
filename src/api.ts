import express from 'express';
import path from 'path';
import pageRouter from './page_router.js';

// Always resolve from project root so views/static are found after build
const root = process.cwd();
const viewsDir = path.join(root, 'src', 'views');
const publicDir = path.join(root, 'src', 'public');

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Static
app.use(express.static(publicDir));

// Views
app.set('views', viewsDir);
app.set('view engine', 'ejs');

// Routes
app.use('/page', pageRouter);

app.get('/', (_req, res) => {
  res.render('index', { currentPage: 'home' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Views dir: ${viewsDir}`);
});