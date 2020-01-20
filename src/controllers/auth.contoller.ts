import {Request, Response} from 'express';
import User from '@models/user.model';
import {bCompare} from '@utilities/bcrypt.utility';

export const startSession = async (req: Request, res: Response) => {
  req.session?.regenerate(() => {});
  const {username, password} = req.query;
  if (!username || !password) return res.sendStatus(400);
  const user = await User.findOne({where: {username: username}});
  if (!user || !await bCompare(password, user.password)) return res.sendStatus(401);
  req.session!.userId = user.id;
  return res.sendStatus(200);
};

export const endSession = async (req: Request, res: Response) => {
  req.session?.destroy(() => {});
  return res.sendStatus(200);
};

export const validateSession = async (req: Request, res: Response) => {
  const userId = req.session!.userId;
  if (!userId || !await User.findOne(userId)) return res.sendStatus(401);
  return res.sendStatus(200);
};
