class GridOptions{
    container : Element | string;
    id? : string;
    rows? : {
        headHeight? : number, /* table head row height */
        bodyHeight? : number, /* table body row height */
    }
    columns? : [
        column?: GridOptionColumn
    ];
    pagination? : {
        rowCount? : number,
    }
    data? : []
}
class GridOptionColumn{
    title? : string
    ref : string
    style? : string

    width? : string | number

    resizable? : boolean
    sortable? : boolean
    draggable? : boolean

    prefix? : string
    suffix? : string
    format? : Function
}
export {GridOptions}