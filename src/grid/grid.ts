import {GridOptions} from "./setting/gridOptions";
import GlobalVariable from "../common/globalVariable";
import Util from "../common/util";

export default class Grid{
    private gridName : string
    private gridOption : any

    private gridTable;
    private gridDatasetName;

    constructor(gridName : string, gridOption : GridOptions) {
        this.gridName = gridName
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
    public create(){
        let fragment = document.createDocumentFragment();
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