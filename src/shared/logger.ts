// import path from 'path'
// import { createLogger, format, transports } from 'winston'
// import DailyRotateFile from 'winston-daily-rotate-file'
// const { combine, timestamp, label, printf, prettyPrint } = format

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp)
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//   return `${date.toDateString()} ${hour}: ${minute}:${second} [${label}] ${level}: ${message}`
// })
// const logger = createLogger({
//   level: 'info',
//   format: combine(label({ label: 'ph' }), timestamp(), myFormat, prettyPrint()),
//   transports: [
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'success',
//         'hpu-%DATE%-success.log'
//       ),
//       datePattern: 'YYYY-DD-MM-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),

//     new transports.Console(),
//   ],
// })

// const errorLogger = createLogger({
//   level: 'error',
//   format: combine(label({ label: 'ph' }), timestamp(), myFormat, prettyPrint()),
//   transports: [
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'winston',
//         'errors',
//         'phu-%DATE%-error.log'
//       ),
//       datePattern: 'YYYY-DD-MM-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//     new transports.Console(),
//   ],
// })

// export { logger, errorLogger }
