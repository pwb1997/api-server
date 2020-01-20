import {compare, hash} from 'bcryptjs';
import {security} from '@config/config.json';

export const bHash = async (password: string) => await hash(password, security.saltLength);
export const bCompare = async (password: string, hash: string) => await compare(password, hash);
