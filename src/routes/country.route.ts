import {add, deleteId, getAll, getId, updateId} from '@controllers/country.controller';
import {Router} from 'express';

const country = Router();

country.get('/', getAll);
country.get('/:id', getId);
country.put('/:id', updateId);
country.delete('/:id', deleteId);
country.post('/', add);

export default country;
