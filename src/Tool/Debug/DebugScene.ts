class DebugScene extends Laya.Script
{
    private lastMouseX: number;
    private lastMouseY: number;
    private yawPitchRoll = new Vector3();
    private resultRotation = new Laya.Quaternion();
    private tempRotationZ = new Laya.Quaternion();
    private tempRotationX = new Laya.Quaternion();
    private tempRotationY = new Laya.Quaternion();
    private isMouseDown: Boolean;
    private rotaionSpeed: number = 0.0001;
    private moveSpeed: number = 0.02;

    private debugCamera: Laya.Camera;
    private mainCamera: Laya.Camera;
    private scene: Laya.Scene;

    private isDebug: boolean = false;

    constructor()
    {
        super();
    }

    public GetDebugCamera()
    {
        return this.debugCamera;
    }

    public show(scene: Laya.Scene, mainCamera: Laya.Camera): void
    {
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
    }

    public close()
    {
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);

        this.scene.removeChild(this.debugCamera);
        this.debugCamera = null;
        this.mainCamera.normalizedViewport = new Laya.Viewport(0, 0, 1, 1);
        this.isDebug = false;
    }

    public _update(state: Laya.RenderState): void
    {
        if (!this.isDebug) return;
        super._update(state);
        this.updateCamera(state.elapsedTime);
    }

    protected mouseDown(e: Laya.Event): void
    {
        this.debugCamera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }

    protected mouseUp(e: Laya.Event): void
    {
        this.isMouseDown = false;
    }

    protected mouseOut(e: Laya.Event): void
    {
        this.isMouseDown = false;
    }

    protected updateCamera(elapsedTime: number): void
    {

        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY))
        {
            let moveSpeedTemp = this.moveSpeed;

            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.SPACE))
            {
                this.debugCamera.transform.position = this.mainCamera.transform.position;
                this.debugCamera.transform.rotation = this.mainCamera.transform.rotation;
            }

            if (Laya.KeyBoardManager.hasKeyDown(Laya.Keyboard.SHIFT))
            {
                moveSpeedTemp += moveSpeedTemp;
            }
            Laya.KeyBoardManager.hasKeyDown(87) && this.debugCamera.moveForward(-moveSpeedTemp * elapsedTime);//W
            Laya.KeyBoardManager.hasKeyDown(83) && this.debugCamera.moveForward(moveSpeedTemp * elapsedTime);//S
            Laya.KeyBoardManager.hasKeyDown(65) && this.debugCamera.moveRight(-moveSpeedTemp * elapsedTime);//A
            Laya.KeyBoardManager.hasKeyDown(68) && this.debugCamera.moveRight(moveSpeedTemp * elapsedTime);//D
            Laya.KeyBoardManager.hasKeyDown(81) && this.debugCamera.moveVertical(moveSpeedTemp * elapsedTime);//Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.debugCamera.moveVertical(-moveSpeedTemp * elapsedTime);//E
            if (this.isMouseDown)
            {
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetY = Laya.stage.mouseY - this.lastMouseY;

                var yprElem: Float32Array = this.yawPitchRoll.elements;
                yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
                yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
                this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    }

    protected updateRotation(): void
    {
        var yprElem: Float32Array = this.yawPitchRoll.elements;
        if (Math.abs(yprElem[1]) < 1.50)
        {
            Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
            this.debugCamera.transform.localRotation = this.tempRotationZ;
        }
    }

}