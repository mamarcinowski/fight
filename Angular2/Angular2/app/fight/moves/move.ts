import { Fighter } from './../model/fighter';

export interface IMove {
    Display(): string;
    Perform(attacker: Fighter, defender: Fighter): void;
}