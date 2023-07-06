import pino from 'pino';
import pretty from 'pino-pretty';
import env from './env';

const { NEXT_PROD_LOGGER_LEVEL } = env;
const LOGGER_LEVEL = NEXT_PROD_LOGGER_LEVEL || 'info';

const logger = pino(pretty());
logger.level = process.env.NODE_ENV === 'production' ? LOGGER_LEVEL : 'debug';

export default logger;
