var FSMSystem = /** @class */ (function () {
    function FSMSystem() {
        this.states = [];
    }
    Object.defineProperty(FSMSystem.prototype, "currentStateID", {
        get: function () {
            return this._currentStateID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSMSystem.prototype, "currentState", {
        get: function () {
            return this._currentState;
        },
        enumerable: true,
        configurable: true
    });
    FSMSystem.prototype.FSMSystem = function () {
        this.states = [];
    };
    FSMSystem.prototype.addState = function (s) {
        if (s == null) {
            console.log("FSMSystem Error: Null FSMState");
        }
        if (this.states.length == 0) {
            this.states.push(s);
            this._currentState = s;
            this._currentStateID = s.id;
            return;
        }
        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].id == s.id) {
                console.log("FSMSystem Error: FSMState:" + s.id.toString() + "already been added");
                return;
            }
        }
        this.states.push(s);
    };
    FSMSystem.prototype.deleteState = function (id) {
        if (id == 0) {
            console.log("FSMSystem Error: NullStateID");
            return;
        }
        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].id == id) {
                this.states.splice(i, 1);
                return;
            }
        }
        console.log("FSMSystem Error:" + id.toString() + "not has");
    };
    FSMSystem.prototype.performTransition = function (trans) {
        if (trans == 0) {
            console.log("FSMSystem Error: NullTransition");
            return;
        }
        var outputState = this._currentState.getOutputState(trans);
        if (outputState == 0) {
            console.log("FSMSystem Error:" + this._currentStateID.toString() + " does not have a target state  for transition " + trans.toString());
            return;
        }
        this._currentStateID = outputState;
        for (var i = 0; i < this.states.length; i++) {
            if (this.states[i].id == this._currentStateID) {
                this._currentState.doBeforeLeaving();
                this._currentState = this.states[i];
                this._currentState.doBeforeEntering();
                break;
            }
        }
    };
    return FSMSystem;
}());
//# sourceMappingURL=FSMSystem.js.map