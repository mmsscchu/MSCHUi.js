import Grid from "./grid/main";
import Log from "./log/main";

class MSCHUi{
    public Grid;
    public Log;
    constructor() {
        this.Grid = new Grid();
        this.Log = new Log();
    }
}
export default new MSCHUi()
