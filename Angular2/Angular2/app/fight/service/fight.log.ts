import { LiteEvent, ILiteEvent } from './../../common/model/liteevent';
import { Injectable } from '@angular/core';

export interface IFightLog {
    Changed: ILiteEvent<LogMessage>;

    PushString(message: string, logLevel: LogLevel): void;
    Push(message: LogMessage): void;
}

@Injectable()
export class FightLog implements IFightLog{
    public Level: LogLevel = LogLevel.Info;
    public Changed: ILiteEvent<LogMessage> = new LiteEvent<LogMessage>();
    public Archive: Array<LogMessage> = new Array<LogMessage>();

    public PushString(message: string, logLevel: LogLevel = LogLevel.Info): void {
        this.Push(new LogMessage(logLevel, message));
    }

    public Push(message: LogMessage): void {
        if (this.Level <= message.Level)
            this.Archive.unshift(message);

        console.log(message.Level, this.Level, message.Args);

        this.OnChanged(message);
    }

    private OnChanged(message: LogMessage): void {
        this.Changed.Trigger(message);
    }
}

export class LogMessage {
    public Args: any[];
    public String: string;
    public Date: Date;
    public Level: LogLevel;

    constructor(level: LogLevel = LogLevel.Info, ...args: any[]) {
        this.Args = args;
        this.String = args.toString();
        this.Date = new Date();
        this.Level = level;
    }
}

export enum LogLevel {
    Additional = 1,
    Info = 2,
    Warning = 3,
    Error = 4
}