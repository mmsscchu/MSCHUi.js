import GlobalVariable from "./globalVariable";

export default class Util{
    constructor() {}
    static random(){
        return Math.random().toString(36).substring(2, 12);
    }
    static sign(container){
        container.setAttribute(GlobalVariable.PROJECT_NAME, GlobalVariable.PROJECT_VERSION)
    }
}