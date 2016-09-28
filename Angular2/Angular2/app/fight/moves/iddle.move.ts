import { Injectable } from '@angular/core';
import { Fighter } from './../model/fighter';
import { FightLog, LogMessage, LogLevel } from './../service/fight.log';
import { IMove} from './move';
import { Random} from './../../common/model/random';

@Injectable()
export class IddleMove implements IMove {

    public Display(): string { return 'iddle'; }

    public PrecisionModifier: number = 0;
    public DodgeModifier: number = 0;
    public StrengthModifier: number = 0;
    public ResistanceModifier: number = 0;

    constructor(private _fightLog: FightLog) {
    }

    public Perform(attacker: Fighter, defender: Fighter): void {
        this._fightLog.Push(new LogMessage(LogLevel.Additional, attacker, 'is iddle'));
    }
}