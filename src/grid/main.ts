import {LogOptions} from "../log/setting/logOptions";
import LogManager from "../log/logManager";
import Grid from "./grid";
import {GridOptions} from "./setting/gridOptions";
import GridManager from "./gridManager";
import Util from "../common/util";
import GlobalVariable from "../common/globalVariable";

export default class MSCHUiGrid{
    private _defaultOptions: GridOptions = {
        container : null,
        id : null,
        rows : {
            headHeight : 25,
            bodyHeight : 25
        },
        columns : [],

        pagination : {
            rowCount : 10
        }
    }
    private _gridManager = new GridManager();

    constructor() {

    }
    create(container: string | Element, options? : GridOptions){
        options = Object.assign(this._defaultOptions, options);
        options = this.requireOptionCheck(options);

        return this._gridManager.create(options);
    }

    private requireOptionCheck(options){
        if(!options.container){
            throw new Error('require option : container is null')
        }else{
            let container;
            if(typeof options.container === 'string'){
                container = document.querySelector(options.container)
            }else if(typeof options.container === "object" && options.container instanceof HTMLElement){
                container = options.container
            }else{
                throw new Error('require option container is unknown')
            }

            options.container = container;
        }
        if(options.columns.length > 0){
            let columns = options.columns;
            for(let i=0;i<columns.length;i++){
                if(!columns[i].ref){
                    throw new Error(`require option columns[${i}].ref is null`)
                }
            }
        }else{
            throw new Error('require option : column length is 0')
        }
        if(!options.id){
            options.id = `${GlobalVariable.GRID_PREFIX}_${Util.random()}`;
        }
        return options;
    }
    setOptions(options: object){
        this._defaultOptions = Object.assign(this._defaultOptions, options);
    }
}