import {Request, Response} from 'express';
import Company from '@models/company.model';
import {getConnection} from 'typeorm';
import {isAdmin} from '@utilities/permission-check.utility';

export const getAll = async (req: Request, res: Response) => {
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  return res.send(await Company.find());
};

export const getId = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const company = await Company.findOne(id);
  if (!company) return res.sendStatus(404);
  return res.send(company);
};

export const updateId = async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.query.name;
  if (isNaN(Number(id)) || !name) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const company = await Company.findOne(id);
  if (!company) return res.sendStatus(404);
  company!.name = name;
  try {
    await company!.save();
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
      .from(Company)
      .where('id = :id', {id: id})
      .execute();
  res.sendStatus(200);
};

export const add = async (req: Request, res: Response) => {
  const name = req.query.name;
  if (!name) return res.sendStatus(400);
  if (!req.session || !req.session.userId || !await isAdmin(req.session.userId)) return res.sendStatus(403);
  const company = new Company();
  company.name = name;
  try {
    await company!.save();
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(409);
  }
};
