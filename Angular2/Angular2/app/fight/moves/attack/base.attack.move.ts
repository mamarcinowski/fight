import { Fighter } from './../../model/fighter';
import { Random } from './../../../common/model/random';
import { FightLog, LogMessage, LogLevel } from './../../service/fight.log';
import { SimpleHitAlgorithm, HitResult, HitResultTranslator } from './../../service/hit.algorithm';
import { SimpleDamageAlgorithm } from './../../service/damage.algorithm';
import { StanceAlgorithm } from './../../service/stance.algorithm';
import { IMove} from './../move';

export abstract class BaseAttackMove implements IMove {

    public Display(): string { return this.Name(); }

    public abstract Name(): string;
    public abstract PrecisionModifier(): number;
    public abstract StrengthModifier(): number;
    public abstract SkillModifier(): number;
    public abstract MaxDamage(): number;
    public abstract MinDamage(): number;
    public abstract CriticalDamageMultiplier(): number;
    public abstract MaxStanceImprove(): number;
    public abstract MaxStanceHit(): number;

    private _hitResultMap: { [hitResult: number]: ((p1: Fighter, p2: Fighter) => void) } = { };

    constructor(private _fightLog: FightLog,
        private _damageAlgorithm: SimpleDamageAlgorithm,
        private _stanceAlgorithm: StanceAlgorithm,
        private _hitAlgorithm: SimpleHitAlgorithm) {

        this._hitResultMap[HitResult.Critical] = (p1, p2) => this.DealCriticalDamage(p1, p2);
        this._hitResultMap[HitResult.Hit] = (p1, p2) => this.DealDamage(p1, p2);
        this._hitResultMap[HitResult.Miss] = (p1, p2) => this.HandleMiss(p1, p2);

    }

    public Perform(attacker: Fighter, defender: Fighter): void {
        var hitResult = this._hitAlgorithm.TryHit(attacker, defender, this.PrecisionModifier());

        this._fightLog.Push(new LogMessage(LogLevel.Additional, `${attacker.Name} ${this.Name()} ${defender.Name }`));
        this._fightLog.Push(new LogMessage(LogLevel.Additional, HitResultTranslator.Translate(hitResult)));

        this.Hit(attacker, defender, hitResult);
        this.ModifyStances(attacker, defender, hitResult);
    }

    private ModifyStances(attacker: Fighter, defender: Fighter, hitResult: HitResult): void {
        if (hitResult == HitResult.Miss)
            return;

        this._stanceAlgorithm.Resolve(attacker, defender, this.SkillModifier(), this.MaxStanceImprove(), this.MaxStanceHit());
    }

    private Hit(attacker: Fighter, defender: Fighter, hitResult: HitResult): void {
        this._hitResultMap[hitResult](attacker, defender);
    }

    private DealCriticalDamage(attacker: Fighter, defender: Fighter): void {
        var damage = this.GetCriticalDamage(attacker, defender);
        this._fightLog.Push(new LogMessage(LogLevel.Info, 'Critical damage to ' + defender.Name + ' - ' + damage));

        defender.Hit(damage);
    }

    private DealDamage(attacker: Fighter, defender: Fighter): void {
        var damage = this.GetDamage(attacker, defender);
        this._fightLog.Push(new LogMessage(LogLevel.Info, 'Damage to ' + defender.Name + ' - ' + damage));

        defender.Hit(damage);
    }

    private HandleMiss(attacker: Fighter, defender: Fighter): void {

    }

    private GetDamage(attacker: Fighter, defender: Fighter): number {
        return this._damageAlgorithm.Damage(attacker, defender, this.StrengthModifier(), this.MinDamage(), this.MaxDamage());
    }

    private GetCriticalDamage(attacker: Fighter, defender: Fighter): number {
        return this._damageAlgorithm.CriticalDamage(attacker, defender, this.StrengthModifier(), this.MinDamage(), this.MaxDamage(), this.CriticalDamageMultiplier());
    }
}