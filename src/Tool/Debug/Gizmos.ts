interface IGizmos
{
    getCenter(): Vector3;
    drawGizmos(phasorSprite3D: Laya.PhasorSpriter3D);
}

class GizmosXYZ implements IGizmos
{
    private center: Vector3;
    private length: number = 2;
    constructor(center: Vector3, length: number = 2)
    {
        this.center = center;
        this.length = length;
    }

    public getCenter(): Vector3
    {
        return this.center;
    }

    public drawGizmos(phasorSprite3D: Laya.PhasorSpriter3D)
    {
        if (this.center == null)
        {
            return;
        }
        let toX = new Vector3(this.center.x + Vector3.UnitX.x * this.length, this.center.y, this.center.z)
        let toY = new Vector3(this.center.x, this.center.y + Vector3.UnitY.y * this.length, this.center.z)
        let toZ = new Vector3(this.center.x, this.center.y, this.center.z + Vector3.UnitZ.z * this.length)

        phasorSprite3D.line(this.center, new Laya.Vector4(1, 0, 0, 1), toX, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(this.center, new Laya.Vector4(0, 1, 0, 1), toY, new Laya.Vector4(0, 1, 0, 1));
        phasorSprite3D.line(this.center, new Laya.Vector4(0, 0, 1, 1), toZ, new Laya.Vector4(0, 0, 1, 1));
    }
}

class GizmosCube implements IGizmos
{
    private center: Vector3;
    private size: Vector3 = Vector3.ONE;
    constructor(center: Vector3, size: Vector3 = Vector3.ONE)
    {
        this.center = center;
        this.size = size.clone();
        Vector3.scale(this.size, 0.5, this.size);
    }

    public getCenter(): Vector3
    {
        return this.center;
    }

    public drawGizmos(phasorSprite3D: Laya.PhasorSpriter3D)
    {
        if (this.center == null)
        {
            return;
        }

        let point1 = new Vector3(this.center.x + this.size.x, this.center.y + this.size.y, this.center.z + this.size.z);
        let point2 = new Vector3(this.center.x - this.size.x, this.center.y + this.size.y, this.center.z + this.size.z);
        let point3 = new Vector3(this.center.x + this.size.x, this.center.y + this.size.y, this.center.z - this.size.z);
        let point4 = new Vector3(this.center.x - this.size.x, this.center.y + this.size.y, this.center.z - this.size.z);
        let point5 = new Vector3(this.center.x + this.size.x, this.center.y - this.size.y, this.center.z + this.size.z);
        let point6 = new Vector3(this.center.x - this.size.x, this.center.y - this.size.y, this.center.z + this.size.z);
        let point7 = new Vector3(this.center.x + this.size.x, this.center.y - this.size.y, this.center.z - this.size.z);
        let point8 = new Vector3(this.center.x - this.size.x, this.center.y - this.size.y, this.center.z - this.size.z);

        phasorSprite3D.line(point1, new Laya.Vector4(1, 0, 0, 1), point2, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point3, new Laya.Vector4(1, 0, 0, 1), point4, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point1, new Laya.Vector4(1, 0, 0, 1), point3, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point2, new Laya.Vector4(1, 0, 0, 1), point4, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point5, new Laya.Vector4(1, 0, 0, 1), point6, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point7, new Laya.Vector4(1, 0, 0, 1), point8, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point5, new Laya.Vector4(1, 0, 0, 1), point7, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point6, new Laya.Vector4(1, 0, 0, 1), point8, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point1, new Laya.Vector4(1, 0, 0, 1), point5, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point2, new Laya.Vector4(1, 0, 0, 1), point6, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point3, new Laya.Vector4(1, 0, 0, 1), point7, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(point4, new Laya.Vector4(1, 0, 0, 1), point8, new Laya.Vector4(1, 0, 0, 1));
    }
}

class GizmosCirle implements IGizmos
{
    private center: Vector3;
    private radius: number = 1;
    private pointNum: number = 100;
    private eachAngle: number;

    constructor(center: Vector3, radius: number = 1)
    {
        this.center = center;
        this.radius = radius;
        this.eachAngle = 360 / this.pointNum;
    }

