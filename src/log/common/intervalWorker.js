const DEFINE_MESSAGE = {
    START : 'start',
    TICK : 'tick',
    STOP : 'stop',
    STARTED : 'started',
    STOPPED : 'stopped',
    STATUS : 'status'
}
/**
 * C : Client / W : Worker
- C -> W
{
    operation : start | stop | status
    data? : {
        intervalId? : [number] (stop only)
        interval? : [number] (start only)
    }
}
- W -> C
{
    operation : tick | started | stopped | status
    data? : {
        intervalId? : [number] (tick, started, status)
        interval? : [number] (tick, started, status)
    }
}
- Operation
 C (start) -> W (operation) - W (started) -> C (started)
              -> loop start - W (tick) -> C (tick)
 C (stop) -> W (operation) - W (stopped) -> C (stopped)
              -> loop stop
 C (status) -> W (operation) - W (status) -> C (status)
              -> get Information
*/
let _intervals_ = {};
let _interval = function(c2wData){
    let id = setInterval(function(){
        postMessage({
            operation : DEFINE_MESSAGE.TICK,
            data : {
                intervalId : id,
                interval : c2wData.interval
            }
        })
    }, c2wData.interval)

    _intervals_[id] = c2wData;
}
onmessage = (e) => {
    let c2wData = e.data;
    let c2wOperation = c2wData.operation;
    let c2wOptions = c2wData.options;

    let w2cData = {}
    let w2cOperation = {}
    switch(c2wOperation){
        case DEFINE_MESSAGE.START:
            w2cOperation = DEFINE_MESSAGE.STARTED
            break;
        case DEFINE_MESSAGE.STOP:
            clearInterval(c2wData.intervalId)
            delete _intervals_[c2wData.intervalId]

            w2cOperation = DEFINE_MESSAGE.STOPPED;
            break;
        case DEFINE_MESSAGE.STATUS:
            w2cOperation = DEFINE_MESSAGE.STATUS;
            w2cData = {

            }
            break;
    }
    postMessage({
        operation : w2cOperation
    });
}