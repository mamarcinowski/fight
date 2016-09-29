import { Guid } from './../../common/model/guid';
import { Random } from './../../common/model/random';
import { IMove } from './../moves/move';

export class Fighter
{
    static StanceRange: number = 5;
    static MaxAttributeValue: number = 20;

    public get HpPercentage(): number {
        return Math.round((this.CurrentHp / this.Hp) * 100);
    }

    public Id: string;
    public Name: string;
    public Hp: number;

    public Level: number;

    //used to define order of fighter in fight
    private _speed: number;
    public get Speed(): number {
        return this._speed;
    }
    public set Speed(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._speed != valCandidate) {
            this._speed = valCandidate;
        }
    }

    //used to check if attacker hits opponent
    private _precision: number;
    public get Precision(): number {
        return this._precision;
    }
    public set Precision(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._precision != valCandidate) {
            this._precision = valCandidate;
        }
    }

    //used to check if defemder doged hit
    private _dodge: number;
    public get Dodge(): number {
        return this._dodge;
    }
    public set Dodge(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._dodge != valCandidate) {
            this._dodge = valCandidate;
        }
    }

    //defines level of dealt damage 
    private _strength: number;
    public get Strength(): number {
        return this._strength;
    }
    public set Strength(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._strength != valCandidate) {
            this._strength = valCandidate;
        }
    }

    //reduce taken damage
    private _resistance: number;
    public get Resistance(): number {
        return this._resistance;
    }
    public set Resistance(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._resistance != valCandidate) {
            this._resistance = valCandidate;
        }
    }

    //defines ability to keep good stance in fight
    private _skill: number;
    public get Skill(): number {
        return this._skill;
    }
    public set Skill(value: number) {
        var valCandidate = Math.min(Math.max(0, value), Fighter.MaxAttributeValue);
        if (this._skill != valCandidate) {
            this._skill = valCandidate;
        }
    }

    // describes current situation of fighter, result with modifier
    private _stance: number;
    public get Stance(): number {
        return this._stance;
    }
    public set Stance(value: number) {
        var valCandidate = Math.min(Math.max(-Fighter.StanceRange, value), Fighter.StanceRange);
        if (this._stance != valCandidate) {
            this._stance = valCandidate;
        }
    }
    public get StancePercentage(): number {
        return Math.round(((this.Stance + Fighter.StanceRange) / (2 * Fighter.StanceRange)) * 100);
    }
    
    public CurrentMove: IMove;

    public AvailableMoves: IMove[];

    private _IsDead: boolean = false;
    public get IsDead(): boolean {
        return this._IsDead;
    }

    private _CurrentHp: number;
    public get CurrentHp(): number {
        return this._CurrentHp;
    } 

    constructor(name: string,
        moves: IMove[],
        id: string = null) {

        this.Id = id ? id : new Guid().ToString();
        this.Name = name;
        this.AvailableMoves = moves;

    }

    //stats up to 20 (1 ... 20)
    public Initialize(stance: IMove, level: number): void {
        this.Hp = 50 + Random.Sum(12, 1, level);
        this._CurrentHp = this.Hp;

        this.Level = level;
        this.Speed = Random._1k4() + level;
        this.Precision = Random._1k4() + level;
        this.Dodge = Random._1k4() + level;
        this.Strength = Random._1k4() + level;
        this.Resistance = Random._1k4() + level;
        this.Skill = Random._1k4() + level;

        this.BringToLife();
        
        this.CurrentMove = stance;
    }

    public Hit(damage: number): void {
        if (damage < 0)
            throw new Error('damage cant be lesser than 0');

        this._CurrentHp = Math.min(this.Hp, Math.max(0, this.CurrentHp - damage));
        if (this.CurrentHp <= 0) {
            this.Kill();
        }
    }

    private Kill() {
        this._IsDead = true;
    }

    private BringToLife() {
        this._IsDead = false;
        this.Stance = 0;
    }
}
