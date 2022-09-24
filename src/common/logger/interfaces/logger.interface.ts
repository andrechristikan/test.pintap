import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from 'src/common/logger/constants/logger.enum.constant';
import { ENUM_REQUEST_METHOD } from 'src/common/request/constants/request.enum.constant';

export interface ILogger {
    action: ENUM_LOGGER_ACTION;
    description: string;
    user?: string;
    requestId?: string;
    method: ENUM_REQUEST_METHOD;
    path: string;
    role?: {
        _id: string;
    };
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export interface ILoggerRaw extends ILogger {
    level: ENUM_LOGGER_LEVEL;
}

export interface ILoggerOptions {
    description?: string;
    tags?: string[];
    level?: ENUM_LOGGER_LEVEL;
}
