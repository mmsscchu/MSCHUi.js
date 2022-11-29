class LogLevels {
    public static LOG_LEVEL_DEBUG : LogLevel = {
        text : 'DEBUG',
        color : '#915CEF',
        level : 5
    }
    public static LOG_LEVEL_TRACE : LogLevel = {
        text : 'TRACE',
        color : '#36A4FF',
        level : 4
    }
    public static LOG_LEVEL_INFO : LogLevel = {
        text : 'INFO',
        color : '#00CC88',
        level : 3
    }
    public static LOG_LEVEL_WARN : LogLevel = {
        text : 'WARN',
        color : '#FF7D4A',
        level : 2
    }
    public static LOG_LEVEL_ERROR : LogLevel = {
        text : 'ERROR',
        color : '#FF454D',
        level : 1
    }
}
abstract class LogLevel{
    text : string
    color : string
    level: number
}
export {LogLevel, LogLevels};