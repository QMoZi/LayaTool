class DebugTool
{
    private static isDebug: boolean = false;
    private static isDebugScene: boolean = false;
    private static mainScene: Scene;
    private static mainCamera: Camera;
    private static debugCamera: Laya.Camera;
    private static debugScene: DebugScene;
    private static gizmos: Gizmos;

    public static init(scene: Scene, camera: Camera)
    {
        this.mainScene = scene;
        this.mainCamera = camera;
        this.isDebug = true;
        Debug.init();
        if (this.debugScene == null)
        {
            this.debugScene = this.mainScene.addScript(DebugScene) as DebugScene;
        }
        if (this.gizmos == null)
        {
            this.gizmos = this.mainScene.addScript(Gizmos) as Gizmos;
        }

        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }

    private static onKeyDown(e: Laya.Event = null)
    {
        if (e.keyCode == Laya.Keyboard.F1 && !this.isDebugScene)
        {
            this.debugScene.show(this.mainScene, this.mainCamera);
            this.debugCamera = this.debugScene.GetDebugCamera();
            this.gizmos.show(this.debugCamera);
            this.isDebugScene = true;
        }
        else if (e.keyCode == Laya.Keyboard.F1 && this.isDebugScene)
        {
            this.debugScene.close();
            this.gizmos.close();
            this.isDebugScene = false;
        }
    }
}