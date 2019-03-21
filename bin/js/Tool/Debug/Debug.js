var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.init = function () {
        this.isDebug = true;
    };
    Debug.log = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (!this.isDebug)
            return;
        console.log(this.getLogMsg(msgs));
    };
    Debug.logError = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (!this.isDebug)
            return;
        console.error(this.getLogMsg(msgs));
    };
    Debug.LogWarning = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (!this.isDebug)
            return;
        console.error(this.getLogMsg(msgs));
    };
    Debug.getLogMsg = function (msgs) {
        var logMsg = "";
        for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
            var msg = msgs_1[_i];
            if (typeof msg === "string") {
                logMsg += msg;
            }
            else if (msg === undefined) {
                logMsg += "undefined";
            }
            else if (msg === null) {
                logMsg += "null";
            }
            else if (msg.constructor === Laya.Vector2) {
                logMsg += "(" + msg.x + "," + msg.y + ")";
            }
            else if (msg.constructor === Vector3) {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + ")";
            }
            else if (msg.constructor === Laya.Vector4) {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + "," + msg.w + ")";
            }
            else if (msg.constructor === Laya.Quaternion) {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + "," + msg.w + ")";
            }
            else {
                logMsg += msg;
            }
        }
        return logMsg;
    };
    Debug.isDebug = false;
    return Debug;
}());
//# sourceMappingURL=Debug.js.map