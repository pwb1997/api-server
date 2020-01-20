"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const country_model_1 = __importDefault(require("@models/country.model"));
const typeorm_1 = require("typeorm");
const permission_check_utility_1 = require("@utilities/permission-check.utility");
exports.getAll = async (req, res) => {
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    return res.send(await country_model_1.default.find());
};
exports.getId = async (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id)))
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    const country = await country_model_1.default.findOne(id);
    if (!country)
        return res.sendStatus(404);
    return res.send(country);
};
exports.updateId = async (req, res) => {
    const id = req.params.id;
    const name = req.query.name;
    if (isNaN(Number(id)) || !name)
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    const country = await country_model_1.default.findOne(id);
    if (!country)
        return res.sendStatus(404);
    country.name = name;
    try {
        await country.save();
        return res.sendStatus(200);
    }
    catch {
        return res.sendStatus(409);
    }
};
exports.deleteId = async (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id)))
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    await typeorm_1.getConnection()
        .createQueryBuilder()
        .delete()
        .from(country_model_1.default)
        .where('id = :id', { id: id })
        .execute();
    res.sendStatus(200);
};
exports.add = async (req, res) => {
    const name = req.query.name;
    if (!name)
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    const country = new country_model_1.default();
    country.name = name;
    try {
        await country.save();
        return res.sendStatus(200);
    }
    catch {
        return res.sendStatus(409);
    }
};
