import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import { HeaderComponent }  from './layout/header.component';
import { FooterComponent }  from './layout/footer.component';
import { ScreenComponent }  from './layout/screen.component';

import { AreaComponent } from './screens/area.component';
import { FightComponent } from './screens/area/fight.component';
import { FighterComponent } from './screens/area/fighter.component';

import { HomeComponent } from './screens/home.component';
import { DefaultComponent } from './screens/default.component';
import { FighterDetailsComponent } from './screens/fighterdetails.component';

import { IddleMove } from './fight/moves/iddle.move';
import { JabMove } from './fight/moves/jab.move';
import { PushMove } from './fight/moves/push.move';
import { FistMove } from './fight/moves/fist.move';
import { LowKickMove } from './fight/moves/lowkick.move';
import { FlyingKneeMove } from './fight/moves/flyingknee.move';

import { SimpleDamageAlgorithm } from './fight/service/damage.algorithm';
import { SimpleHitAlgorithm, HitResult } from './fight/service/hit.algorithm';
import { StanceAlgorithm } from './fight/service/stance.algorithm';

import { FightersRepository } from './fight/service/fighters.repository';
import { FighterFactory } from './fight/service/fighter.factory';

import { EvaluationAlgorithm } from './fight/service/evaluation.algorithm';
import { MoveExecutor } from './fight/service/move.executor';
import { WhoFirstAlgorithm } from './fight/service/whofirst.algorithm';

import { FightLog } from './fight/service/fight.log';

import { routing,
    appRoutingProviders }  from './app.routing';

import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF}
from '@angular/common';  

@NgModule({
    imports: [BrowserModule, FormsModule, routing],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ScreenComponent,
        AreaComponent,
        HomeComponent,
        DefaultComponent,
        FighterDetailsComponent,
        FightComponent,
        FighterComponent
    ],
    providers: [
        SimpleDamageAlgorithm,
        StanceAlgorithm,
        SimpleHitAlgorithm,
        FightLog,
        IddleMove,
        JabMove,
        PushMove,
        FistMove,
        LowKickMove,
        FlyingKneeMove,
        EvaluationAlgorithm,
        WhoFirstAlgorithm,
        MoveExecutor,
        FighterFactory,
        FightersRepository,
        appRoutingProviders,
        { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
