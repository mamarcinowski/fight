import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { Fight } from './../../fight/model/fight';
import { Fighter } from './../../fight/model/fighter';

@Component({
    selector: 'fighter-component',
    templateUrl:  './templates/fighter.html'
})

export class FighterComponent implements OnInit
{
    @Input() public Fighter: Fighter;

    constructor() {
        
    }

    ngOnInit(): void {
    }
}
