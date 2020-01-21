import {add, deleteId, getAll, getId, updateId} from '@controllers/user.controller';
import {Router} from 'express';

const user = Router();

user.get('/', getAll);
user.get('/:id', getId);
user.put('/:id', updateId);
user.post('/', add);
user.delete('/:id', deleteId);

export default user;
