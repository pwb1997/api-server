import {Router} from 'express';
import auth from './auth.route';
import company from './company.route';
import country from './country.route';
import priceType from './price-type.route';
import user from './user.route';

const router = Router();

router.use('/auth', auth);
router.use('/country', country);
router.use('/company', company);
router.use('/user', user);
router.use('/price_type', priceType);

export default router;
