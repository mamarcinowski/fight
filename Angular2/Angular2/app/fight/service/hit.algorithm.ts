import { Fighter } from './../model/fighter';
import { FightLog, LogLevel } from './../service/fight.log';
import { Random } from './../../common/model/random';
import { Injectable } from '@angular/core';

export interface IHitAlgorithm {
    TryHit(attacker: Fighter, defender: Fighter, attackPrecissionModifier: number): HitResult;
}

export enum HitResult {
    Miss,
    Hit,
    Critical
}

export class HitResultTranslator {
    private static _map: { [hitResult: number]: string };

    public static Translate(hr: HitResult): string {
        if (!HitResultTranslator._map)
            HitResultTranslator.InitMap();

        
        var res = HitResultTranslator._map[hr];
        return res;
    }

    private static InitMap(): void {
        HitResultTranslator._map = {};
        HitResultTranslator._map[HitResult.Critical] = "Critical!";
        HitResultTranslator._map[HitResult.Hit] = "Hit!";
        HitResultTranslator._map[HitResult.Miss] = "Miss";
    }
}

@Injectable()
export class SimpleHitAlgorithm implements IHitAlgorithm{

    constructor(private _fightLog: FightLog) {

    }

    public TryHit(attacker: Fighter, defender: Fighter, attackPrecissionModifier: number = 0): HitResult {
        var seedRange = 2 * Fighter.MaxAttributeValue;

        var seed = Random.Next(seedRange, 1);
        if (seed == seedRange)
            return HitResult.Critical;

        var attackResult = seed + attacker.Precision + attacker.Stance + attackPrecissionModifier;
        var deffenceResult = Random.Next(seedRange, 1) + defender.Dodge + defender.Stance;

        this._fightLog.PushString(`Attack: ${attackResult} vs. Defense: ${deffenceResult}`, LogLevel.Additional);

        if (attackResult > deffenceResult) {
            return HitResult.Hit;
        }

        return HitResult.Miss;
    }
}
