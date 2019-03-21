var BezierTool = /** @class */ (function () {
    function BezierTool(p0, p1, p2, p3) {
        this.segmentNum = 100;
        this.v0 = p0;
        this.v1 = p1;
        this.v2 = p2;
        this.v3 = p3;
    }
    BezierTool.prototype.GetBezierPoint = function (t) {
        var u = 1 - t;
        var tt = t * t;
        var uu = u * u;
        var uuu = uu * u;
        var ttt = tt * t;
        var p = Vector3.ZERO.clone();
        Vector3.scale(this.v0, uuu, p);
        var p1 = Vector3.ZERO.clone();
        Vector3.scale(this.v1, 3 * uu * t, p1);
        var p2 = Vector3.ZERO.clone();
        Vector3.scale(this.v2, 3 * u * tt, p2);
        var p3 = Vector3.ZERO.clone();
        Vector3.scale(this.v3, ttt, p3);
        Vector3.add(p, p1, p);
        Vector3.add(p, p2, p);
        Vector3.add(p, p3, p);
        return p;
    };
    BezierTool.prototype.GetBezierPath = function (segmentNumTemp) {
        var path = [];
        for (var i = 0; i <= segmentNumTemp; i++) {
            path.push(this.GetBezierPoint(i / segmentNumTemp));
            // Gizmos.drawXYZ(this.GetBezierPoint(i / segmentNumTemp));
        }
        // for (let i = 0; i < this.segmentNum; i++)
        // {
        //     Gizmos.drawLine(path[i], path[i + 1]);
        // }
        return path;
    };
    return BezierTool;
}());
//# sourceMappingURL=BezierTool.js.map