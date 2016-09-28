import { Fighter } from './../model/fighter';
import { FightLog } from './../service/fight.log';
import { Random } from './../../common/model/random';
import { Injectable } from '@angular/core';

export interface IStanceAlgorithm {
    Resolve(attacker: Fighter, defender: Fighter, attackerSkillModifier: number, maxValue: number, minValue: number): void;
}

@Injectable()
export class StanceAlgorithm implements IStanceAlgorithm{

    constructor(private _fightLog: FightLog) {

    }

    public Resolve(attacker: Fighter, defender: Fighter, attackerSkillModifier: number = 0, maxImproveValue: number = 1, maxLoseValue: number = 1): void {
        var attackerSeed = Random.Next(Fighter.MaxAttributeValue);
        var attackerStanceResult = attacker.Skill + attackerSeed + attackerSkillModifier;
        if (attackerStanceResult > Fighter.MaxAttributeValue || attackerSeed == Fighter.MaxAttributeValue) {
            attacker.Stance = attacker.Stance + Random.Next(maxImproveValue, 1);
        }

        var defenderSeed = Random.Next(Fighter.MaxAttributeValue);
        var defenderStanceResult = defender.Skill + defenderSeed;
        if ((defenderSeed < Fighter.MaxAttributeValue && defenderStanceResult <= Fighter.MaxAttributeValue) || defenderSeed == 0)
            defender.Stance = defender.Stance - Random.Next(maxLoseValue, 1);

    }
}
