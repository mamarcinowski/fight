import { FightLog } from './../service/fight.log';
import { SimpleHitAlgorithm } from './../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../service/damage.algorithm';
import { StanceAlgorithm } from './../service/stance.algorithm';
import { Injectable } from '@angular/core';
import { BaseAttackMove } from './attack/base.attack.move';

@Injectable()
export class JabMove extends BaseAttackMove {

    public Name() { return "jab"; };
    public PrecisionModifier() { return +2; };
    public SkillModifier() { return +2; };
    public StrengthModifier() { return -2; };

    public MaxDamage() { return 20; };
    public MinDamage() { return 1; };
    public CriticalDamageMultiplier() { return 2; };
    public MaxStanceImprove() { return 3; };
    public MaxStanceHit() { return 1; };

    constructor(fightLog: FightLog,
        damageAlgorithm: SimpleDamageAlgorithm,
        stanceAlgorithm: StanceAlgorithm,
        hitAlgorithm: SimpleHitAlgorithm) {

        super(fightLog, damageAlgorithm, stanceAlgorithm, hitAlgorithm);
    }
}