import { Fighter } from './../model/fighter';
import { FighterFactory } from './fighter.factory';
import { LiteEvent, ILiteEvent } from './../../common/model/liteevent';
import { Injectable } from '@angular/core';

export interface IFightersRepository {
    GetFighters(): Fighter[];
    GetFightersAsync(): Promise<Fighter[]>;

    GetFighter(id: string): Fighter;
    GetFighterAsync(id: string): Promise<Fighter>;

    Save(fighter: Fighter): void;
    SaveAsync(fighter: Fighter): Promise<Fighter>;

    Add(fighter: Fighter): void;
    AddAsync(fighter: Fighter): Promise<Fighter>;

    Changed: ILiteEvent<Fighter>;
}

@Injectable()
export class FightersRepository implements IFightersRepository
{
    public Changed: ILiteEvent<Fighter> = new LiteEvent<Fighter>(); 

    private _fightersStorage: Fighter[] = [
    ];

    constructor(private _fighterFactory: FighterFactory) {
        this.Mock();
    }

    private Mock(): void {
        var p1 = this._fighterFactory.Create(3);
        var p2 = this._fighterFactory.Create(3);

        this.Add(p1);
        this.Add(p2);

    }

    public GetFighters(): Fighter[] {
        return this._fightersStorage.map(f => Object.create(f));
    }

    public GetFightersAsync(): Promise<Fighter[]> {
        return Promise.resolve(this.GetFighters());
    }

    public GetFighter(id: string): Fighter {
        var f = this._fightersStorage.find(f => f.Id == id);
        if (f) {
            return Object.create(f);
        }
        return null;
    }

    public GetFighterAsync(id: string): Promise<Fighter>{
        return new Promise<Fighter>((resolve, reject) => {
            var fighter = this.GetFighter(id);
            if (fighter)
                resolve(fighter);

            reject(new Error('Not found'));
        });
    }

    public Save(fighter: Fighter): void {
        if (!fighter)
            throw new ReferenceError('Fighter can\'t be null');

        console.log('saving', fighter);

        var cachedFighter = this._fightersStorage.find(f => f.Id == fighter.Id);
        var cachedFighterIndex = this._fightersStorage.indexOf(cachedFighter);

        if (cachedFighterIndex == -1)
            throw new Error('Fighter doesn\'t exists!');

        this._fightersStorage[cachedFighterIndex] = fighter;

        this.OnChanged(fighter);
    }

    public SaveAsync(fighter: Fighter): Promise<Fighter> {
        return new Promise((resolve, reject) =>{
            try {
                this.Save(fighter);
                resolve(fighter);
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    public Add(fighter: Fighter): void {
        var cachedFighter = this.GetFighter(fighter.Id);
        var cachedFighterIndex = this._fightersStorage.indexOf(cachedFighter);

        if (cachedFighterIndex !== -1)
            throw new Error('Fighter already exists!');

        this._fightersStorage.push(fighter);
        this.OnChanged(fighter);
    }

    public AddAsync(fighter: Fighter): Promise<Fighter> {
        return new Promise((resolve, reject) => {
            try {
                this.Add(fighter);
                resolve(fighter);
            }
            catch (e) {
                reject(e);
            }
        });
    }

    private OnChanged(fighter: Fighter): void {
        this.Changed.Trigger(fighter);
    }
}
