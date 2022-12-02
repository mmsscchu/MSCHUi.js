import {GridOptions} from "./setting/gridOptions";
import GlobalVariable from "../common/globalVariable";
import Util from "../common/util";

export default class Grid{
    static CLASSNAME = {
        area : {
            container : `${GlobalVariable.GRID_PREFIX}-container`,
            content : `${GlobalVariable.GRID_PREFIX}-content`,
            pagination : `${GlobalVariable.GRID_PREFIX}-pagination`,
            scroll : `${GlobalVariable.GRID_PREFIX}-scroll`,
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
    }

    private validate(){
        if(!this.gridOption.container){
            throw new Error('\'container\' option is required')
        }
    }
    private parse(){}

    private create(){
        let fragment = document.createDocumentFragment();
        let target = this.gridOption.
        let area = this.gridElement.area;

        area.container = document.createElement('div')
        area.content = document.createElement('div');
        area.pagination = document.createElement('div');
        area.scroll = document.createElement('div');

        area.container.appendChild(area.content)
        area.container.appendChild(area.pagination)
        area.container.appendChild(area.scroll)

        let table = document.createElement('table');

        this.gridTable = table;

        document.body.appendChild(table);

        Util.sign(table)
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


}