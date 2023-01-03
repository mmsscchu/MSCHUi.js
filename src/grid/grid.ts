import {GridOptions} from "./setting/gridOptions";
import GlobalVariable from "../common/globalVariable";
import Util from "../common/util";
import "./style.css";
import GridTable from "./component/gridTable";
import GridEvent from "./gridEvent";

export default class Grid{
    private gridClassNames = {
        area : {
            container : `${GlobalVariable.GRID_PREFIX}-container`,
            pagination : `${GlobalVariable.GRID_PREFIX}-pagination`,
            scroll : `${GlobalVariable.GRID_PREFIX}-scroll`,
        },
        content : {

        }
    }

    public options : GridOptions
    private event: GridEvent;
    private table: GridTable;

    private gridTable;
    private gridDatasetName;

    private elements = {
        area : {
            container : null,
            content : null,
            pagination : null,
            scroll : null
        },
    }

    constructor(gridOption : GridOptions) {
        const _SELF = this;

        this.event = new GridEvent();

        this.options = new Proxy(
            gridOption,
            {
                get(target, key, receiver) {
                    const res = Reflect.get(target, key, receiver);
                    // track(target, key);

                    return res;
                },
                set(target, key, value, receiver) {
                    const oldValue = target[key];
                    const res = Reflect.set(target, key, value, receiver);

                    if (oldValue !== res) {
                        _SELF.event.CALL_OPTIONS_CHANGE(res)
                        // trigger(target, key, value, oldValue);
                    }
                    return res;
                }
            }
        )
        _SELF.event.CALL_OPTIONS_BIND(this.options);

        this.gridDatasetName = `${GlobalVariable.GRID_DATASET_NAME}`//-${Util.random()}`

        this.create();

        console.log(this.options)

    }

    private validate(){
        if(!this.options.container){
            throw new Error('\'container\' option is required')
        }
    }
    private parse(){}

    private create(){
        this.table = new GridTable(this.options, this.event);

        let fragment = document.createDocumentFragment();
        let target = this.options.container
        let area = this.elements.area;

        area.container = document.createElement('div')
        area.pagination = document.createElement('div');
        area.scroll = document.createElement('div');

        area.container.className = this.gridClassNames.area.container;
        area.pagination.className = this.gridClassNames.area.pagination;
        area.scroll.className = this.gridClassNames.area.scroll;

        area.container.appendChild(this.table.element)
        area.container.appendChild(area.pagination)
        area.container.appendChild(area.scroll)

        target.appendChild(area.container);

        Util.sign(area.container)

        this.event.CALL_GRID_CREATE(null, this)
    }



    public destroy(){

    }

    public refresh(){

    }

    private createRow(){}
    private createColumn(){}

    private updateRow(){}
    private updateColumn(){}


    public setOptions(options: GridOptions){
        for(let optionKey in options){
           this.options[optionKey] = options[optionKey];
        }

        console.log(this.options)
    }

    public on(eventName, callback){
        this.event.on(eventName, callback)
    }
    public off(eventName, callback){
        this.event.off(eventName, callback)
    }
}