
/**
 *attribute vec4 a_Position;
 attribute vec2 a_Texcoord;
 attribute vec3 a_Normal;
 uniform mat4 u_MvpMatrix;
 uniform mat4 u_WorldMat;
 varying vec2 v_Texcoord;
 varying vec2 V_RefracTex;
 varying vec3 v_Normal;
 #ifdef BONE
 attribute vec4 a_BoneIndices;
 attribute vec4 a_BoneWeights;
 const int c_MaxBoneCount = 24;
 uniform mat4 u_Bones[c_MaxBoneCount];
 #endif
 #if defined(DIRECTIONLIGHT)
 varying vec3 v_PositionWorld;
 #endif
 #ifdef TILINGOFFSET
 uniform vec4 u_TilingOffset;
 #endif
 void main(){
     #ifdef BONE
     mat4 skinTransform=mat4(0.0);
     skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
     skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
     skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
     skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
     vec4 position = skinTransform * a_Position;
     gl_Position=u_MvpMatrix * position;
     mat3 worldMat=mat3(u_WorldMat * skinTransform);
     #else
     gl_Position=u_MvpMatrix * a_Position;
     mat3 worldMat=mat3(u_WorldMat);
     #endif
     v_Texcoord=a_Texcoord;
     #ifdef TILINGOFFSET
 	 v_Texcoord=(vec2(v_Texcoord.x,v_Texcoord.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;
 	 v_Texcoord=vec2(v_Texcoord.x,1.0+v_Texcoord.y);
 	 #endif
     v_Normal=worldMat*a_Normal;
     #if defined(DIRECTIONLIGHT)
     #ifdef BONE
     v_PositionWorld=(u_WorldMat*position).xyz;
     #else
     v_PositionWorld=(u_WorldMat*a_Position).xyz;
     #endif
     #endif
    }", "#ifdef FSHIGHPRECISION
     precision highp float;
     #else
     precision mediump float;
     #endif
     #include 'LightHelper.glsl';
     varying vec2 v_Texcoord;
     uniform sampler2D u_texture;
     uniform vec4 u_Color;
     varying vec3 v_Normal;
     #if defined(DIRECTIONLIGHT)
     uniform vec3 u_CameraPos;
     varying vec3 v_PositionWorld;
     #endif
     #ifdef FOG
    uniform float u_FogStart;
    uniform float u_FogRange;
    #ifdef ADDTIVEFOG
    #else
    uniform vec3 u_FogColor;
    #endif
    #endif
     void main(){
         vec4 c=texture2D(u_texture,v_Texcoord);
         gl_FragColor = c * u_Color;
         #ifdef FOG
		float lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);
		#ifdef ADDTIVEFOG
			gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);
		#else
			gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);
		#endif
	#endif}
 */

class DiffuseShader extends Laya.BaseMaterial
{
    constructor()
    {
        super();
        this.setShaderName(DiffuseShader.ShaderName);
        this.color = new Vector4(1, 0, 0, 1);
        this.diffuseTexture = new Laya.SolidColorTexture2D(this.color);
        this.tilingOffset = new Vector4(1, 1, 0, 0);
    }

    private static COLOR = 0;
    private static DIFFUSETEXTURE = 1;
    private static TILINGOFFSET = 2;
    private static SHADERDEFINE_TILINGOFFSET = 0;
    private static ShaderName = "DiffuseShader";

    public set diffuseTexture(value: Laya.BaseTexture)
    {
        this._setTexture(DiffuseShader.DIFFUSETEXTURE, value);
    }

    public get diffuseTexture(): Laya.BaseTexture
    {
        return this._getTexture(DiffuseShader.DIFFUSETEXTURE);
    }

    public set color(value)
    {
        this._setColor(DiffuseShader.COLOR, value);
    }

    public get color()
    {
        return this._getColor(DiffuseShader.COLOR);
    }

    public set tilingOffset(value: Vector4)
    {
        if (value)
        {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
            {
                this._addShaderDefine(DiffuseShader.SHADERDEFINE_TILINGOFFSET);
            }
            else
                this._removeShaderDefine(DiffuseShader.SHADERDEFINE_TILINGOFFSET);
        } else
        {
            this._removeShaderDefine(DiffuseShader.SHADERDEFINE_TILINGOFFSET);
        }
        this._setColor(DiffuseShader.TILINGOFFSET, value);
    }

