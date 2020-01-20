import {endSession, startSession, validateSession} from '@controllers/auth.contoller';
import {Router} from 'express';

const auth = Router();

auth.post('/login', startSession);
auth.get('/logout', endSession);
auth.get('/check', validateSession);

export default auth;
