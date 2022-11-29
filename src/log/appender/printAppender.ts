import DefaultAppender from "./appender";
import {LogLevel} from "../setting/logLevels";
import {PrintAppenderOption} from "../setting/logOptions";
import ConstanceInfo from "../common/constantInfo";

export default class PrintAppender extends DefaultAppender{
    private printLoggerName: string
    private printLayout: Element

    constructor(loggerName : string, appenderOption : PrintAppenderOption) {
        super(loggerName, appenderOption);

       //this.printLayout = this.createPrintLayout();
    }
    private createPrintLayout(){
        let template = document.createElement('template');
        template.innerHTML = `
            <div class="msc-logger-print" id="${ConstanceInfo.NAME+'_'+this.printLoggerName}" name="${this.printLoggerName}">
                <div class="logger-print-util">
                    <div class="print-util-tools"></div>
                    <div class="print-util-filter"></div>
                </div>
                <div class="logger-print-logs"></div>
            </div>`

        return {
            write(){

            }
        }
    }

    public print(logLevel: LogLevel, message: string, ...args: any[]): void{
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