    public get tilingOffset()
    {
        return this._getColor(DiffuseShader.TILINGOFFSET);
    }

    public set renderMode(value: number)
    {
        switch (value)
        {
            case 0:
                this.renderQueue =/*laya.d3.core.material.BaseMaterial.RENDERQUEUE_OPAQUE*/2000;
                this.depthWrite = true;
                this.cull = 2;
                this.blend = 0;
                this.alphaTest = false;
                this.depthTest = 0x0201;
                break;
            case 1:
                this.depthWrite = true;
                this.cull = 2;
                this.blend = 0;
                this.renderQueue =/*laya.d3.core.material.BaseMaterial.RENDERQUEUE_OPAQUE*/2000;
                this.alphaTest = true;
                this.depthTest = 0x0201;
                break;
            case 2:
                this.renderQueue =/*laya.d3.core.material.BaseMaterial.RENDERQUEUE_TRANSPARENT*/3000;
                this.depthWrite = false;
                this.cull = 2;
                this.blend = 1;
                this.srcBlend = 0x0302;
                this.dstBlend = 0x0303;
                this.alphaTest = false;
                this.depthTest = 0x0201;
                break;
            case 3:
                this.renderQueue =/*laya.d3.core.material.BaseMaterial.RENDERQUEUE_TRANSPARENT*/3000;
                this.depthWrite = false;
                this.cull = 2;
                this.blend = 1;
                this.srcBlend = 0x0302;
                this.dstBlend = 1;
                this.alphaTest = false;
                this.depthTest = 0x0201;
                break;
            default:
                throw new Error("Material:renderMode value error.");
        }
    }

