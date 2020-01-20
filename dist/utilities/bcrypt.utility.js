"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const config_json_1 = require("@config/config.json");
exports.bHash = async (password) => await bcryptjs_1.hash(password, config_json_1.security.saltLength);
exports.bCompare = async (password, hash) => await bcryptjs_1.compare(password, hash);
