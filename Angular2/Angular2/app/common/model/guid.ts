export class Guid {
    private _id: string;

    constructor() {
        this._id = this.GenerateGuid();
    }

    public ToString(): string {
        return this._id;
    }

    private GenerateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}