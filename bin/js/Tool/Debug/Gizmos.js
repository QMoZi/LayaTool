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
var GizmosXYZ = /** @class */ (function () {
    function GizmosXYZ(center, length) {
        if (length === void 0) { length = 2; }
        this.length = 2;
        this.center = center;
        this.length = length;
    }
    GizmosXYZ.prototype.getCenter = function () {
        return this.center;
    };
    GizmosXYZ.prototype.drawGizmos = function (phasorSprite3D) {
        if (this.center == null) {
            return;
        }
        var toX = new Vector3(this.center.x + Vector3.UnitX.x * this.length, this.center.y, this.center.z);
        var toY = new Vector3(this.center.x, this.center.y + Vector3.UnitY.y * this.length, this.center.z);
        var toZ = new Vector3(this.center.x, this.center.y, this.center.z + Vector3.UnitZ.z * this.length);
        phasorSprite3D.line(this.center, new Laya.Vector4(1, 0, 0, 1), toX, new Laya.Vector4(1, 0, 0, 1));
        phasorSprite3D.line(this.center, new Laya.Vector4(0, 1, 0, 1), toY, new Laya.Vector4(0, 1, 0, 1));
        phasorSprite3D.line(this.center, new Laya.Vector4(0, 0, 1, 1), toZ, new Laya.Vector4(0, 0, 1, 1));
    };
    return GizmosXYZ;
}());
var GizmosCube = /** @class */ (function () {
    function GizmosCube(center, size) {
        if (size === void 0) { size = Vector3.ONE; }
        this.size = Vector3.ONE;
        this.center = center;
        this.size = size.clone();
        Vector3.scale(this.size, 0.5, this.size);
    }
    GizmosCube.prototype.getCenter = function () {
        return this.center;
    };
    GizmosCube.prototype.drawGizmos = function (phasorSprite3D) {
        if (this.center == null) {
            return;
        }
        var point1 = new Vector3(this.center.x + this.size.x, this.center.y + this.size.y, this.center.z + this.size.z);
        var point2 = new Vector3(this.center.x - this.size.x, this.center.y + this.size.y, this.center.z + this.size.z);
        var point3 = new Vector3(this.center.x + this.size.x, this.center.y + this.size.y, this.center.z - this.size.z);
        var point4 = new Vector3(this.center.x - this.size.x, this.center.y + this.size.y, this.center.z - this.size.z);
        var point5 = new Vector3(this.center.x + this.size.x, this.center.y - this.size.y, this.center.z + this.size.z);
        var point6 = new Vector3(this.center.x - this.size.x, this.center.y - this.size.y, this.center.z + this.size.z);
        var point7 = new Vector3(this.center.x + this.size.x, this.center.y - this.size.y, this.center.z - this.size.z);
        var point8 = new Vector3(this.center.x - this.size.x, this.center.y - this.size.y, this.center.z - this.size.z);
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
    };
    return GizmosCube;
}());
var GizmosCirle = /** @class */ (function () {
    function GizmosCirle(center, radius) {
        if (radius === void 0) { radius = 1; }
        this.radius = 1;
        this.pointNum = 100;
        this.center = center;
        this.radius = radius;
        this.eachAngle = 360 / this.pointNum;
    }
    GizmosCirle.prototype.getCenter = function () {
        return this.center;
    };
    GizmosCirle.prototype.drawGizmos = function (phasorSprite3D) {
        if (this.center == null) {
            return;
        }
        var beginPoint = Vector3.ZERO.clone();
        var firstPoint = Vector3.ZERO.clone();
        for (var i = 0; i < 360; i += this.eachAngle) {
            var x = this.radius * Math.cos(2 * Math.PI / 360 * i);
            var z = this.radius * Math.sin(2 * Math.PI / 360 * i);
            var endPoint = new Vector3(x, 0, z);
            Vector3.add(this.center, endPoint, endPoint);
            if (i == 0) {
                firstPoint = endPoint;
            }
            else {
                phasorSprite3D.line(beginPoint, new Laya.Vector4(1, 0, 0, 1), endPoint, new Laya.Vector4(1, 0, 0, 1));
            }
            beginPoint = endPoint;
        }
        phasorSprite3D.line(beginPoint, new Laya.Vector4(1, 0, 0, 1), firstPoint, new Laya.Vector4(1, 0, 0, 1));
    };
    return GizmosCirle;
}());
var GizmosLine = /** @class */ (function () {
    function GizmosLine(start, end) {
        this.start = start;
        this.end = end;
    }
    GizmosLine.prototype.getCenter = function () {
        return this.start;
    };
    GizmosLine.prototype.drawGizmos = function (phasorSprite3D) {
        if (this.start == null || this.end == null) {
            return;
        }
        phasorSprite3D.line(this.start, new Laya.Vector4(0, 1, 0, 1), this.end, new Laya.Vector4(1, 0, 0, 1));
    };
    return GizmosLine;
}());
var Gizmos = /** @class */ (function (_super) {
    __extends(Gizmos, _super);
    function Gizmos() {
        var _this = _super.call(this) || this;
        Gizmos.phasorSprite3D = new Laya.PhasorSpriter3D();
        Gizmos.color = new Laya.Vector4(1, 0, 0, 1);
        return _this;
    }
    Gizmos.drawLine = function (start, end) {
        var gizmosLine = new GizmosLine(start, end);
        this.drawGizmos.push(gizmosLine);
    };
    Gizmos.drawXYZ = function (center, length) {
        if (length === void 0) { length = 2; }
        var gizmosXYZ = new GizmosXYZ(center, length);
        this.drawGizmos.push(gizmosXYZ);
    };
    Gizmos.drawCube = function (center, size) {
        if (size === void 0) { size = Vector3.ONE; }
        var gizmosCube = new GizmosCube(center, size);
        this.drawGizmos.push(gizmosCube);
    };
    Gizmos.drawCirle = function (center, radius) {
        if (radius === void 0) { radius = 1; }
        for (var i = 0; i < this.drawGizmos.length; i++) {
            if (this.drawGizmos[i].getCenter() == center) {
                this.drawGizmos.splice(i, 1);
                break;
            }
        }
        var gizmosCirle = new GizmosCirle(center, radius);
        this.drawGizmos.push(gizmosCirle);
    };
    Gizmos.prototype.show = function (camera) {
        Gizmos.camera = camera;
        Gizmos.isDraw = true;
    };
    Gizmos.prototype.close = function () {
        Gizmos.isDraw = false;
    };
    Gizmos.prototype._postRenderUpdate = function (state) {
        if (!Gizmos.isDraw)
            return;
        Gizmos.phasorSprite3D.begin(Laya.WebGLContext.LINES, Gizmos.camera);
        for (var i = 0; i < Gizmos.drawGizmos.length; i++) {
            Gizmos.drawGizmos[i].drawGizmos(Gizmos.phasorSprite3D);
        }
        Gizmos.phasorSprite3D.end();
    };
    Gizmos.color = new Laya.Vector4(1, 0, 0, 1);
    Gizmos.isDraw = false;
    Gizmos.drawGizmos = [];
    return Gizmos;
}(Laya.Script));
//# sourceMappingURL=Gizmos.js.map