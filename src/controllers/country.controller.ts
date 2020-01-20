import {Request, Response} from 'express';
import Country from '@models/country.model';
import {getConnection} from 'typeorm';
import {isAdmin} from '@utilities/permission-check.utility';

export const getAll = async (req: Request, res: Response) => {
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  return res.send(await Country.find());
};

export const getId = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const country = await Country.findOne(id);
  if (!country) return res.sendStatus(404);
  return res.send(country);
};

export const updateId = async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.query.name;
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

export const deleteId = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Country)
      .where('id = :id', {id: id})
      .execute();
  res.sendStatus(200);
};

export const add = async (req: Request, res: Response) => {
  const name = req.query.name;
  if (!name) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const country = new Country();
  country.name = name;
  try {
    await country!.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(409);
  }
};
