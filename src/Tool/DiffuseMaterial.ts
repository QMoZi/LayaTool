class DiffuseMaterial extends Laya.Script
{
    private material: DiffuseShader;
    private color: Vector4;

    private currentOffsetX: number = 0;
    private currentOffsetY: number = 0;
    private offsetXSpeed: number;
    private offsetYSpeed: number;

    public setMaterial(meshSprite: MeshSprite3D)
    {
        if (meshSprite == null)
        {
            return;
        }

        let bpMaterial: Laya.StandardMaterial = meshSprite.meshRender.material as Laya.StandardMaterial;
        if (bpMaterial == null)
        {
            Debug.logError(meshSprite.name, " not BlinnPhongMaterial");
            return;
        }

        DiffuseShader.initShader();
        this.material = new DiffuseShader();
        if (bpMaterial.diffuseTexture != null)
        {
            this.material.diffuseTexture = bpMaterial.diffuseTexture;
        }
        this.color = bpMaterial.albedoColor;
        this.material.color = bpMaterial.albedoColor;
        meshSprite.meshRender.material = this.material;
    }

    public setColor(color: Vector4)
    {
        if (this.material == null)
        {
            Debug.logError("setColor error:not have material");
            return;
        }

        this.color = color;
        this.material.color = color;
    }

    public setAlbedo(albedo: number)
    {
        if (this.material == null)
        {
            Debug.logError("setAlbedo error:not have material");
            return;
        }

        this.color = new Vector4(this.color.x, this.color.y, this.color.z, albedo);
        this.material.color = this.color;
    }

    public setTexture(texture: Laya.BaseTexture)
    {
        if (this.material == null)
        {
            Debug.logError("setTexture error: not have material");
            return;
        }
        this.material.diffuseTexture = texture;
    }

    public setRenderMode(value: number)
    {
        if (this.material == null)
        {
            Debug.logError("setRenderMode error: not have material");
            return;
        }
        this.material.renderMode = value;
    }

    public setOffset(x: number, y: number)
    {
        if (this.material == null)
        {
            Debug.logError("setOffsetY error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, x, y);
    }

    public setOffsetX(value: number)
    {
        if (this.material == null)
        {
            Debug.logError("setOffsetX error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, value, 0);
    }

    public setOffsetY(value: number)
    {
        if (this.material == null)
        {
            Debug.logError("setOffsetY error: not have material");
            return;
        }
        this.material.tilingOffset = new Vector4(1, 1, 0, value);
    }

    public setOffsetAni(offsetXSpeed: number, offsetYSpeed: number)
    {
        if (this.material == null)
        {
            Debug.logError("setOffsetY error: not have material");
            return;
        }

        this.offsetXSpeed = offsetXSpeed;
        this.offsetYSpeed = offsetYSpeed;
        Laya.timer.loop(10, this, this.updateOffsetAni)
    }

    private updateOffsetAni()
    {
        this.currentOffsetX += this.offsetXSpeed;
        this.currentOffsetY += this.offsetYSpeed;
        this.setOffset(this.currentOffsetX, this.currentOffsetY);
    }
}