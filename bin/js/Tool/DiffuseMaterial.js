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
var DiffuseMaterial = /** @class */ (function (_super) {
    __extends(DiffuseMaterial, _super);
    function DiffuseMaterial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentOffsetX = 0;
        _this.currentOffsetY = 0;
        return _this;
    }
    DiffuseMaterial.prototype.setMaterial = function (meshSprite) {
        if (meshSprite == null) {
            return;
        }
        var bpMaterial = meshSprite.meshRender.material;
        if (bpMaterial == null) {
            Debug.logError(meshSprite.name, " not BlinnPhongMaterial");
            return;
        }
        DiffuseShader.initShader();
        this.material = new DiffuseShader();
        if (bpMaterial.diffuseTexture != null) {
            this.material.diffuseTexture = bpMaterial.diffuseTexture;
        }
        this.color = bpMaterial.albedoColor;
        this.material.color = bpMaterial.albedoColor;
        meshSprite.meshRender.material = this.material;
    };
    DiffuseMaterial.prototype.setColor = function (color) {
        if (this.material == null) {
            Debug.logError("setColor error:not have material");
            return;
        }
        this.color = color;
        this.material.color = color;
    };
    DiffuseMaterial.prototype.setAlbedo = function (albedo) {
        if (this.material == null) {
            Debug.logError("setAlbedo error:not have material");
            return;
        }
        this.color = new Vector4(this.color.x, this.color.y, this.color.z, albedo);
        this.material.color = this.color;
    };
    DiffuseMaterial.prototype.setTexture = function (texture) {
        if (this.material == null) {
            Debug.logError("setTexture error: not have material");
            return;
        }
        this.material.diffuseTexture = texture;
    };
    DiffuseMaterial.prototype.setRenderMode = function (value) {
        if (this.material == null) {
            Debug.logError("setRenderMode error: not have material");
            return;
        }
        this.material.renderMode = value;
    };
    DiffuseMaterial.prototype.setOffset = function (x, y) {
        if (this.material == null) {
            Debug.logError("setOffsetY error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, x, y);
    };
    DiffuseMaterial.prototype.setOffsetX = function (value) {
        if (this.material == null) {
            Debug.logError("setOffsetX error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, value, 0);
    };
    DiffuseMaterial.prototype.setOffsetY = function (value) {
        if (this.material == null) {
            Debug.logError("setOffsetY error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, 0, value);
    };
    DiffuseMaterial.prototype.setOffsetAni = function (offsetXSpeed, offsetYSpeed) {
        if (this.material == null) {
            Debug.logError("setOffsetY error: not have material");
            return;
        }
        this.offsetXSpeed = offsetXSpeed;
        this.offsetYSpeed = offsetYSpeed;
        Laya.timer.loop(10, this, this.updateOffsetAni);
    };
    DiffuseMaterial.prototype.updateOffsetAni = function () {
        this.currentOffsetX += this.offsetXSpeed;
        this.currentOffsetY += this.offsetYSpeed;
        this.setOffset(this.currentOffsetX, this.currentOffsetY);
    };
    return DiffuseMaterial;
}(Laya.Script));
//# sourceMappingURL=DiffuseMaterial.js.map