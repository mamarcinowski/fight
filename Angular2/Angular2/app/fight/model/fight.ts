import { Guid } from './../../common/model/guid';
import { Fighter } from './fighter';

import { FightLog } from './../service/fight.log';

import { MoveExecutor, IMoveExecutor } from './../service/move.executor';
import { EvaluationAlgorithm, IEvaluationAlgorithm } from './../service/evaluation.algorithm';

import { WhoFirstAlgorithm, IWhoFirstAlgorithm } from './../service/whofirst.algorithm';

export class Fight {
    public Id: string;
    public Player1: Fighter;
    public Player2: Fighter;

    public IsFinished: boolean;

    constructor(player1: Fighter = null, player2: Fighter = null,
        id: string = null,
        private _fightLog: FightLog,
        private _moveExecutor: IMoveExecutor = null,
        private _evaluationAlgorithm: EvaluationAlgorithm = null,
        private _whoFirstAlgorithm: WhoFirstAlgorithm = null) {

        this.Id = id ? id : new Guid().ToString();
        this.Player1 = player1;
        this.Player2 = player2;        
    }

    public Validate(): void {
        if (!this.Player1) throw new ReferenceError('Player1');
        if (!this.Player2) throw new ReferenceError('Player2');

        if (!this._moveExecutor) throw new ReferenceError('_moveExecutor');
        if (!this._evaluationAlgorithm) throw new ReferenceError('_evaluationAlgorithm');
        if (!this._whoFirstAlgorithm) throw new ReferenceError('_whoFirstAlgorithm');

        if (this.Player1.IsDead)
            throw new Error(`${this.Player1.Name} is dead!`);

        if (this.Player2.IsDead)
            throw new Error(`${this.Player2.Name} is dead!`);
    }

    private _currentPlayer: Fighter;
    private get _secondPlayer(): Fighter {
        return (this._currentPlayer == this.Player1) ? this.Player2 : this.Player1
    }

    public NextTurn(): void {
        this.Validate();

        if (!this._currentPlayer)
            this._currentPlayer = this._whoFirstAlgorithm.Resolve(this.Player1, this.Player2);
        else
            this._currentPlayer = this._secondPlayer;

        this._fightLog.PushString(this._currentPlayer.Name.toUpperCase() + ' TURN');

        this._moveExecutor.Move(this._currentPlayer, this._secondPlayer);

        if (this._evaluationAlgorithm.Evaluate(this))
            this.Finish();
    }

    public Finish(): void {
        this.IsFinished = true;
    }
}
