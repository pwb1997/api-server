"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const user_group_model_1 = __importStar(require("@models/user-group.model"));
const user_model_1 = __importDefault(require("@models/user.model"));
const bcrypt_utility_1 = require("@utilities/bcrypt.utility");
const typeorm_1 = require("typeorm");
const config_json_1 = require("@config/config.json");
const index_model_1 = __importDefault(require("@models/index.model"));
const logger_utility_1 = __importDefault(require("@utilities/logger.utility"));
exports.connect = async () => {
    try {
        await typeorm_1.createConnection({
            type: 'mysql',
            host: config_json_1.database.host,
            port: config_json_1.database.port,
            username: config_json_1.database.username,
            password: config_json_1.database.password,
            database: config_json_1.database.database,
            entities: index_model_1.default,
            logging: false,
            synchronize: true,
            dropSchema: true,
        });
        logger_utility_1.default.info(`database connected at ${config_json_1.database.host}:${config_json_1.database.port}`);
    }
    catch {
        logger_utility_1.default.error(`database connection denied at ${config_json_1.database.host}:${config_json_1.database.port}, exiting`);
        process.exit();
    }
};
exports.initAdmin = async () => {
    let admin;
    let adminGroup;
    admin = await user_model_1.default.findOne({ username: 'admin' });
    adminGroup = await user_group_model_1.default.findOne({ name: 'admin' });
    logger_utility_1.default.info('initial check started');
    if (!admin || !adminGroup) {
        if (!adminGroup) {
            adminGroup = new user_group_model_1.default();
            adminGroup.name = 'admin';
            adminGroup.type = user_group_model_1.UserGroupType.ADMIN;
            await adminGroup.save();
            logger_utility_1.default.info('initialized userGroup: admin');
        }
        if (!admin) {
            admin = new user_model_1.default();
            admin.username = 'admin';
            admin.password = await bcrypt_utility_1.bHash('admin');
            admin.userGroup = adminGroup;
            await admin.save();
            logger_utility_1.default.info('initialized user: admin (password: admin)');
            logger_utility_1.default.info('granted all privileges to admin');
        }
    }
    logger_utility_1.default.info('database ready');
};
