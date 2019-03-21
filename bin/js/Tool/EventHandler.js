var EventHandler = /** @class */ (function () {
    function EventHandler() {
    }
    EventHandler.AddListener = function (eventName, handle, caller) {
        this.eventDispatcher.on(eventName, caller, handle);
    };
    EventHandler.RemoveListener = function (eventName, handle, caller) {
        this.eventDispatcher.off(eventName, caller, handle);
    };
    EventHandler.Dispatch = function (eventName, args) {
        this.eventDispatcher.event(eventName, args);
    };
    EventHandler.eventDispatcher = new Laya.EventDispatcher;
    return EventHandler;
}());
//# sourceMappingURL=EventHandler.js.map