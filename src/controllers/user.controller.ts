import {Request, Response} from 'express';
import {bCompare, bHash} from '@utilities/bcrypt.utility';
import User from '@models/user.model';
import {getConnection} from 'typeorm';
import {isAdmin} from '@utilities/permission-check.utility';

export const getAll = async (req: Request, res: Response) => {
  const sessionUid = req.session!.userId;
  if (!await isAdmin(sessionUid)) return res.sendStatus(403);
  return res.send(await User.find({relations: ['userGroup']}));
};

export const getId = async (req: Request, res: Response) => {
  const sessionUid = req.session!.userId;
  const id = Number(req.params.id);
  if (isNaN(id)) return res.sendStatus(400);
  if (!await isAdmin(sessionUid) && id !== sessionUid) return res.sendStatus(403);
  try {
    res.send(await User.findOneOrFail(id, {relations: ['userGroup']}));
  } catch {
    res.sendStatus(404);
  }
};

export const updateId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sessionUid = req.session!.userId;
  const {username, newpassword, oldpassword} = req.query;
  let userGroup = req.query.usergroup;
  const update = [];
  if (!username && !newpassword && !userGroup || isNaN(id)) return res.sendStatus(400);
  if (userGroup) {
    userGroup = userGroup === 'null' ? null:Number(userGroup);
    if (userGroup !== null && isNaN(userGroup)) return res.sendStatus(400);
    if (!await isAdmin(sessionUid)) return res.sendStatus(403);
    update.push(['userGroup', userGroup]);
  }
  if (username) {
    if (sessionUid !== id) return res.sendStatus(403);
    update.push(['username', username]);
  }
  if (newpassword) {
    if (!oldpassword || sessionUid !== id) return res.sendStatus(403);
    const user = await User.findOne(id);
    if (!user || !await bCompare(oldpassword, user.password)) return res.sendStatus(403);
    update.push(['password', await bHash(newpassword)]);
  }
  try {
    await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(Object.fromEntries(update))
        .where('id = :id', {id})
        .execute();
    return res.sendStatus(200);
  } catch (err) {
    if (err.errno === 1062) return res.sendStatus(409);
    if (err.errno === 1452) return res.sendStatus(406);
    return res.sendStatus(400);
  }
};

export const add = async (req: Request, res: Response) => {
  const sessionUid = req.session!.userId;
  const {username, password} = req.query;
  let userGroup = req.query.usergroup;
  if (!username || !password || !userGroup) return res.sendStatus(400);
  if (!await isAdmin(sessionUid)) return res.sendStatus(403);
  userGroup = userGroup === 'null' ? null:Number(userGroup);
  if (userGroup !== null && isNaN(userGroup)) return res.sendStatus(400);
  const user = new User();
  user.username = username;
  user.password = await bHash(password);
  user.userGroup = userGroup;
  try {
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    if (err.errno === 1062) return res.sendStatus(409);
    if (err.errno === 1452) return res.sendStatus(406);
    return res.sendStatus(400);
  }
};

export const deleteId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sessionUid = req.session!.userId;
  if (isNaN(id)) return res.sendStatus(400);
  if (!await isAdmin(sessionUid)) return res.sendStatus(403);
  await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', {id})
      .execute();
  res.sendStatus(200);
};
