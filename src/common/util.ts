import GlobalVariable from "./globalVariable";

export default class Util{
    constructor() {}
    static random(){
        return Math.random().toString(36).substring(2, 12);
    }
    static sign(container){
        container.setAttribute(GlobalVariable.PROJECT_NAME, GlobalVariable.PROJECT_VERSION)
    }
    static width(element){
        return Number(getComputedStyle(element).width.replace('px', ''))
    }
    static height(element){
        return Number(getComputedStyle(element).height.replace('px', ''))
    }
}