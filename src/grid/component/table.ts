import {GridOptions} from "../setting/gridOptions";
import GlobalVariable from "../../common/globalVariable";

export default class Table{
    private TABLE_CLASS_NAMES = {
        area : `${GlobalVariable.GRID_PREFIX}-table`,
        head : {
            this : `${GlobalVariable.GRID_PREFIX}-content-head`,
            title : `${GlobalVariable.GRID_PREFIX}-content-head-title`,
            caption : `${GlobalVariable.GRID_PREFIX}-content-head-caption`,
            resizer : `${GlobalVariable.GRID_PREFIX}-content-head-resize`
        },
        body : {

        }
    }
    private gridOptions: GridOptions;
    private readonly tableElement;

    constructor(options : GridOptions) {

        let area = document.createElement('div');
        let table = document.createElement('table');
        let colgroup = document.createElement('colgroup');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        area.className = this.TABLE_CLASS_NAMES.area

        let headRow = document.createElement('tr')

        options.columns.forEach(columnInfo => {
            let colColumn = document.createElement('col');
            colColumn.setAttribute('width', this.parseColumnWidth(columnInfo.width))
            colgroup.appendChild(colColumn);

            let ref = columnInfo.ref;
            let title = columnInfo.title ? columnInfo.title : ''
            let caption = columnInfo.caption ? columnInfo.caption : columnInfo.title

            let headColumn = document.createElement('th')
            let headColumnTitle = document.createElement('span');
            let headColumnCaption = document.createElement('div');
            let headColumnResize = document.createElement('div');

            headColumn.className = this.TABLE_CLASS_NAMES.head.this;
            headColumn.onmouseenter = function(captionElement){ // caption 발동 조건
                let enterLimitTime = 500;
                let enterWaitTime = 0;
                let enterWaitInterval = setInterval(()=>{
                    if(enterLimitTime < enterWaitTime){
                        captionElement.classList.add('is-show')
                        clearInterval(enterWaitInterval);
                    }
                    enterWaitTime += 50;
                },50)
                this.onmouseleave = function(){
                    if(enterWaitInterval){
                        captionElement.classList.remove('is-show')
                        clearInterval(enterWaitInterval);
                    }
                }
            }.bind(headColumn, headColumnCaption)
            headColumnCaption.onclick = function(){

            }.bind(headColumnResize, headColumn)
            headColumnTitle.className = this.TABLE_CLASS_NAMES.head.title;
            headColumnTitle.innerText = title;

            headColumnCaption.className = this.TABLE_CLASS_NAMES.head.caption;
            headColumnCaption.innerText = caption;

            headColumnResize.className = this.TABLE_CLASS_NAMES.head.resizer;

            headColumn.appendChild(headColumnTitle);
            headColumn.appendChild(headColumnCaption);
            headColumn.appendChild(headColumnCaption);

            headRow.appendChild(headColumn);
        })

        thead.appendChild(headRow);

        table.appendChild(colgroup);
        table.appendChild(thead)
        table.appendChild(tbody);

        area.appendChild(table);


        this.gridOptions = options;
        this.tableElement = area;

        this.update()
    }

    public getElement(){
        return this.tableElement
    }

    public update(){
        let tbody = this.tableElement.querySelector('tbody');
        this.gridOptions.data.forEach(data =>{
            console.log(data)
            let bodyRow = document.createElement('tr');
            this.gridOptions.columns.forEach(column =>{

                let columnValue = data[column.ref];
                let bodyColumn = document.createElement('td')
                let bodyText = document.createElement('span');

                bodyColumn.appendChild(bodyText);

                if(column.custom && typeof column.custom === 'function'){
                    let customElement = column.custom();
                    bodyColumn.replaceChild(customElement, bodyColumn.firstElementChild)
                }else{
                    bodyText.innerText =
                        (column.prefix ? column.prefix : '')
                        + columnValue +
                        (column.suffix ? column.suffix : '')
                }
                bodyRow.appendChild(bodyColumn)
            })
            tbody.appendChild(bodyRow);
        })

    }
    private parseColumnWidth(width){
        if(!width){
            return 'auto'
        }
        if(typeof width === 'number'){
            return width + 'px'
        }else if(typeof width === 'string'){
            if(width.includes('%')){
                /*let tableWidth = Number(getComputedStyle(table).getPropertyValue('width').replace('px'));
                tableWidth*/
            }
            return width;
        }else{
            throw new Error('unsupported width data type')
        }
    }
}