class EventHandler
{
    private static eventDispatcher: Laya.EventDispatcher = new Laya.EventDispatcher;
    public static AddListener(eventName: string, handle: Function, caller: any)
    {
        this.eventDispatcher.on(eventName, caller, handle);
    }
    public static RemoveListener(eventName: string, handle: Function, caller: any)
    {
        this.eventDispatcher.off(eventName, caller, handle);
    }
    public static Dispatch(eventName: string, args?: any)
    {
        this.eventDispatcher.event(eventName, args);
    }
}