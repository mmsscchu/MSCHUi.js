import {GridOptionColumn, GridOptions} from "../setting/gridOptions";
import GlobalVariable from "../../common/globalVariable";
import Util from "../../common/util";
import GridEvent from "../gridEvent";

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
    private event : GridEvent;
    private data = {
        rowIndex : -1,
        columnIndex : -1,
        target: null,
        cell: null
    }
    public element;

    constructor(gridOptions : GridOptions, gridEvent: GridEvent) {
        this.options = gridOptions;
        this.event = gridEvent

        this.create()
        this.update()
    }

    private _createHeadRow(thead:Element, option: GridOptions, rowIndex: number){
        let headRow = document.createElement('tr')
        headRow.setAttribute(this.TABLE_DATA_NAMES.row.index, String(rowIndex));

        thead.appendChild(headRow);

        return headRow;
    }
    private _createHeadColumn(headRow:Element, option: GridOptionColumn, columnIndex: number){
        let headColumn = document.createElement('th')
        headColumn.setAttribute(this.TABLE_DATA_NAMES.column.index, String(columnIndex));
        headColumn.style.width = this._parseColumnWidth(option.width)

        headRow.appendChild(headColumn)

        return headColumn
    }
    private _createHeadColumnTitle(headColumn:Element, option: GridOptionColumn, callback:Function){
        let headColumnTitle = document.createElement('span');
        headColumnTitle.className = this.TABLE_CLASS_NAMES.head.title;
        headColumnTitle.innerText = option.title;

        headColumn.appendChild(headColumnTitle);
        return headColumn;
    }
    private _createHeadColumnResizable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.resizable){
            return headColumn;
        }
        let _SELF = this;
        let headColumnResize = document.createElement('div');
        headColumnResize.className = this.TABLE_CLASS_NAMES.head.resize;
        headColumnResize.addEventListener('mousedown', function(e){
            this.style.height = `${Util.height(headColumn.closest('table'))}px`
            this.classList.add('active');

            _SELF.event.CALL_COLUMN_RESIZE_START(e, _SELF._applyData({}))

            let th = this.closest('th');
            // @ts-ignore
            th.nextElementSibling.style.width = 'auto';

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup.bind(this));

            function mousemove(e){
                let targetWidth = Util.width(th);
                th.style.width = `${targetWidth + e.movementX}px`;

                _SELF.event.CALL_COLUMN_RESIZE(e, _SELF._applyData({}))
            }
            function mouseup(e){
                this.classList.remove('active');
                // @ts-ignore
                th.nextElementSibling.style.width = `${Util.width(th.nextElementSibling)}px`

                _SELF.event.CALL_COLUMN_RESIZE_STOP(e, _SELF._applyData({}))

                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup.bind(this))
            }
        })

        headColumn.setAttribute('resizable','');
        headColumn.appendChild(headColumnResize);

        return headColumn;
    }
    private _createHeadColumnSortable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.sortable){
            return headColumn;
        }
        let _SELF = this

        let headColumnSort = document.createElement('div');
        headColumnSort.className = this.TABLE_CLASS_NAMES.head.sort;

        headColumn.setAttribute('sortable', '');
        headColumn.addEventListener('click', function(sortElement, e){
            let isAsc = sortElement.classList.contains('asc')
            let isDesc = sortElement.classList.contains('desc')

            let sort;
            if(!isAsc && !isDesc){
                sortElement.classList.remove('asc')
                sortElement.classList.add('desc');
                sort = 'desc';
            }else if(isDesc){
                sortElement.classList.remove('desc');
                sortElement.classList.add('asc');
                sort = 'asc'
            }else{
                sortElement.classList.remove('desc');
                sortElement.classList.remove('asc')
                sort = 'none'
            }
            _SELF.event.CALL_SORT(e, _SELF._applyData({
                sort : sort
            }))
        }.bind(headColumn, headColumnSort))
        headColumn.appendChild(headColumnSort);
        return headColumn;
    }

    private _createHeadColumnTooltipable(headColumn:Element, option: GridOptionColumn, callback:Function){
        if(!option.tooltipable){
            return headColumn
        }
        let _SELF = this;
        let headColumnTooltip = document.createElement('div');
        headColumnTooltip.className = this.TABLE_CLASS_NAMES.head.tooltip;
        headColumnTooltip.innerText = option.tooltip ? option.tooltip : option.title;

        headColumn.addEventListener('mouseenter', function(tooltipElement, e){ // caption 발동 조건
            let enterLimitTime = 500;
            let enterWaitTime = 0;
            let enterWaitInterval = setInterval(()=>{
                if(enterLimitTime < enterWaitTime){
                    tooltipElement.classList.add('active')

                    _SELF.event.CALL_TOOLTIP_ACTIVE(e, _SELF._applyData({}))

                    clearInterval(enterWaitInterval);
                }
                enterWaitTime += 50;
            },50)

            this.addEventListener('mouseleave', mouseleave)

            _SELF.event.CALL_TOOLTIP_READY(e, _SELF._applyData({}))

            function mouseleave(e){
                tooltipElement.classList.remove('active')
                this.removeEventListener('mouseleave', mouseleave);

                _SELF.event.CALL_TOOLTIP_INACTIVE(e, _SELF._applyData({}))

                if(enterWaitInterval){
                    clearInterval(enterWaitInterval);
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

        table.addEventListener('click', function(e){
            if(e.target instanceof Element){
                let column = e.target;
                let tagName = column.tagName;
                if(!(tagName === 'th' || tagName === 'td')){
                    column = column.closest('th, td')
                }
                let row = column.closest('tr')
                let rowIndex = row.getAttribute(this.TABLE_DATA_NAMES.row.index)
                let columnIndex = column.getAttribute(this.TABLE_DATA_NAMES.column.index);

                this.data.rowIndex = rowIndex;
                this.data.columnIndex = columnIndex
                this.data.target = e.target
                this.data.cell = column
            }
        }.bind(this))

        let rowIndex = -1;
        let headRow = this._createHeadRow(thead, this.options, rowIndex);

        /* options.columns */
        this.options.columns.forEach((columnOption, columnIndex) => {
            let headColumn = this._createHeadColumn(headRow, columnOption, columnIndex)

            this._createHeadColumnTitle(headColumn, columnOption, function(){})
            this._createHeadColumnResizable(headColumn, columnOption, function(){})
            this._createHeadColumnSortable(headColumn, columnOption, function(){})
            this._createHeadColumnTooltipable(headColumn, columnOption, function(){})
        })

        thead.appendChild(headRow);

        table.appendChild(thead)
        table.appendChild(tbody);

        area.appendChild(table);

        this.element = area;
    }

    public update(){
        let _SELF = this;
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
                bodyColumn.addEventListener('click', function(e){
                    _SELF.event.CALL_GRID_CLICK(e, _SELF._applyData({}))
                }.bind(bodyColumn))
                bodyRow.appendChild(bodyColumn)
            })
            tbody.appendChild(bodyRow);
        })
    }

    private _parseColumnWidth(width){
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

    /*private _getIndex(columnElement){
        return {
            rowIndex: Number(columnElement.closest('tr').getAttribute(this.TABLE_DATA_NAMES.row.index)),
            columnIndex: Number(columnElement.getAttribute(this.TABLE_DATA_NAMES.column.index))
        }
    }*/
    private _applyData(data = {}){
        return Object.assign(this.data, data)
    }
}