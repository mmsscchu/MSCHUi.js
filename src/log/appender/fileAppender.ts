import DefaultAppender from "./appender";
import {LogLevel} from "../setting/logLevels";
import {FileAppenderOption} from "../setting/logOptions";
import ConstanceInfo from "../common/constantInfo";

export default class FileAppender extends DefaultAppender{
    private fileLoggerName: string
    private storage: Storage;
    private dateChecker: number = -1;

    constructor(loggerName : string, appenderOption : FileAppenderOption) {
        super(loggerName, appenderOption);

        this.storage = window.localStorage;
        this.fileLoggerName = this.createFileLoggerName();

        if(!this.storage){
            throw new Error('Not available in your browser :' + navigator.userAgent);
        }
        this.dateCheckInterval(()=>{
            this.fileLoggerName = this.createFileLoggerName();
        })
    }
    private createFileLoggerName(){
       return `${ConstanceInfo.NAME}_${this._loggerName}_${this._dateTime.yyyyMMdd()}`;
    }
    private dateCheckInterval(callback: Function){
        dateChecker.call(this);

        function dateChecker(beforeDateTime = this._dateTime.dateToObject(new Date())){ /* 시간기준으로 인터벌 생성 */
            const LIMIT_HOUR = 23;
            const LIMIT_MIN = 59;

            let limitFlag = {
                hour : false,
                min : false
            }
            let intervalGap;
            let currentDateTime = this._dateTime.dateToObject(new Date())

            if(beforeDateTime.yyyyMMdd !== currentDateTime.yyyyMMdd){
                callback(currentDateTime.yyyyMMdd);
            }

            if(currentDateTime.hours < LIMIT_HOUR){
                intervalGap = 1000 * 60 * 60;
                limitFlag.hour = true;
                console.log(currentDateTime.yyyyMMdd + ' ' + currentDateTime.HHmmss + ' -> ' + 'next : +' +intervalGap);
            }else if(!limitFlag.hour && currentDateTime.min < LIMIT_MIN){
                intervalGap = 1000 * 60;
                limitFlag.min = true;
                console.log(currentDateTime.yyyyMMdd + ' ' + currentDateTime.HHmmss + ' -> ' + 'next : +' +intervalGap);
            }else if(!limitFlag.min){
                intervalGap = 1000;
                console.log(currentDateTime.yyyyMMdd + ' ' + currentDateTime.HHmmss + ' -> ' + 'next : +' +intervalGap);
            }

            console.log(currentDateTime.dateObject);
            let nextDate = currentDateTime.dateObject;
            nextDate.setMilliseconds(nextDate.getMilliseconds() + intervalGap);
            let nextDateObject = this._dateTime.dateToObject(nextDate)
            console.log('next time : ' + nextDateObject.yyyyMMdd + ' ' + nextDateObject.HHmmss)

            this.dateChecker = setTimeout(()=>{
                dateChecker(currentDateTime)
            }, intervalGap)
        }
    }
    private write(message){
        let data = this.storage.getItem(this.fileLoggerName);
        this.storage.setItem(this.fileLoggerName, `${data ? data : ''}\r\n${message}`)
    }

    public print(logLevel: LogLevel, message: string, ...args: any[]): void {
        let loggerName = this._loggerName;
        let dateString : string = this._dateTime.formatString()
        let stackString : string = this._stack.getStackData();
        let logMessage : string = `[${dateString}][${logLevel.text}][${loggerName}] ${message}\n${stackString}`

        this.write(logMessage)
    }

    public destroy(){
        clearTimeout(this.dateChecker);
    }
    public clear(){

    }
    public clearAll(){

    }
}