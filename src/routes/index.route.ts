import {Router} from 'express';
import auth from '@routes/auth.route';
import company from '@routes/company.route';
import country from '@routes/country.route';
import user from '@routes/user.route';

const router = Router();

router.use('/auth', auth);
router.use('/country', country);
router.use('/company', company);
router.use('/user', user);

export default router;
