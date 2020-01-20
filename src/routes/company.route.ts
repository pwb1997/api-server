import {add, deleteId, getAll, getId, updateId} from '@controllers/company.controller';
import {Router} from 'express';

const company = Router();

company.get('/', getAll);
company.get('/:id', getId);
company.put('/:id', updateId);
company.delete('/:id', deleteId);
company.post('/', add);

export default company;
