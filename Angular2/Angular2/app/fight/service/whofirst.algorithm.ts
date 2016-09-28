import { Fighter } from './../model/fighter';
import { Random } from './../../common/model/random';
import { Injectable } from '@angular/core';

export interface IWhoFirstAlgorithm {
    Resolve(player1: Fighter, player2: Fighter): Fighter;
}

@Injectable()
export class WhoFirstAlgorithm implements IWhoFirstAlgorithm{
    public Resolve(player1: Fighter, player2: Fighter): Fighter {

        console.log(player1, player2);

        var p1Result = player1.Speed + Random._1k12();
        var p2Result = player2.Speed + Random._1k12();

        if (p1Result > p2Result)
            return player1;

        if (p2Result > p1Result)
            return player2;

        return this.Resolve(player1, player2);
    }
}
