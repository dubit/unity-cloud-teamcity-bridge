const { createLogger, format, transports } = require('winston');

const {
  combine,
  timestamp,
  colorize,
  printf,
} = format;

const logFormat = printf(log => `${log.timestamp} ${log.level}: ${log.message}`);

// NOTE: (Stefan) Currently this logger by default only runs the console
// transport. Winston accepts transports such as file/tcp/udp. We can enable
// these if needed.
function loggerFactory() {
  return createLogger({
    level: process.env.LOGGER_LEVEL || 'debug',
    format: combine(
      colorize(),
      timestamp(),
      logFormat,
    ),
    transports: [
      new transports.Console(),
    ],
  });
}

module.exports = loggerFactory;
