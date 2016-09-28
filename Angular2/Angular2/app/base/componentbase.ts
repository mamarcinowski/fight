export abstract class ComponentBase {
    public IsBusy: boolean;
    public Error: Error;

    protected OnError(e: Error): void {
        this.IsBusy = false;
        this.Error = e;
    }

    protected ClearError(): void {
        this.Error = null;
    }
}