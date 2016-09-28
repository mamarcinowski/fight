import { FightLog } from './../service/fight.log';
import { SimpleHitAlgorithm } from './../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../service/damage.algorithm';
import { StanceAlgorithm } from './../service/stance.algorithm';
import { Injectable } from '@angular/core';
import { BaseAttackMove } from './attack/base.attack.move';

@Injectable()
export class FistMove extends BaseAttackMove {

    public Name() { return "fist"; };
    public PrecisionModifier() { return -2; };
    public SkillModifier() { return -1; };
    public StrengthModifier() { return +3; };

    public MaxDamage() { return 60; };
    public MinDamage() { return 1; };
    public CriticalDamageMultiplier() { return 3; };
    public MaxStanceImprove() { return 1; };
    public MaxStanceHit() { return 2; };

    constructor(fightLog: FightLog,
        damageAlgorithm: SimpleDamageAlgorithm,
        stanceAlgorithm: StanceAlgorithm,
        hitAlgorithm: SimpleHitAlgorithm) {

        super(fightLog, damageAlgorithm, stanceAlgorithm, hitAlgorithm);
    }
}