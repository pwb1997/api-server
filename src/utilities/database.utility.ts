import 'reflect-metadata';
import UserGroup, {UserGroupType} from '@models/user-group.model';
import User from '@models/user.model';
import {bHash} from '@utilities/bcrypt.utility';
import {createConnection} from 'typeorm';
import {database as dbConf} from '@config/config.json';
import entities from '@models/index.model';
import logger from '@utilities/logger.utility';

export const connect = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: dbConf.host,
      port: dbConf.port,
      username: dbConf.username,
      password: dbConf.password,
      database: dbConf.database,
      entities: entities,
      logging: false,
      synchronize: true,
      dropSchema: true,
    });
    logger.info(`database connected at ${dbConf.host}:${dbConf.port}`);
  } catch (err) {
    console.log(err);
    logger.error(`database connection denied at ${dbConf.host}:${dbConf.port}, exiting`);
    process.exit();
  }
};

export const initAdmin = async () => {
  let admin;
  let adminGroup;
  admin = await User.findOne({username: 'admin'});
  adminGroup = await UserGroup.findOne({name: 'admin'});
  logger.info('initial check started');
  if (!admin || !adminGroup) {
    if (!adminGroup) {
      adminGroup = new UserGroup();
      adminGroup.name = 'admin';
      adminGroup.type = UserGroupType.ADMIN;
      await adminGroup.save();
      logger.info('initialized userGroup: admin');
    }
    if (!admin) {
      admin = new User();
      admin.username = 'admin';
      admin.password = await bHash('admin');
      admin.userGroup = adminGroup;
      await admin.save();
      logger.info('initialized user: admin (password: admin)');
      logger.info('granted all privileges to admin');
    }
  }
  logger.info('database ready');
};
