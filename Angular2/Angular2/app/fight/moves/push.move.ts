import { FightLog } from './../service/fight.log';
import { SimpleHitAlgorithm } from './../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../service/damage.algorithm';
import { StanceAlgorithm } from './../service/stance.algorithm';
import { Injectable } from '@angular/core';
import { BaseAttackMove } from './attack/base.attack.move';

@Injectable()
export class PushMove extends BaseAttackMove {

    public Name() { return "push"; };
    public PrecisionModifier() { return +6; };
    public SkillModifier() { return +2; };
    public StrengthModifier() { return -6; };

    public MaxDamage() { return 2; };
    public MinDamage() { return 0; };
    public CriticalDamageMultiplier() { return 1; };
    public MaxStanceImprove() { return 5; };
    public MaxStanceHit() { return 1; };

    constructor(fightLog: FightLog,
        damageAlgorithm: SimpleDamageAlgorithm,
        stanceAlgorithm: StanceAlgorithm,
        hitAlgorithm: SimpleHitAlgorithm) {

        super(fightLog, damageAlgorithm, stanceAlgorithm, hitAlgorithm);
    }
}