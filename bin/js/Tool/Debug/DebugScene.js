var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DebugScene = /** @class */ (function (_super) {
    __extends(DebugScene, _super);
    function DebugScene() {
        var _this = _super.call(this) || this;
        _this.yawPitchRoll = new Vector3();
        _this.resultRotation = new Laya.Quaternion();
        _this.tempRotationZ = new Laya.Quaternion();
        _this.tempRotationX = new Laya.Quaternion();
        _this.tempRotationY = new Laya.Quaternion();
        _this.rotaionSpeed = 0.0001;
        _this.moveSpeed = 0.02;
        _this.isDebug = false;
        return _this;
    }
    DebugScene.prototype.GetDebugCamera = function () {
        return this.debugCamera;
    };
    DebugScene.prototype.show = function (scene, mainCamera) {
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        this.scene = scene;
        this.mainCamera = mainCamera;
        this.debugCamera = new Laya.Camera(0, 0.1, 1000);
        this.debugCamera.transform.position = this.mainCamera.transform.position.clone();
        this.debugCamera.transform.localRotationEuler = this.mainCamera.transform.localRotationEuler.clone();
        this.debugCamera.clearColor = null;
        this.debugCamera.fieldOfView = 60;
        this.debugCamera.normalizedViewport = new Laya.Viewport(0, 0, 0.5, 1);
        this.scene.addChild(this.debugCamera);
        mainCamera.normalizedViewport = new Laya.Viewport(0.5, 0, 0.5, 1);
        // mainCamera.removeSelf();
        this.isDebug = true;
        // this.debugCamera.sky = mainCamera.sky;
    };
    DebugScene.prototype.close = function () {
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        this.scene.removeChild(this.debugCamera);
        this.debugCamera = null;
        this.mainCamera.normalizedViewport = new Laya.Viewport(0, 0, 1, 1);
        this.isDebug = false;
    };
    DebugScene.prototype._update = function (state) {
        if (!this.isDebug)
            return;
        _super.prototype._update.call(this, state);
        this.updateCamera(state.elapsedTime);
    };
    DebugScene.prototype.mouseDown = function (e) {
        this.debugCamera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    };
    DebugScene.prototype.mouseUp = function (e) {
        this.isMouseDown = false;
    };
    DebugScene.prototype.mouseOut = function (e) {
        this.isMouseDown = false;
    };
    DebugScene.prototype.updateCamera = function (elapsedTime) {
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
            var moveSpeedTemp = this.moveSpeed;
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.SPACE)) {
                this.debugCamera.transform.position = this.mainCamera.transform.position;
                this.debugCamera.transform.rotation = this.mainCamera.transform.rotation;
            }
            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.SHIFT)) {
                moveSpeedTemp += moveSpeedTemp;
            }
            Laya.KeyBoardManager.hasKeyDown(87) && this.debugCamera.moveForward(-moveSpeedTemp * elapsedTime); //W
            Laya.KeyBoardManager.hasKeyDown(83) && this.debugCamera.moveForward(moveSpeedTemp * elapsedTime); //S
            Laya.KeyBoardManager.hasKeyDown(65) && this.debugCamera.moveRight(-moveSpeedTemp * elapsedTime); //A
            Laya.KeyBoardManager.hasKeyDown(68) && this.debugCamera.moveRight(moveSpeedTemp * elapsedTime); //D
            Laya.KeyBoardManager.hasKeyDown(81) && this.debugCamera.moveVertical(moveSpeedTemp * elapsedTime); //Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.debugCamera.moveVertical(-moveSpeedTemp * elapsedTime); //E
            if (this.isMouseDown) {
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetY = Laya.stage.mouseY - this.lastMouseY;
                var yprElem = this.yawPitchRoll.elements;
                yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
                yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
                this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    };
    DebugScene.prototype.updateRotation = function () {
        var yprElem = this.yawPitchRoll.elements;
        if (Math.abs(yprElem[1]) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
            this.debugCamera.transform.localRotation = this.tempRotationZ;
        }
    };
    return DebugScene;
}(Laya.Script));
//# sourceMappingURL=DebugScene.js.map