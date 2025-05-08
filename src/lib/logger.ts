import fs from 'fs'
import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const isDocker = fs.existsSync('/.dockerenv')

const logDir = isDocker ? '/app/logs' : path.resolve('logs')

const logger = createLogger({
  level: 'info',
  defaultMeta: {
    service: 'lab',
    env: process.env.NODE_ENV,
    pid: process.pid,
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.json(),
    //   format.printf(
    //     ({ timestamp, level, message }) =>
    //       `[${timestamp}] [${level.toUpperCase()}] ${message}`,
    //   ),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(logDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
      maxFiles: '30d',
      zippedArchive: false,
      auditFile: path.join(logDir, 'audit.json'),
    }),
  ],
})

export default logger
