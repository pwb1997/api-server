"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@models/user.model"));
const user_group_model_1 = require("@models/user-group.model");
exports.isAdmin = async (id) => {
    const user = await user_model_1.default.findOne({ where: { id: id }, relations: ['userGroup'] });
    if (user && user.userGroup && user.userGroup.type === user_group_model_1.UserGroupType.ADMIN)
        return true;
    return false;
};
