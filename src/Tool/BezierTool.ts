class BezierTool
{
    public segmentNum: number = 100;

    public v0: Vector3;
    public v1: Vector3;
    public v2: Vector3;
    public v3: Vector3;

    constructor(p0: Vector3, p1: Vector3, p2: Vector3, p3: Vector3)
    {
        this.v0 = p0;
        this.v1 = p1;
        this.v2 = p2;
        this.v3 = p3;
    }

    public GetBezierPoint(t: number): Vector3 
    {
        let u: number = 1 - t;
        let tt: number = t * t;
        let uu: number = u * u;
        let uuu: number = uu * u;
        let ttt: number = tt * t;

        let p: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.v0, uuu, p);

        let p1: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.v1, 3 * uu * t, p1);

        let p2: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.v2, 3 * u * tt, p2);

        let p3: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.v3, ttt, p3);

        Vector3.add(p, p1, p);
        Vector3.add(p, p2, p);
        Vector3.add(p, p3, p);
        return p;
    }

    public GetBezierPath(segmentNumTemp: number): Vector3[]
    {
        let path: Vector3[] = [];
        for (let i = 0; i <= segmentNumTemp; i++)
        {
            path.push(this.GetBezierPoint(i / segmentNumTemp));
            // Gizmos.drawXYZ(this.GetBezierPoint(i / segmentNumTemp));
        }

        // for (let i = 0; i < this.segmentNum; i++)
        // {
        //     Gizmos.drawLine(path[i], path[i + 1]);
        // }
        return path;
    }
}