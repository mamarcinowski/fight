import { Fighter } from './../model/fighter';
import { IMove } from './../moves/move';
import { Injectable } from '@angular/core';

export interface IMoveExecutor {
    Move(attacker: Fighter, deffender: Fighter): void;
}
@Injectable()
export class MoveExecutor implements IMoveExecutor{
    public Move(attacker: Fighter, deffender: Fighter): void {

        var move = attacker.CurrentMove;
        move.Perform(attacker, deffender);
    }
}
