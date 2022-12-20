import Events from "../common/events";

export default class GridEvent{
    private event;
    private EVENT = {
        OPTIONS_BIND : 'options.bind',
        OPTIONS_CHANGE : 'options.change',

        GRID_UPDATE : 'grid.update',
        GRID_CREATE : 'grid.create',
        GRID_CLICK: 'grid.click',

        GRID_SORT: 'grid.sort',
        GRID_ROW_RESIZE: 'grid.row.resize',
        GRID_COLUMN_RESIZE: 'grid.column.resize'

    }
    constructor() {
        this.event = new Events();
    }
    public CALL_OPTIONS_BIND(event, data?){
        this.event.dispatch(this.EVENT.OPTIONS_BIND, event, data);
    }
    public CALL_OPTIONS_CHANGE(event, data?){
        this.event.dispatch(this.EVENT.OPTIONS_CHANGE, event, data);
    }

    public CALL_GRID_UPDATE(event, data?){
        this.event.dispatch(this.EVENT.GRID_UPDATE, event, data);
    }
    public CALL_GRID_CREATE(event, data?){
        this.event.dispatch(this.EVENT.GRID_CREATE, event, data);
    }

    //CLICK EVENT

    public CALL_GRID_CLICK(event, data?){
        this.event.dispatch(this.EVENT.GRID_CLICK, event, data);
    }

    public CALL_SORT(event, data?){
        this.event.dispatch(this.EVENT.GRID_SORT, event, data);
    }
    public CALL_ROW_RESIZE(event, data?){
        this.event.dispatch(this.EVENT.GRID_ROW_RESIZE, event, data);
    }
    public CALL_COLUMN_RESIZE(event, data?){
        this.event.dispatch(this.EVENT.GRID_COLUMN_RESIZE, event, data);
    }
    public on(eventName, callback){
        this.event.on(eventName, callback)
    }
    public off(eventName, callback){
        this.event.off(eventName, callback)
    }
}