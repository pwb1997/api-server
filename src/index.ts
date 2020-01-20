import 'module-alias/register';
import {connect as dbConn, initAdmin} from '@utilities/database.utility';
import {security, server} from '@config/config.json';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import logger from '@utilities/logger.utility';
import morgan from 'morgan';
import path from 'path';
import router from '@routes/index.route';
import session from 'express-session';
import url from 'url';

const app = express();

// security
app.use(helmet());
app.enable('trust proxy');

// logging
morgan.token('url', (req) => <string>url.parse(req.originalUrl).pathname);
morgan.token('user', (req) => (req.session && req.session.userId)?`uid${req.session.userId}`:'guest');

app.use(morgan(
    ':user@:remote-addr :method :url :status :response-time ms',
    {stream: {write: (message: string) => logger.info(message.trim())}},
));

// session
app.use(session({
  secret: security.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
  },
}));

// body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routing
app.use('/', router);

// connect to database and start server
const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '../keys/localhost.crt')),
}, app);

async function startServer() {
  await dbConn();
  await initAdmin();
  httpsServer.listen(server.port, () => logger.info(`server listening port ${server.port}`));
}

startServer();
