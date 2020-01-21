import {add, deleteId, getAll, getId, updateId} from '@controllers/price-type.controller';
import {Router} from 'express';

const priceType = Router();

priceType.get('/', getAll);
priceType.get('/:id', getId);
priceType.put('/:id', updateId);
priceType.post('/', add);
priceType.delete('/', deleteId);

export default priceType;
