import {LogOptions} from "../log/setting/logOptions";
import LogManager from "../log/logManager";
import Grid from "./grid";

export default class MSCHUiGrid{
    private static _defaultOptions: LogOptions = {
        level : 'INFO',
        color : false,
        appender : {}
    }
    constructor() {
        new Grid('1234', null).create()
    }
}