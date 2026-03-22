import express from 'express';
import { indexRepository, askQuestion } from '../controllers/repoController.js';

const router = express.Router();

router.post('/index', indexRepository);
router.post('/query', askQuestion);

export default router;
