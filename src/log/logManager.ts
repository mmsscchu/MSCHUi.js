import Log from "./log";
import {LogOptions} from "./setting/logOptions";

export default class LogManager {
    private _loggers = {} as {key: string, logger: Log}

    constructor() {

    }
    getLogger(loggerName : string = location.pathname, options? : LogOptions){
        loggerName = this.loggerNameValidate(loggerName);
        let logger = this._loggers[loggerName]
        if(!logger){
            logger = this._loggers[loggerName] = new Log(loggerName, options)
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