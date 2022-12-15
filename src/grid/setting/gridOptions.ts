class GridOptions{
    container : Element;
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
    width? : string | number
    ref : string
    style? : string

    resizable? : boolean
    sort? : string
    sortable? : boolean
    tooltip? : string
    tooltipable? :boolean

    prefix? : string
    suffix? : string
    custom? : Function
}
export {GridOptions, GridOptionColumn}