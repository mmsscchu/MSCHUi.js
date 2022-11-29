import Logger from "./logger";
import LoggerManager from "./loggerManager";
import {LogOptions} from "./setting/logOptions";

export default class Log{
    private _defaultOptions: LogOptions = {
        level : 'INFO',
        color : false,
        appender : {
            console : {
                color : false,
                level : 'INFO'
            }
        }
    }
    private _loggerManager = new LoggerManager();

    getLogger(loggerName? : string, options? : LogOptions){
        options = Object.assign(this._defaultOptions, options);
        return this._loggerManager.getLogger(loggerName, options)
    }
    setOptions(options: object){
        this._defaultOptions = Object.assign(this._defaultOptions, options);
    }
}