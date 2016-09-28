import { FightLog } from './../service/fight.log';
import { SimpleHitAlgorithm } from './../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../service/damage.algorithm';
import { StanceAlgorithm } from './../service/stance.algorithm';
import { Injectable } from '@angular/core';
import { BaseAttackMove } from './attack/base.attack.move';

@Injectable()
export class FlyingKneeMove extends BaseAttackMove {

    public Name() { return "flying knee"; };
    public PrecisionModifier() { return -8; };
    public SkillModifier() { return +2; };
    public StrengthModifier() { return +8; };
    public MaxDamage() { return 100; };
    public MinDamage() { return 40; };
    public CriticalDamageMultiplier() { return 5; };
    public MaxStanceImprove() { return 1; };
    public MaxStanceHit() { return 4; };

    constructor(fightLog: FightLog,
        damageAlgorithm: SimpleDamageAlgorithm,
        stanceAlgorithm: StanceAlgorithm,
        hitAlgorithm: SimpleHitAlgorithm) {

        super(fightLog, damageAlgorithm, stanceAlgorithm, hitAlgorithm);
    }
}