import {Request, Response} from 'express';
import {bCompare, bHash} from '@utilities/bcrypt.utility';
import PriceType from '@models/price-type.model';
import {getConnection} from 'typeorm';
import {isAdmin} from '@utilities/permission-check.utility';

export const getAll = async (req: Request, res: Response) => {
  const sessionUid = req.session!.userId;
  if (!await isAdmin(sessionUid)) return res.sendStatus(403);
  return res.send(await PriceType.find());
};

export const getId = async (req: Request, res: Response) => {

};

export const updateId = async (req: Request, res: Response) => {

};

export const add = async (req: Request, res: Response) => {

};

export const deleteId = async (req: Request, res: Response) => {

};
