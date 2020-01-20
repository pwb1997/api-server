"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_contoller_1 = require("@controllers/auth.contoller");
const express_1 = require("express");
const auth = express_1.Router();
auth.post('/login', auth_contoller_1.startSession);
auth.get('/logout', auth_contoller_1.endSession);
auth.get('/check', auth_contoller_1.validateSession);
exports.default = auth;
