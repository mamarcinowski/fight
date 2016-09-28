export interface ILiteEvent<T> {
    On(handler: { (data?: T): void }): void;
    Off(handler: { (data?: T): void }): void;
    Trigger(data?: T): void;
}

export class LiteEvent<T> implements ILiteEvent<T> {
    private _handlers: { (data?: T): void; }[] = [];

    public On(handler: { (data?: T): void }) {
        this._handlers.push(handler);
    }

    public Off(handler: { (data?: T): void }) {
        this._handlers = this._handlers.filter(h => h !== handler);
    }

    public Trigger(data?: T) {
        this._handlers.slice(0).forEach(h => h(data));
    }
}