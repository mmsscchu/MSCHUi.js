export default class Events{
    private _events = {};

    public dispatch(eventName, data){
        if(this._events[eventName]){
            this._events[eventName].forEach(callback => {
                callback(data)
            })
        }
    }
    public on(eventName, callback){
        if(!this._events[eventName]){
            this._events[eventName] = [];
        }
        this._events[eventName].push(callback)
    }
    public addEventListener(eventName, callback){
        this.on(eventName, callback);
    }
    public off(eventName, callback){
        if(this._events[eventName] && Array.isArray(this._events[eventName])){
            this._events[eventName].splice(this._events[eventName].indexOf(callback), 1);
        }
        if(this._events[eventName].length === 0){
            delete this._events[eventName];
        }
    }
    public removeEventListener(eventName, callback){
        this.off(eventName, callback);
    }
}