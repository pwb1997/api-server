"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_controller_1 = require("@controllers/company.controller");
const express_1 = require("express");
const company = express_1.Router();
company.get('/', company_controller_1.getAll);
company.get('/:id', company_controller_1.getId);
company.put('/:id', company_controller_1.updateId);
company.delete('/:id', company_controller_1.deleteId);
company.post('/', company_controller_1.add);
exports.default = company;
