var ColorTransform = /** @class */ (function () {
    function ColorTransform() {
    }
    ColorTransform.ColorToHex = function (color) {
        var r = Math.round(color.x * 255);
        var g = Math.round(color.y * 255);
        var b = Math.round(color.z * 255);
        var a = Math.round(color.w * 255);
        var hex = r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
        return hex;
    };
    ColorTransform.HexToColor = function (hex) {
        if (hex.substring(0, 1) == "#") {
            hex = hex.substring(1, hex.length);
        }
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var a = parseInt(hex.substring(6, 8), 16) || 255;
        return new Laya.Vector4(r / 255, g / 255, b / 255, a / 255);
    };
    return ColorTransform;
}());
//# sourceMappingURL=ColorTransform.js.map