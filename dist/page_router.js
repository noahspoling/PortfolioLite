import express from 'express';
const router = express.Router();
function renderWithNavbar(res, currentPage, contentPartial, data = {}) {
    res.render('partials/page_with_navbar', {
        currentPage,
        contentPartial: `../${contentPartial}`,
        ...data
    });
}
router.get('/home', (req, res) => {
    if (req.get('HX-Request')) {
        renderWithNavbar(res, 'home', 'page/home');
    }
    else {
        res.render('index', { currentPage: 'home' });
    }
});
router.get('/projects', (req, res) => {
    if (req.get('HX-Request')) {
        renderWithNavbar(res, 'projects', 'page/projects');
    }
    else {
        res.render('index', { currentPage: 'projects' });
    }
});
router.get('/work_experience', (req, res) => {
    if (req.get('HX-Request')) {
        renderWithNavbar(res, 'work_experience', 'page/work_experience');
    }
    else {
        res.render('index', { currentPage: 'work_experience' });
    }
});
router.get('/repositories', async (_req, res) => {
    let repos = [];
    try {
        const response = await fetch('https://api.github.com/users/noahspoling/repos');
        if (response.ok) {
            repos = await response.json();
        }
    }
    catch (e) {
        console.error('Error fetching repositories:', e);
    }
    if (_req.get('HX-Request')) {
        renderWithNavbar(res, 'repositories', 'page/repositories', { repos });
    }
    else {
        res.render('index', { currentPage: 'repositories', repos });
    }
});
// 404 handler
router.use((_req, res) => {
    res.status(404).render('404');
});
export default router;
