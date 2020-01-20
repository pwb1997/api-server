"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archive_model_1 = __importDefault(require("@models/archive.model"));
const company_model_1 = __importDefault(require("@models/company.model"));
const country_model_1 = __importDefault(require("@models/country.model"));
const price_type_model_1 = __importDefault(require("@models/price-type.model"));
const user_model_1 = __importDefault(require("@models/user.model"));
const user_group_model_1 = __importDefault(require("@models/user-group.model"));
const entities = [
    user_model_1.default,
    user_group_model_1.default,
    company_model_1.default,
    country_model_1.default,
    archive_model_1.default,
    price_type_model_1.default,
];
exports.default = entities;
