import { Router } from 'express';

const router = Router();

// Example route
router.get('/', (req, res) => {
  res.json({ 
    message: 'API Routes',
    version: '1.0.0'
  });
});

export default router;
