import { FightLog } from './../service/fight.log';
import { SimpleHitAlgorithm } from './../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../service/damage.algorithm';
import { StanceAlgorithm } from './../service/stance.algorithm';
import { Injectable } from '@angular/core';
import { BaseAttackMove } from './attack/base.attack.move';

@Injectable()
export class LowKickMove extends BaseAttackMove {

    public Name() { return "low kick"; };
    public PrecisionModifier() { return -2; };
    public SkillModifier() { return +2; };
    public StrengthModifier() { return +2; };
    public MaxDamage() { return 40; };
    public MinDamage() { return 10; };
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