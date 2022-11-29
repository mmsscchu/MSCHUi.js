class LogOptions{
    public level: string;
    public color: boolean
    public appender : LogAppenderOption
}
abstract class LogAppenderOption{
    file? : FileAppenderOption
    console? : ConsoleAppenderOption
    print? : PrintAppenderOption
}
abstract class AppenderOption{
    level : string
    color? : false
}

class FileAppenderOption extends AppenderOption{
    level : string
}
class ConsoleAppenderOption extends AppenderOption{
    level : string
    color : false
}
class PrintAppenderOption extends AppenderOption{
    level : string
    color : false
}
export {LogOptions,
    LogAppenderOption,
    AppenderOption,
    FileAppenderOption,
    ConsoleAppenderOption,
    PrintAppenderOption}