    public getCenter(): Vector3
    {
        return this.center;
    }

    public drawGizmos(phasorSprite3D: Laya.PhasorSpriter3D)
    {
        if (this.center == null)
        {
            return;
        }

        let beginPoint: Vector3 = Vector3.ZERO.clone();
        let firstPoint: Vector3 = Vector3.ZERO.clone();
        for (let i = 0; i < 360; i += this.eachAngle)
        {
            let x = this.radius * Math.cos(2 * Math.PI / 360 * i);
            let z = this.radius * Math.sin(2 * Math.PI / 360 * i);
            let endPoint: Vector3 = new Vector3(x, 0, z);
            Vector3.add(this.center, endPoint, endPoint);
            if (i == 0)
            {
                firstPoint = endPoint;
            }
            else
            {
                phasorSprite3D.line(beginPoint, new Laya.Vector4(1, 0, 0, 1), endPoint, new Laya.Vector4(1, 0, 0, 1));
            }
            beginPoint = endPoint;
        }
        phasorSprite3D.line(beginPoint, new Laya.Vector4(1, 0, 0, 1), firstPoint, new Laya.Vector4(1, 0, 0, 1));
    }
}

class GizmosLine implements IGizmos
{
    private start: Vector3;
    private end: Vector3;
    constructor(start: Vector3, end: Vector3)
    {
        this.start = start;
        this.end = end;
    }

    public getCenter(): Vector3
    {
        return this.start;
    }

    public drawGizmos(phasorSprite3D: Laya.PhasorSpriter3D)
    {
        if (this.start == null || this.end == null)
        {
            return;
        }
        phasorSprite3D.line(this.start, new Laya.Vector4(0, 1, 0, 1), this.end, new Laya.Vector4(1, 0, 0, 1));
    }
}

class Gizmos extends Laya.Script 
{
    public static camera: Laya.Camera;
    public static color: Laya.Vector4 = new Laya.Vector4(1, 0, 0, 1);
    private static isDraw: boolean = false;
    private static drawGizmos: IGizmos[] = [];

    private static phasorSprite3D: Laya.PhasorSpriter3D;

    constructor()
    {
        super();
        Gizmos.phasorSprite3D = new Laya.PhasorSpriter3D();
        Gizmos.color = new Laya.Vector4(1, 0, 0, 1);
    }

    public static drawLine(start: Vector3, end: Vector3)
    {
        let gizmosLine: GizmosLine = new GizmosLine(start, end);
        this.drawGizmos.push(gizmosLine);
    }

    public static drawXYZ(center: Vector3, length: number = 2)
    {
        let gizmosXYZ: GizmosXYZ = new GizmosXYZ(center, length);
        this.drawGizmos.push(gizmosXYZ);
    }

    public static drawCube(center: Vector3, size: Vector3 = Vector3.ONE)
    {
        let gizmosCube: GizmosCube = new GizmosCube(center, size);
        this.drawGizmos.push(gizmosCube);
    }

    public static drawCirle(center: Vector3, radius: number = 1)
    {
        for (let i = 0; i < this.drawGizmos.length; i++)
        {
            if (this.drawGizmos[i].getCenter() == center)
            {
                this.drawGizmos.splice(i, 1);
                break;
            }
        }
        let gizmosCirle: GizmosCirle = new GizmosCirle(center, radius);
        this.drawGizmos.push(gizmosCirle);
    }

    public show(camera: Laya.Camera): void
    {
        Gizmos.camera = camera;
        Gizmos.isDraw = true;
    }

    public close()
    {
        Gizmos.isDraw = false;
    }

    public _postRenderUpdate(state: Laya.RenderState): void
    {
        if (!Gizmos.isDraw) return;
        Gizmos.phasorSprite3D.begin(Laya.WebGLContext.LINES, Gizmos.camera);
        for (let i = 0; i < Gizmos.drawGizmos.length; i++)
        {
            Gizmos.drawGizmos[i].drawGizmos(Gizmos.phasorSprite3D);
        }
        Gizmos.phasorSprite3D.end();
    }
}