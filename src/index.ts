import Grid from "./grid/main";
import Log from "./log/main";

class MSCHUi{
    public grid;
    public log;

    constructor() {
        this.grid = new Grid();
        this.log = new Log();
    }

}
export default new MSCHUi()
