import { Fighter } from './../model/fighter';
import { FightLog } from './../service/fight.log';
import { Random } from './../../common/model/random';
import { Injectable } from '@angular/core';

export interface IDamageAlgorithm {
    Damage(attacker: Fighter, defender: Fighter, strengthModifier: number, min: number, max: number): number;
    CriticalDamage(attacker: Fighter, defender: Fighter, strengthModifier: number, min: number, max: number, multiplier: number): number;
}

@Injectable()
export class SimpleDamageAlgorithm implements IDamageAlgorithm{

    constructor(private _fightLog: FightLog) {

    }

    public Damage(attacker: Fighter, defender: Fighter, strengthModifier: number, min: number, max: number): number {
        return this.GetDamage(attacker, defender, strengthModifier, min, max);
    }

    public CriticalDamage(attacker: Fighter, defender: Fighter, strengthModifier: number, min: number, max: number, multiplier: number): number {
        return this.GetCriticalDamage(attacker, defender, strengthModifier, min, max, multiplier);
    }

    private GetDamage(attacker: Fighter, defender: Fighter, strengthModifier:number, min: number, max: number): number {
        var attackModifiers = attacker.Stance + attacker.Strength + strengthModifier;
        var deffenseModifiers = defender.Stance + defender.Dodge;

        var damage = Math.max(min, Math.min(max, Random.Next(max) + attackModifiers - deffenseModifiers));
        return damage;
    }

    private GetCriticalDamage(attacker: Fighter, defender: Fighter, strengthModifier: number, min: number, max: number, multiplier: number): number {
        var attackModifiers = attacker.Stance + strengthModifier;
        var deffenseModifiers = defender.Stance;

        var damage = Math.max(min, Math.min(max, Random.Next(max) + attackModifiers - deffenseModifiers));
        var criticalDamage = damage * multiplier;
        return criticalDamage;
    }
}
