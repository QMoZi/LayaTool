var DebugTool = /** @class */ (function () {
    function DebugTool() {
    }
    DebugTool.init = function (scene, camera) {
        this.mainScene = scene;
        this.mainCamera = camera;
        this.isDebug = true;
        Debug.init();
        if (this.debugScene == null) {
            this.debugScene = this.mainScene.addScript(DebugScene);
        }
        if (this.gizmos == null) {
            this.gizmos = this.mainScene.addScript(Gizmos);
        }
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    };
    DebugTool.onKeyDown = function (e) {
        if (e === void 0) { e = null; }
        if (e.keyCode == Laya.Keyboard.F1 && !this.isDebugScene) {
            this.debugScene.show(this.mainScene, this.mainCamera);
            this.debugCamera = this.debugScene.GetDebugCamera();
            this.gizmos.show(this.debugCamera);
            this.isDebugScene = true;
        }
        else if (e.keyCode == Laya.Keyboard.F1 && this.isDebugScene) {
            this.debugScene.close();
            this.gizmos.close();
            this.isDebugScene = false;
        }
    };
    DebugTool.isDebug = false;
    DebugTool.isDebugScene = false;
    return DebugTool;
}());
//# sourceMappingURL=DebugTool.js.map