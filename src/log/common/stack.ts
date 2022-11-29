export default class Stack{
    constructor() {

    }
    public getStackData(){
        let error = new Error();
        if(error.stack){
            let callerLine = error.stack.split("\n")[3]
            let startIndex = callerLine.indexOf("(")
            let endIndex = callerLine.lastIndexOf(")")

            let lineLink = callerLine.substring(startIndex + 1, endIndex)
            let lineNumber = lineLink.split(":", 3)[2]

            if(lineNumber){
                lineNumber = ':' + lineNumber
            }else{
                lineNumber = '';
            }
            return '(stack : ' + lineLink+')';
        }
    }
    public getStackDatas(){

    }
}