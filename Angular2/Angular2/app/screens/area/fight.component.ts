import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

import { Fight } from './../../fight/model/fight';
import { Fighter } from './../../fight/model/fighter';

import { FighterFactory } from './../../fight/service/fighter.factory';
import { FightersRepository } from './../../fight/service/fighters.repository';
import { FightLog, LogMessage, LogLevel } from './../../fight/service/fight.log';

import { WhoFirstAlgorithm } from './../../fight/service/whofirst.algorithm';
import { EvaluationAlgorithm } from './../../fight/service/evaluation.algorithm';
import { MoveExecutor } from './../../fight/service/move.executor';

import { ComponentBase } from './../../base/componentbase';

@Component({
    selector: 'fight-component',
    templateUrl: './templates/fight.html'
})
export class FightComponent extends ComponentBase implements OnInit, OnDestroy
{
    private static INTERVAL: number = 500;

    public Fight: Fight;
    public LogController: FightLog;

    private _timer: NodeJS.Timer;
    private IsRunning: boolean;

    constructor(private _fighterFactory: FighterFactory,
        private _fightersRepository: FightersRepository,
        private _fightLog: FightLog,
        private _whoFirstAlgorithm: WhoFirstAlgorithm,
        private _evaluationAlgorithm: EvaluationAlgorithm,
        private _moveExecutor: MoveExecutor
    ) {
        super();

        this.LogController = _fightLog;
    }

    ngOnDestroy(): void{
        this.Fight.IsFinished = true;
        this.IsRunning = false;
    }

    ngOnInit(): void {

        var fighters = this._fightersRepository.GetFighters();

        this.Fight = new Fight(fighters[0], fighters[1],
            null,
            this._fightLog,
            this._moveExecutor,
            this._evaluationAlgorithm,
            this._whoFirstAlgorithm);
    }

    public RequestStart(): void {
        this.IsRunning = true;
        this._timer = setTimeout(() => this.OnTick(), FightComponent.INTERVAL);
        this._fightLog.Push(new LogMessage(LogLevel.Additional, 'Fight started...'));
    }

    public RequestPause(): void {
        this.IsRunning = false;
        this._fightLog.Push(new LogMessage(LogLevel.Additional, 'Pause requested...'));
    }

    private OnTick(): void {
        if (!this.IsRunning) {
            this._fightLog.Push(new LogMessage(LogLevel.Additional, 'Fight paused...'));
            return;
        }

        try {
            this.Fight.NextTurn();
        } catch (e) {
            this._fightLog.Push(new LogMessage(LogLevel.Error, e));
            this.IsRunning = false;
            return;
        }

        if (!this.Fight.IsFinished) {
            setTimeout(() => this.OnTick(), FightComponent.INTERVAL);
        } else {
            this.IsRunning = false;
            this._fightLog.Push(new LogMessage(LogLevel.Additional, 'Fight finished...'));
        }
    }
}
