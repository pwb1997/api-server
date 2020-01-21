import {add, getAll, getId, updateId} from '@controllers/user.controller';
import {Router} from 'express';

const user = Router();

user.get('/', getAll);
user.get('/:id', getId);
user.put('/:id', updateId);
user.post('/', add);

export default user;
