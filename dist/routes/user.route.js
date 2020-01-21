"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@controllers/user.controller");
const express_1 = require("express");
const user = express_1.Router();
user.get('/', user_controller_1.getAll);
user.get('/:id', user_controller_1.getId);
user.put('/:id', user_controller_1.updateId);
user.post('/', user_controller_1.add);
exports.default = user;