    public static initShader()
    {
        let attributeMap = {
            a_BoneIndices: Laya.VertexElementUsage.BLENDINDICES0,
            a_BoneWeights: Laya.VertexElementUsage.BLENDWEIGHT0,
            a_Position: Laya.VertexElementUsage.POSITION0,
            a_Normal: Laya.VertexElementUsage.NORMAL0,
            a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0,
        };
        let uniformMap = {
            u_Bones: [Laya.SkinnedMeshSprite3D.BONES, Laya.Shader3D.PERIOD_RENDERELEMENT],
            u_CameraPos: [Laya.BaseCamera.CAMERAPOS, Laya.Shader3D.PERIOD_CAMERA],
            u_MvpMatrix: [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            u_WorldMat: [Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            u_texture: [DiffuseShader.DIFFUSETEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
            u_Color: [DiffuseShader.COLOR, Laya.Shader3D.PERIOD_MATERIAL],
            u_TilingOffset: [DiffuseShader.TILINGOFFSET, Laya.Shader3D.PERIOD_MATERIAL],
            u_FogStart: [Laya.Scene.FOGSTART, Laya.Shader3D.PERIOD_SCENE],
            u_FogRange: [Laya.Scene.FOGRANGE, Laya.Shader3D.PERIOD_SCENE],
            u_FogColor: [Laya.Scene.FOGCOLOR, Laya.Shader3D.PERIOD_SCENE],
        }

        let n = Laya.Shader3D.nameKey.add(DiffuseShader.ShaderName);
        // Laya.ShaderCompile3D.add(n, "attribute vec4 a_Position;\n attribute vec2 a_Texcoord;\n attribute vec3 a_Normal;\n uniform mat4 u_MvpMatrix;\n uniform mat4 u_WorldMat;\n varying vec2 v_Texcoord;\n varying vec2 V_RefracTex;\n varying vec3 v_Normal;\n #ifdef BONE\n attribute vec4 a_BoneIndices;\n attribute vec4 a_BoneWeights;\n const int c_MaxBoneCount = 24;\n uniform mat4 u_Bones[c_MaxBoneCount];\n #endif\n #if defined(DIRECTIONLIGHT)\n varying vec3 v_PositionWorld;\n #endif\n void main(){\n     #ifdef BONE\n     mat4 skinTransform=mat4(0.0);\n     skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n     skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n     skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n     skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n     vec4 position = skinTransform * a_Position;\n     gl_Position=u_MvpMatrix * position;\n     mat3 worldMat=mat3(u_WorldMat * skinTransform);\n     #else\n     gl_Position=u_MvpMatrix * a_Position;\n     mat3 worldMat=mat3(u_WorldMat);\n     #endif\n     v_Texcoord=a_Texcoord;\n     v_Normal=worldMat*a_Normal;\n     #if defined(DIRECTIONLIGHT)\n     #ifdef BONE\n     v_PositionWorld=(u_WorldMat*position).xyz;\n     #else\n     v_PositionWorld=(u_WorldMat*a_Position).xyz;\n     #endif\n     #endif\n    }", "#ifdef FSHIGHPRECISION\n     precision highp float;\n     #else\n     precision mediump float;\n     #endif\n     #include 'LightHelper.glsl';\n     varying vec2 v_Texcoord;\n     uniform sampler2D u_texture;\n     uniform vec4 u_Color;\n     varying vec3 v_Normal;\n     #if defined(DIRECTIONLIGHT)\n     uniform vec3 u_CameraPos;\n     varying vec3 v_PositionWorld;\n     #endif\n     #ifdef FOG\n    uniform float u_FogStart;\n    uniform float u_FogRange;\n    #ifdef ADDTIVEFOG\n    #else\n    uniform vec3 u_FogColor;\n    #endif\n    #endif\n     void main(){\n         vec4 c=texture2D(u_texture,v_Texcoord);\n         gl_FragColor = c * u_Color;\n         #ifdef FOG\n		float lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\n		#ifdef ADDTIVEFOG\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n		#else\n			gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n		#endif\n	#endif\n}", attributeMap, uniformMap)
        let shaderCompile3D = Laya.ShaderCompile3D.add(n, "attribute vec4 a_Position;\nattribute vec2 a_Texcoord;\nattribute vec3 a_Normal;\nuniform mat4 u_MvpMatrix;\nuniform mat4 u_WorldMat;\nvarying vec2 v_Texcoord;\nvarying vec2 V_RefracTex;\nvarying vec3 v_Normal;\n#ifdef BONE\nattribute vec4 a_BoneIndices;\nattribute vec4 a_BoneWeights;\nconst int c_MaxBoneCount = 24;\nuniform mat4 u_Bones[c_MaxBoneCount];\n#endif\n#if defined(DIRECTIONLIGHT)\nvarying vec3 v_PositionWorld;\n#endif\n#ifdef TILINGOFFSET\nuniform vec4 u_TilingOffset;\n#endif\nvoid main(){\n#ifdef BONE\nmat4 skinTransform=mat4(0.0);\nskinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\nskinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\nskinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\nskinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\nvec4 position = skinTransform * a_Position;\ngl_Position=u_MvpMatrix * position;\nmat3 worldMat=mat3(u_WorldMat * skinTransform);\n#else\ngl_Position=u_MvpMatrix * a_Position;\nmat3 worldMat=mat3(u_WorldMat);\n#endif\nv_Texcoord=a_Texcoord;\n#ifdef TILINGOFFSET\nv_Texcoord=(vec2(v_Texcoord.x,v_Texcoord.y-1.0)*u_TilingOffset.xy)+u_TilingOffset.zw;\nv_Texcoord=vec2(v_Texcoord.x,1.0+v_Texcoord.y);\n#endif\nv_Normal=worldMat*a_Normal;\n#if defined(DIRECTIONLIGHT)\n#ifdef BONE\nv_PositionWorld=(u_WorldMat*position).xyz;\n#else\nv_PositionWorld=(u_WorldMat*a_Position).xyz;\n#endif\n#endif\n}", "#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#include 'LightHelper.glsl';\nvarying vec2 v_Texcoord;\nuniform sampler2D u_texture;\nuniform vec4 u_Color;\nvarying vec3 v_Normal;\n#if defined(DIRECTIONLIGHT)\nuniform vec3 u_CameraPos;\nvarying vec3 v_PositionWorld;\n#endif\n#ifdef FOG\nuniform float u_FogStart;\nuniform float u_FogRange;\n#ifdef ADDTIVEFOG\n#else\nuniform vec3 u_FogColor;\n#endif\n#endif\nvoid main(){\nvec4 c=texture2D(u_texture,v_Texcoord);\ngl_FragColor = c * u_Color;\n#ifdef FOG\nfloat lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\n#ifdef ADDTIVEFOG\ngl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(0.0,0.0,0.0),lerpFact);\n#else\ngl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n#endif\n#endif\n}", attributeMap, uniformMap)
        DiffuseShader.SHADERDEFINE_TILINGOFFSET = shaderCompile3D.registerMaterialDefine("TILINGOFFSET");
    }
}