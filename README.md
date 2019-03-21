# LayaTool
LayaAir3D游戏开发工具
===============
一、DebugTool调试开发工具
------------------
通过`DebugTool.init`初始化，需传入当前场景（Laya.Scene）和当前相机（Laya.Camera）

## 1.Debug控制台打印
`Debug.log` `Debug.logError` `Debug.logWarning` 控制台打印，可传入多个需打印消息，可直接`Laya.Vector2`,`Laya.Vector3`,`Laya.Vector4`,`Laya.Quaternion`

```typescript
Debug.log("pos:", new Laya.Vector3(1,1,1))
```
控制台输出:`pos:(1,1,1)`

## 2.Debug场景
游戏运行后通过按键`F1`可开启与Unity类似的Debug调试场景，左边为Scene窗口，右边为Game窗口，与Unity的Scene场景类似可通过按键`W,A,S,D,鼠标右键`浏览场景

## 3.Gizmos绘制辅助线
类似Unity的Gizmos类。需开启Debug场景，通过Gizmos在Debug场景绘制相应辅助线
```typescript
Gizmos.drawXYZ(new Vector3(0, 0, 0), 3);// 以点(0,0,0)画XYZ坐标系
Gizmos.drawCube(new Vector3(0, 0, 0), new Vector3(1, 1, 1));// 以中点(0,0,0)画边长为1的正方体
Gizmos.drawLine(new Vector3(0, 0, 0), new Vector3(3, 3, 3));// 画起点(0, 0, 0),终点为(3, 3, 3)的线
Gizmos.drawCirle(new Vector3(0, 0, 0), 3);// 以中点(0,0,0)画半径为3的正方体
```

***示例工程Laya 1.7.20.2beata***

...
