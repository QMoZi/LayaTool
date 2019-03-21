var FSMState = /** @class */ (function () {
    function FSMState() {
        this.map = new Dictionary();
    }
    Object.defineProperty(FSMState.prototype, "id", {
        get: function () {
            return this.stateID;
        },
        enumerable: true,
        configurable: true
    });
    FSMState.prototype.addTransition = function (trans, id) {
        if (trans == 0) {
            console.log("FSMState Error: NullTransition");
            return;
        }
        if (id == 0) {
            console.log("FSMState Error: NullStateID");
            return;
        }
        if (this.map.ContainsKey(trans)) {
            console.log("FSMState Error: Map already has TransitionID: " + trans.toString());
            return;
        }
        this.map.Add(trans, id);
    };
    FSMState.prototype.deleteTransition = function (trans) {
        if (trans == 0) {
            console.log("FSMState Error: NullTransition");
            return;
        }
        if (this.map.ContainsKey(trans)) {
            this.map.Remove(trans);
            return;
        }
        console.log("FSMState Error: Map not has TransitionID:" + trans.toString());
    };
    FSMState.prototype.getOutputState = function (trans) {
        if (this.map.ContainsKey(trans)) {
            return this.map.TryGetValue(trans);
        }
        return 0;
    };
    return FSMState;
}());
//# sourceMappingURL=FSMState.js.map