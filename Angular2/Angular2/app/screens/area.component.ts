import { ComponentBase } from './../base/componentbase';

import { Fighter } from './../fight/model/fighter';
import { FightersRepository } from './../fight/service/fighters.repository';

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'area-component',
    templateUrl:  './templates/area.html'
})
export class AreaComponent extends ComponentBase implements OnInit 
{
    public Fighters: Fighter[];

    constructor(private _router: Router,
        private _fightersRepository: FightersRepository) {
        super();

        this._fightersRepository.Changed.On(() => this.UpdateFighters());
    }

    public OnFighterClicked(fighter: Fighter): void {
        this._router.navigate([ '/fighterDetails', fighter.Id] );
    }

    ngOnInit(): void {
        console.log('resolving fighters');

        this.UpdateFighters();
    }

    private UpdateFighters(): void {
        this._fightersRepository.GetFightersAsync()
            .then((fighters) => {
                this.Fighters = fighters;
            })
            .catch(error => {
                this.OnError(error);
            });
    }
}
