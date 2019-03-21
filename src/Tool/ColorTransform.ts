class ColorTransform
{
    public static ColorToHex(color: Laya.Vector4): string
    {
        let r: number = Math.round(color.x * 255);
        let g: number = Math.round(color.y * 255);
        let b: number = Math.round(color.z * 255);
        let a: number = Math.round(color.w * 255);
        let hex: string = r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16);
        return hex;
    }

    public static HexToColor(hex: string): Laya.Vector4
    {
        if(hex.substring(0,1) == "#")
        {
            hex = hex.substring(1,hex.length);
        }
        let r: number = parseInt(hex.substring(0, 2), 16);
        let g: number = parseInt(hex.substring(2, 4), 16);
        let b: number = parseInt(hex.substring(4, 6), 16);
        let a: number = parseInt(hex.substring(6, 8), 16) || 255;
        return new Laya.Vector4(r / 255, g / 255, b / 255, a / 255);
    }
}
