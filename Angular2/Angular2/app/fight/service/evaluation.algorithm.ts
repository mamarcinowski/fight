import { Fighter } from './../model/fighter';
import { Fight } from './../model/fight';
import { Injectable } from '@angular/core';

export interface IEvaluationAlgorithm {
    Evaluate(fight: Fight): boolean;
}

@Injectable()
export class EvaluationAlgorithm implements IEvaluationAlgorithm{
    public Evaluate(fight: Fight): boolean {
        var attacker = fight.Player1;
        var deffender = fight.Player2;

        if (!attacker.IsDead && !deffender.IsDead )
            return false;

        return true;
    }
}
