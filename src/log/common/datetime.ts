export default class DateTime {
    private format;

    constructor(format: string = 'yyyy-MM-dd HH:mm:ss.sss') {
        this.format = format
    }
    public setFormat(format: string){
        this.format = format
    }
    public getFormat(){
        return this.format
    }
    public formatString(){
        return this.dateToObject(new Date()).format;
    }
    public yyyyMMdd(){
        return this.dateToObject(new Date()).yyyyMMdd
    }
    private padding(value){
        return value < 10 ? '0' + value : String(value)
    }
    public dateToObject(dateObject){
        let year = this.padding(dateObject.getFullYear())
        let month = this.padding(dateObject.getMonth() + 1)
        let date = this.padding(dateObject.getDate())
        let hours = this.padding(dateObject.getHours())
        let min = this.padding(dateObject.getMinutes())
        let sec = this.padding(dateObject.getSeconds())
        let msc = this.padding(dateObject.getMilliseconds())

        let message = this.format;
        message = message.replace('yyyy', year)
        message = message.replace('MM', month)
        message = message.replace('dd', date)
        message = message.replace('HH', hours)
        message = message.replace('mm', min)
        message = message.replace('ss', sec)
        message = message.replace('sss', msc)

        return {
            year : year,
            month : month,
            date : date,
            hours : hours,
            min : min,
            sec : sec,
            msc : msc,
            yyyyMMdd : year+month+date,
            HHmmss : hours+min+sec,
            format : message,
            dateObject : dateObject
        };
    }
}