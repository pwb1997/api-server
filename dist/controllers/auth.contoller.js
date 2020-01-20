"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@models/user.model"));
const bcrypt_utility_1 = require("@utilities/bcrypt.utility");
exports.startSession = async (req, res) => {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.regenerate(() => { });
    const { username, password } = req.query;
    if (!username || !password)
        return res.sendStatus(400);
    const user = await user_model_1.default.findOne({ where: { username: username } });
    if (!user || !await bcrypt_utility_1.bCompare(password, user.password))
        return res.sendStatus(401);
    req.session.userId = user.id;
    return res.sendStatus(200);
};
exports.endSession = async (req, res) => {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(() => { });
    return res.sendStatus(200);
};
exports.validateSession = async (req, res) => {
    const userId = req.session.userId;
    if (!userId || !await user_model_1.default.findOne(userId))
        return res.sendStatus(401);
    return res.sendStatus(200);
};
