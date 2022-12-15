import {GridOptionColumn, GridOptions} from "../setting/gridOptions";
import GlobalVariable from "../../common/globalVariable";
import Util from "../../common/util";

export default class GridTable {
    private TABLE_DATA_NAMES = {
        row : {
           index : 'row-index'
        },
        column : {
            index : 'column-index'
        }
    }
    private TABLE_CLASS_NAMES = {
        area : `${GlobalVariable.GRID_PREFIX}-table`,
        head : {
            this : `content-head`,
            title : `content-head-title`,
            tooltip : `content-head-tooltip`,
            resize : `content-head-resize`,
            sort : `content-head-sort`
        },
        body : {
            this : 'content-body'
        }
    }
    private options: GridOptions;
    public element;

    constructor(gridOptions : GridOptions) {
        this.options = gridOptions;

        this.create()
        this.update()
    }
    private _headTitle(headColumn:Element, option: GridOptionColumn, callback:Function){
        let headColumnTitle = document.createElement('span');
        headColumnTitle.className = this.TABLE_CLASS_NAMES.head.title;
        headColumnTitle.innerText = option.title;

        headColumn.appendChild(headColumnTitle);
        return headColumn;
    }
    private _headResizable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.resizable){
            return headColumn;
        }
        let headColumnResize = document.createElement('div');
        headColumnResize.className = this.TABLE_CLASS_NAMES.head.resize;
        headColumnResize.addEventListener('mousedown', function(e){
            this.style.height = `${Util.height(headColumn.closest('table'))}px`
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
                th.nextElementSibling.style.width = `${Util.width(th.nextElementSibling)}px`

                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup.bind(this))
            }
        })

        headColumn.setAttribute('resizable','');
        headColumn.appendChild(headColumnResize);

        return headColumn;
    }
    private _headSortable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.sortable){
            return headColumn;
        }
        let headColumnSort = document.createElement('div');
        headColumnSort.className = this.TABLE_CLASS_NAMES.head.sort;

        headColumn.setAttribute('sortable', '');
        headColumn.addEventListener('click', function(sortElement){
            let isAsc = sortElement.classList.contains('asc')
            let isDesc = sortElement.classList.contains('desc')

            if(!isAsc && !isDesc){
                sortElement.classList.remove('asc')
                sortElement.classList.add('desc');
            }else if(isDesc){
                sortElement.classList.remove('desc');
                sortElement.classList.add('asc');
            }else{
                sortElement.classList.remove('desc');
                sortElement.classList.remove('asc')
            }

        }.bind(headColumn, headColumnSort))
        headColumn.appendChild(headColumnSort);
        return headColumn;
    }
    private _headTooltipable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.tooltipable){
            return headColumn
        }
        let headColumnTooltip = document.createElement('div');
        headColumnTooltip.className = this.TABLE_CLASS_NAMES.head.tooltip;
        headColumnTooltip.innerText = option.tooltip;

        headColumn.addEventListener('mouseenter', function(tooltipElement){ // caption 발동 조건
            let enterLimitTime = 500;
            let enterWaitTime = 0;
            let enterWaitInterval = setInterval(()=>{
                if(enterLimitTime < enterWaitTime){
                    tooltipElement.classList.add('active')
                    clearInterval(enterWaitInterval);
                }
                enterWaitTime += 50;
            },50)
            this.addEventListener('mouseleave', mouseleave)

            function mouseleave(){
                if(enterWaitInterval){
                    tooltipElement.classList.remove('active')
                    clearInterval(enterWaitInterval);
                    this.removeEventListener('mouseleave', mouseleave);
                }
            }
        }.bind(headColumn, headColumnTooltip))

        headColumn.setAttribute('tooltipable', '');
        headColumn.appendChild(headColumnTooltip);

        return headColumn;
    }
    public create(){
        let area = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        area.className = this.TABLE_CLASS_NAMES.area
        thead.className = this.TABLE_CLASS_NAMES.head.this;
        tbody.className = this.TABLE_CLASS_NAMES.body.this;

        let headRow = document.createElement('tr')
        headRow.setAttribute(this.TABLE_DATA_NAMES.row.index, String(-1));

        /* options.columns */
        this.options.columns.forEach((columnOption, columnIndex) => {
            let ref = columnOption.ref
            let title = columnOption.title ? columnOption.title : ''
            let caption = columnOption.tooltip ? columnOption.tooltip : columnOption.title

            let headColumn = document.createElement('th')
            headColumn.setAttribute(this.TABLE_DATA_NAMES.column.index, String(columnIndex));
            headColumn.style.width = this.parseColumnWidth(columnOption.width)

            this._headTitle(headColumn, columnOption, function(){

            })
            this._headResizable(headColumn, columnOption, function(){

            })
            this._headSortable(headColumn, columnOption, function(){

            })
            this._headTooltipable(headColumn, columnOption, function(){

            })
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

            let bodyRow = document.createElement('tr');
            bodyRow.setAttribute(this.TABLE_DATA_NAMES.row.index, String(rowIndex));

            this.options.columns.forEach((columnOption, columnIndex) =>{

                let columnValue = row[columnOption.ref];
                let bodyColumn = document.createElement('td')
                let bodyText = document.createElement('span');

                bodyColumn.appendChild(bodyText);
                bodyColumn.setAttribute(this.TABLE_DATA_NAMES.column.index, String(columnIndex));
                if(columnOption.custom && typeof columnOption.custom === 'function'){
                    let customElement = columnOption.custom(columnValue);
                    bodyColumn.replaceChild(customElement, bodyText)
                }else{
                    bodyText.innerText =
                        (columnOption.prefix ? columnOption.prefix : '')
                        + columnValue +
                        (columnOption.suffix ? columnOption.suffix : '')
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