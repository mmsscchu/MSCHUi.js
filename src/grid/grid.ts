import {GridOptions} from "./setting/gridOptions";
import GlobalVariable from "../common/globalVariable";
import Util from "../common/util";
import "./style.css";
import Table from "./component/table";

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

    private gridOption : GridOptions

    private gridTable;
    private gridDatasetName;

    private gridElement = {
        area : {
            container : null,
            content : null,
            pagination : null,
            scroll : null
        },
    }
    constructor(gridOption : GridOptions) {
        this.gridOption = gridOption
        this.gridDatasetName = `${GlobalVariable.GRID_DATASET_NAME}`//-${Util.random()}`
        this.create();

        for(let key in this.gridOption){
            Object.defineProperty(this.gridOption, key, {
                get() {
                    return this[key];
                },
                set(newValue) {
                    if(this[key] !== newValue){
                        console.log(key, this[key]+ '->' + newValue, 'changed');
                    }
                    this[key] = newValue;
                }
            })
        }
    }

    private validate(){
        if(!this.gridOption.container){
            throw new Error('\'container\' option is required')
        }
    }
    private parse(){}

    private create(){
        let tableArea = new Table(this.gridOption);

        let fragment = document.createDocumentFragment();
        let target = this.gridOption.container
        let area = this.gridElement.area;

        area.container = document.createElement('div')
        area.pagination = document.createElement('div');
        area.scroll = document.createElement('div');

        area.container.className = this.gridClassNames.area.container;
        area.pagination.className = this.gridClassNames.area.pagination;
        area.scroll.className = this.gridClassNames.area.scroll;

        area.container.appendChild(tableArea.getElement())
        area.container.appendChild(area.pagination)
        area.container.appendChild(area.scroll)

        target.appendChild(area.container);

        Util.sign(area.container)
    }



    public destroy(){
        let fragment = document.createDocumentFragment();
    }

    public refresh(){}

    private createRow(){}
    private createColumn(){}

    private updateRow(){}
    private updateColumn(){}

    getGrids(){}

    public setOptions(options: GridOptions){
        this.gridOption = Object.assign(this.gridOption, options);
    }
}