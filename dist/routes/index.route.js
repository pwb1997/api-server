"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("@routes/auth.route"));
const company_route_1 = __importDefault(require("@routes/company.route"));
const country_route_1 = __importDefault(require("@routes/country.route"));
const router = express_1.Router();
router.use('/auth', auth_route_1.default);
router.use('/country', country_route_1.default);
router.use('/company', company_route_1.default);
exports.default = router;
