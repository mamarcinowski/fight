import { ComponentBase } from './../base/componentbase';

import { Fighter } from './../fight/model/fighter';
import { FightersRepository } from './../fight/service/fighters.repository';

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'fighter-details',
    templateUrl:  './templates/fighterDetails.html'
})
export class FighterDetailsComponent extends ComponentBase implements OnInit 
{
    public Entity: Fighter;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _fightersRepository: FightersRepository) {
        super();
    }

    public Save(): void {
        console.log('save invoked');

        this.IsBusy = true;
        this._fightersRepository.SaveAsync(this.Entity)
            .then(() => {
                this.ClearError();
                this.IsBusy = false;
                this.GoBack();
            })
            .catch((e) => this.OnError(e));
    }

    public Cancel(): void {
        this.GoBack();
    }

    private GoBack(): void {
        window.history.back();
    }

    ngOnInit(): void {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this.ShowFighter(id);
        });
    }

    private ShowFighter(id: string): void{ 
        this._fightersRepository.GetFighterAsync(id)
            .then((fighter) => {
                this.Entity = fighter;
            })
            .catch(error => {
                this.OnError(error);
            });
    }
}
