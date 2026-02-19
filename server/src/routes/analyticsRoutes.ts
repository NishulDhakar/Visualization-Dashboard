import { Router } from 'express';
import {
    getIntensityByRegion,
    getLikelihoodByCountry,
    getRelevanceByYear,
} from '../controllers/dataController';

const router = Router();

router.get('/intensity-by-region', getIntensityByRegion);
router.get('/likelihood-by-country', getLikelihoodByCountry);
router.get('/relevance-by-year', getRelevanceByYear);

export default router;
