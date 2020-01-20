"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_model_1 = __importDefault(require("@models/company.model"));
const typeorm_1 = require("typeorm");
const permission_check_utility_1 = require("@utilities/permission-check.utility");
exports.getAll = async (req, res) => {
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    return res.send(await company_model_1.default.find());
};
exports.getId = async (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id)))
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    const company = await company_model_1.default.findOne(id);
    if (!company)
        return res.sendStatus(404);
    return res.send(company);
};
exports.updateId = async (req, res) => {
    const id = req.params.id;
    const name = req.query.name;
    if (isNaN(Number(id)) || !name)
        return res.sendStatus(400);
    if (!req.session || !req.session.userId || !await permission_check_utility_1.isAdmin(req.session.userId))
        return res.sendStatus(403);
    const company = await company_model_1.default.findOne(id);
    if (!company)
        return res.sendStatus(404);
    company.name = name;
    try {
        await company.save();
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
        .from(company_model_1.default)
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
    const company = new company_model_1.default();
    company.name = name;
    try {
        await company.save();
        return res.sendStatus(200);
    }
    catch {
        return res.sendStatus(409);
    }
};
