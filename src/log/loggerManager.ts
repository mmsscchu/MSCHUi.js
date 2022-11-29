import Logger from "./logger";
import {LogOptions} from "./setting/logOptions";

export default class LoggerManager{
    private _loggers = {} as {key: string, logger: Logger}

    constructor() {

    }
    getLogger(loggerName : string = location.pathname, options? : LogOptions){
        loggerName = this.loggerNameValidate(loggerName);
        let logger = this._loggers[loggerName]
        if(!logger){
            logger = this._loggers[loggerName] = new Logger(loggerName, options)
        }
        return logger;
    }

    private loggerNameValidate(loggerName: string): string{
        if(loggerName==='undefined' || loggerName==='null' || loggerName===''){
            console.warn(`\'loggerName\' is unnamed. changed to default name : input value ['${loggerName}']`)
            return location.pathname;
        }else{
            return loggerName;
        }
    }
}