export class Random {
    constructor() {
    }

    public static _1k4(): number {
        return Random.Next(4, 1);
    }

    public static _1k6(): number{
        return Random.Next(6, 1);
    }

    public static _1k8(): number {
        return Random.Next(8, 1);
    }

    public static _1k12(): number {
        return Random.Next(12, 1);
    }

    public static _1k16(): number {
        return Random.Next(16, 1);
    }

    public static _1k20(): number {
        return Random.Next(20, 1);
    }

    public static Next(max: number, min: number = 0): number {
        return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }

    public static Sum(max: number, min: number = 0, throws: number = 1): number {
        var res = 0;

        for (var i = 0; i < throws; i++) {
            res += this.Next(max, min);
        }

        return Math.round(res * (max - min)) + min;
    }
}