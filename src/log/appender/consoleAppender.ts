import DefaultAppender from "./appender";
import {LogLevel} from "../setting/logLevels";
import {ConsoleAppenderOption} from "../setting/logOptions";

class ConsoleAppender extends DefaultAppender{
    constructor(loggerName : string, appenderOption : ConsoleAppenderOption) {
        super(loggerName, appenderOption);
    }

    public print(logLevel: LogLevel, message: string, ...args: any[]){
        let loggerName = this._loggerName;
        let dateString : string = this._dateTime.formatString()
        let stackString : string = this._stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        if(this._appenderOption.color){
            console.log(`%c${logMessage}`, `color:${logLevel.color}`);
        }else{
            console.log(logMessage)
        }
    }
    public destroy(){

    }
}

export default ConsoleAppender;