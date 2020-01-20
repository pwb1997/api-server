import {createLogger, format, transports} from 'winston';
const {colorize, combine, json, printf, timestamp} = format;
import path from 'path';

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../logs/combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
      format: combine(
          timestamp(),
          json(),
      ),
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../../logs/error.log'),
      maxsize: 5242880,
      maxFiles: 5,
      format: combine(
          timestamp(),
          json(),
      ),
    }),
    new transports.Console({
      format: format.combine(
          timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
          colorize(),
          printf((log) => `[${log.timestamp}] [${log.level}] ${log.message}`),
      ),
    }),
  ],
});

export default logger;
