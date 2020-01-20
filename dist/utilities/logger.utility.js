"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { colorize, combine, json, printf, timestamp } = winston_1.format;
const path_1 = __importDefault(require("path"));
const logger = winston_1.createLogger({
    transports: [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, '../../logs/combined.log'),
            maxsize: 5242880,
            maxFiles: 5,
            format: combine(timestamp(), json()),
        }),
        new winston_1.transports.File({
            level: 'error',
            filename: path_1.default.join(__dirname, '../../logs/error.log'),
            maxsize: 5242880,
            maxFiles: 5,
            format: combine(timestamp(), json()),
        }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), printf((log) => `[${log.timestamp}] [${log.level}] ${log.message}`)),
        }),
    ],
});
exports.default = logger;
