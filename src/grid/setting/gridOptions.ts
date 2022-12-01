class GridOptions{
    public container : Element | string;
    public id : string;
    public rows : {
        headHeight? : 25, /* table head row height */
        bodyHeight? : 25, /* table body row height */
    }
    public columns : [
        {
            title : string,
            ref? : string,
            style? : string,

            width? : string | number,

            resizable? : boolean,
            sortable? : boolean,
            draggable? : boolean,

            prefix? : string,
            suffix? : string,
            format? : Function
        }
    ];
    public pagination? : {
        rowCount? : number,
    }
    public data? : []
}
export {GridOptions}