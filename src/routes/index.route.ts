import {Router} from 'express';
import auth from '@routes/auth.route';
import company from '@routes/company.route';
import country from '@routes/country.route';

const router = Router();

router.use('/auth', auth);
router.use('/country', country);
router.use('/company', company);

export default router;
