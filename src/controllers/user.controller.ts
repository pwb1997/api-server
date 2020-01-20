import {Request, Response} from 'express';
import User from '@models/user.model';
import {getConnection} from 'typeorm';
import {isAdmin} from '@utilities/permission-check.utility';

export const getAll = async (req: Request, res: Response) => {
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  return res.send(await User.find());
};

export const getId = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const user = await User.findOne(id);
  if (!user) return res.sendStatus(404);
  return res.send(user);
};

export const updateGroup = async (req: Request, res: Response) => {
  const id = req.params.id;
  const group = req.query.group;
  if (isNaN(Number(id)) || !name) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const country = await Country.findOne(id);
  if (!country) return res.sendStatus(404);
  country!.name = name;
  try {
    await country!.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(409);
  }
};

export const updatePassword = async (req: Request, res: Response) => {

};

