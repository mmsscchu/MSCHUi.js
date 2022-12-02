import {GridOptions} from "./setting/gridOptions";
import Grid from "./grid";

export default class GridManager{
    private _grids = {} as {key: string, grid: Grid}

    constructor() {
    }
    create(options? : GridOptions){
        let grid = this._grids[options.id];
        if(!grid){
            grid = this._grids[options.id] = new Grid(options);
        }
        return grid;
    }

    getGrid(gridId: string){
        return this._grids[gridId]
    }

    destroy(gridId: string){
        let grid = this._grids[gridId];
        if(grid){
            grid.destroy();
        }else{
            console.warn(`grid '${gridId}' not found`)
        }
    }
}