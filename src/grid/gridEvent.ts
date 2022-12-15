import Events from "../common/events";

export default class GridEvent{
    private event;
    private EVENT = {
        OPTIONS_BIND : 'options.bind',
        OPTIONS_CHANGE : 'options.change',

        GRID_UPDATE : 'grid.update',
        GRID_CREATE : 'grid.create',
        GRID_CLICK: 'grid.click',

    }
    constructor() {
        this.event = new Events();
    }
    public CALL_OPTIONS_BIND(data?){
        this.event.dispatch(this.EVENT.OPTIONS_BIND, data);
    }
    public CALL_OPTIONS_CHANGE(data?){
        this.event.dispatch(this.EVENT.OPTIONS_CHANGE, data);
    }

    public CALL_GRID_UPDATE(data?){
        this.event.dispatch(this.EVENT.GRID_UPDATE, data);
    }
    public CALL_GRID_CREATE(data?){
        this.event.dispatch(this.EVENT.GRID_CREATE, data);
    }

    //CLICK EVENT

    public CALL_GRID_CLICK(data?){
        this.event.dispatch(this.EVENT.GRID_CLICK, data)
    }

    public on(eventName, callback){
        this.event.on(eventName, callback)
    }
    public off(eventName, callback){
        this.event.off(eventName, callback)
    }
}