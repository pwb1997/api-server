"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_utility_1 = require("@utilities/bcrypt.utility");
const user_model_1 = __importDefault(require("@models/user.model"));
const typeorm_1 = require("typeorm");
const permission_check_utility_1 = require("@utilities/permission-check.utility");
exports.getAll = async (req, res) => {
    const sessionUid = req.session.userId;
    if (!await permission_check_utility_1.isAdmin(sessionUid))
        return res.sendStatus(403);
    return res.send(await user_model_1.default.find({ relations: ['userGroup'] }));
};
exports.getId = async (req, res) => {
    const sessionUid = req.session.userId;
    const id = Number(req.params.id);
    if (isNaN(id))
        return res.sendStatus(400);
    if (!await permission_check_utility_1.isAdmin(sessionUid) && id !== sessionUid)
        return res.sendStatus(403);
    try {
        res.send(await user_model_1.default.findOneOrFail(id, { relations: ['userGroup'] }));
    }
    catch {
        res.sendStatus(404);
    }
};
exports.updateId = async (req, res) => {
    const id = Number(req.params.id);
    const sessionUid = req.session.userId;
    const { username, newpassword, oldpassword } = req.query;
    let userGroup = req.query.usergroup;
    const update = [];
    if (!username && !newpassword && !userGroup || isNaN(id))
        return res.sendStatus(400);
    if (userGroup) {
        userGroup = userGroup === 'null' ? null : Number(userGroup);
        if (userGroup !== null && isNaN(userGroup))
            return res.sendStatus(400);
        if (!await permission_check_utility_1.isAdmin(sessionUid))
            return res.sendStatus(403);
        update.push(['userGroup', userGroup]);
    }
    if (username) {
        if (sessionUid !== id)
            return res.sendStatus(403);
        update.push(['username', username]);
    }
    if (newpassword) {
        if (!oldpassword || sessionUid !== id)
            return res.sendStatus(403);
        const user = await user_model_1.default.findOne(id);
        if (!user || !await bcrypt_utility_1.bCompare(oldpassword, user.password))
            return res.sendStatus(403);
        update.push(['password', await bcrypt_utility_1.bHash(newpassword)]);
    }
    try {
        await typeorm_1.getConnection()
            .createQueryBuilder()
            .update(user_model_1.default)
            .set(Object.fromEntries(update))
            .where('id = :id', { id })
            .execute();
        return res.sendStatus(200);
    }
    catch (err) {
        if (err.errno === 1062)
            return res.sendStatus(409);
        if (err.errno === 1452)
            return res.sendStatus(406);
        return res.sendStatus(400);
    }
};
exports.add = async (req, res) => {
    const sessionUid = req.session.userId;
    const { username, password } = req.query;
    let userGroup = req.query.usergroup;
    if (!username || !password || !userGroup)
        return res.sendStatus(400);
    if (!await permission_check_utility_1.isAdmin(sessionUid))
        return res.sendStatus(403);
    userGroup = userGroup === 'null' ? null : Number(userGroup);
    if (userGroup !== null && isNaN(userGroup))
        return res.sendStatus(400);
    const user = new user_model_1.default();
    user.username = username;
    user.password = await bcrypt_utility_1.bHash(password);
    user.userGroup = userGroup;
    try {
        await user.save();
        res.sendStatus(200);
    }
    catch (err) {
        if (err.errno === 1062)
            return res.sendStatus(409);
        if (err.errno === 1452)
            return res.sendStatus(406);
        return res.sendStatus(400);
    }
};
