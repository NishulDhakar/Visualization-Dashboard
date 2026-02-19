import { Router } from 'express';
import { getData } from '../controllers/dataController';

const router = Router();

router.get('/', getData);

export default router;
