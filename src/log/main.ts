import LogManager from "./logManager";
import {LogOptions} from "./setting/logOptions";

export default class MSCHUiLog{
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
    private _loggerManager = new LogManager();

    getLogger(loggerName? : string, options? : LogOptions){
        options = Object.assign(this._defaultOptions, options);
        return this._loggerManager.getLogger(loggerName, options)
    }
    setOptions(options: object){
        this._defaultOptions = Object.assign(this._defaultOptions, options);
    }
}