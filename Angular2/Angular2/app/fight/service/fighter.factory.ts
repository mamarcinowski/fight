import { Fighter } from './../model/fighter';
import { LiteEvent, ILiteEvent } from './../../common/model/liteevent';
import { Injectable } from '@angular/core';

import { IddleMove } from './../moves/iddle.move';
import { JabMove } from './../moves/jab.move';
import { FistMove } from './../moves/fist.move';
import { LowKickMove } from './../moves/lowkick.move';
import { FlyingKneeMove } from './../moves/flyingknee.move';


import { IMove } from './../moves/move';
import { Random } from './../../common/model/random';

export interface IFighterFactory {
    Create(level: number): Fighter;
}

@Injectable()
export class FighterFactory implements IFighterFactory {

    private _moves: IMove[];

    constructor(private _iddle: IddleMove,
                private _fist: FistMove,
                private _jab: JabMove,
                private _lowKick: LowKickMove,
                private _flyingKnee: FlyingKneeMove) {
        this._moves = new Array<IMove>(
            this._iddle,
            this._jab,
            this._fist,
            this._lowKick,
            this._flyingKnee
        );
    }

    //level: 0 - 12
    public Create(level: number = 0): Fighter {
        var fighter = new Fighter(
            this.DrawName(),
            this._moves,
            null);

        fighter.Initialize(this._moves[Random.Next(this._moves.length - 1)], level);
        return fighter;

    }
    ///0 : (max - 1)
    private Random(max: number): number {
        return Math.random() * max;
    }

    private DrawName(): string {
        var names = FighterFactory._names;
        var i = Math.floor(this.Random(names.length));
        return names[i];
    }

    private static _names: string[] = new Array<string>(
        'Andrzej',
        'Bogdan',
        'Ziemniak',
        'Goliat',
        'Marian'
    );
}