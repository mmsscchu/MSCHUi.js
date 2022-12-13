import {GridOptions} from "../setting/gridOptions";
import GlobalVariable from "../../common/globalVariable";
import Util from "../../common/util";

export default class GridTable {
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
    private options: GridOptions;
    public element;

    constructor(gridOptions : GridOptions) {
        this.options = gridOptions;

        this.create()
        this.update()
    }

    public create(){
        let area = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        area.className = this.TABLE_CLASS_NAMES.area

        let headRow = document.createElement('tr')

        /* options.columns */
        this.options.columns.forEach((columnInfo, columnIndex) => {
            let ref = columnInfo.ref;
            let title = columnInfo.title ? columnInfo.title : ''
            let caption = columnInfo.caption ? columnInfo.caption : columnInfo.title

            let headColumn = document.createElement('th')
            let headColumnTitle = document.createElement('span');
            let headColumnCaption = document.createElement('div');
            let headColumnResize = document.createElement('div');

            headColumn.className = this.TABLE_CLASS_NAMES.head.this;
            headColumn.style.width = this.parseColumnWidth(columnInfo.width)
            headColumnTitle.addEventListener('mouseenter', function(captionElement){ // caption 발동 조건
                let enterLimitTime = 500;
                let enterWaitTime = 0;
                let enterWaitInterval = setInterval(()=>{
                    if(enterLimitTime < enterWaitTime){
                        captionElement.classList.add('is-show')
                        clearInterval(enterWaitInterval);
                    }
                    enterWaitTime += 50;
                },50)
                this.addEventListener('mouseleave', mouseleave)

                function mouseleave(){
                    if(enterWaitInterval){
                        captionElement.classList.remove('is-show')
                        clearInterval(enterWaitInterval);
                        this.removeEventListener('mouseleave', mouseleave);
                    }
                }
            }.bind(headColumnTitle, headColumnCaption))
            headColumnCaption.onclick = function(){

            }.bind(headColumnResize, headColumn)
            headColumnTitle.className = this.TABLE_CLASS_NAMES.head.title;
            headColumnTitle.innerText = title;

            headColumnCaption.className = this.TABLE_CLASS_NAMES.head.caption;
            headColumnCaption.innerText = caption;

            headColumnResize.className = this.TABLE_CLASS_NAMES.head.resizer;
            headColumnResize.addEventListener('mousedown', function(e){
                this.style.height = `${Util.height(table)}px`
                this.classList.add('active');

                let th = this.closest('th');
                // @ts-ignore
                th.nextElementSibling.style.width = 'auto';

                document.addEventListener('mousemove', mousemove)
                document.addEventListener('mouseup', mouseup.bind(this));

                function mousemove(e){
                    let targetWidth = Util.width(th);
                    th.style.width = `${targetWidth + e.movementX}px`;
                }
                function mouseup(e){
                    this.classList.remove('active');
                    // @ts-ignore
                    th.nextElementSibling.style.width = `${ Util.width(th.nextElementSibling)}px`

                    document.removeEventListener('mousemove', mousemove)
                    document.removeEventListener('mouseup', mouseup.bind(this))
                }
            })
            headColumn.appendChild(headColumnTitle);
            headColumn.appendChild(headColumnCaption);
            headColumn.appendChild(headColumnResize);

            headRow.appendChild(headColumn);
        })

        thead.appendChild(headRow);

        table.appendChild(thead)
        table.appendChild(tbody);

        area.appendChild(table);


        this.element = area;
    }
    public update(){
        let tbody = this.element.querySelector('tbody');
        this.options.data.forEach((row, rowIndex) =>{
            console.log(row)
            let bodyRow = document.createElement('tr');
            bodyRow.setAttribute('data-mschui-row-index', String(rowIndex));

            this.options.columns.forEach((column, columnIndex) =>{

                let columnValue = row[column.ref];
                let bodyColumn = document.createElement('td')
                let bodyText = document.createElement('span');

                bodyColumn.appendChild(bodyText);
                bodyColumn.setAttribute('data-mschui-column-index', String(columnIndex));
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