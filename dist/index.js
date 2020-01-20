"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const database_utility_1 = require("@utilities/database.utility");
const config_json_1 = require("@config/config.json");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const helmet_1 = __importDefault(require("helmet"));
const https_1 = __importDefault(require("https"));
const logger_utility_1 = __importDefault(require("@utilities/logger.utility"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const index_route_1 = __importDefault(require("@routes/index.route"));
const express_session_1 = __importDefault(require("express-session"));
const url_1 = __importDefault(require("url"));
const app = express_1.default();
app.use(helmet_1.default());
app.enable('trust proxy');
morgan_1.default.token('url', (req) => url_1.default.parse(req.originalUrl).pathname);
morgan_1.default.token('user', (req) => (req.session && req.session.userId) ? `uid${req.session.userId}` : 'guest');
app.use(morgan_1.default(':user@:remote-addr :method :url :status :response-time ms', { stream: { write: (message) => logger_utility_1.default.info(message.trim()) } }));
app.use(express_session_1.default({
    secret: config_json_1.security.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
    },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', index_route_1.default);
const httpsServer = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, '../keys/localhost.key')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, '../keys/localhost.crt')),
}, app);
async function startServer() {
    await database_utility_1.connect();
    await database_utility_1.initAdmin();
    httpsServer.listen(config_json_1.server.port, () => logger_utility_1.default.info(`server listening port ${config_json_1.server.port}`));
}
startServer();
