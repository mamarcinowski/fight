import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AreaComponent } from './screens/area.component';
import { HomeComponent } from './screens/home.component';
import { DefaultComponent } from './screens/default.component';
import { FighterDetailsComponent } from './screens/fighterdetails.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'area', component: AreaComponent },
    { path: 'fighterDetails/:id', component: FighterDetailsComponent },
    //{
    //    path: 'heroes',
    //    component: HeroListComponent,
    //    data: {
    //        title: 'Heroes List'
    //    }
    //},
    { path: '', component: HomeComponent },
    { path: '**', component: DefaultComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);