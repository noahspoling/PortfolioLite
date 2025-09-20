import express, { Request, Response } from 'express';

const router = express.Router();

type ViewData = Record<string, unknown>;

function renderWithNavbar(
  res: Response,
  currentPage: string,
  contentPartial: string,
  data: ViewData = {}
) {
  res.render('partials/page_with_navbar', {
    currentPage,
    contentPartial: `../${contentPartial}`,
    ...data
  });
}

router.get('/home', (req: Request, res: Response) => {
  if (req.get('HX-Request')) {
    renderWithNavbar(res, 'home', 'page/home');
  } else {
    res.render('index', { currentPage: 'home' });
  }
});

router.get('/projects', (req: Request, res: Response) => {
  if (req.get('HX-Request')) {
    renderWithNavbar(res, 'projects', 'page/projects');
  } else {
    res.render('index', { currentPage: 'projects' });
  }
});

router.get('/work_experience', (req: Request, res: Response) => {
  if (req.get('HX-Request')) {
    renderWithNavbar(res, 'work_experience', 'page/work_experience');
  } else {
    res.render('index', { currentPage: 'work_experience' });
  }
});

router.get('/repositories', async (_req: Request, res: Response) => {
  let repos: unknown[] = [];
  try {
    const response = await fetch('https://api.github.com/users/noahspoling/repos');
    if (response.ok) {
      repos = await response.json();
    }
  } catch (e) {
    console.error('Error fetching repositories:', e);
  }
  if (_req.get('HX-Request')) {
    renderWithNavbar(res, 'repositories', 'page/repositories', { repos });
  } else {
    res.render('index', { currentPage: 'repositories', repos });
  }
});

router.use((_req: Request, res: Response) => {
  res.status(404).render('404');
});

export default router;