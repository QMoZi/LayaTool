class Debug
{

    private static isDebug: boolean = false;

    constructor()
    {
    }

    public static init()
    {
        this.isDebug = true;
    }

    public static log(...msgs)
    {
        if (!this.isDebug) return;
        console.log(this.getLogMsg(msgs));
    }

    public static logError(...msgs)
    {
        if (!this.isDebug) return;
        console.error(this.getLogMsg(msgs));
    }

    public static LogWarning(...msgs)
    {
        if (!this.isDebug) return;
        console.error(this.getLogMsg(msgs));
    }

    private static getLogMsg(msgs): string
    {
        let logMsg: string = ""

        for (let msg of msgs)
        {
            if (typeof msg === "string")
            {
                logMsg += msg;
            }
            else if (msg === undefined)
            {
                logMsg += "undefined";
            }
            else if (msg === null)
            {
                logMsg += "null";
            }
            else if (msg.constructor === Laya.Vector2)
            {
                logMsg += "(" + msg.x + "," + msg.y + ")";
            }

            else if (msg.constructor === Vector3)
            {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + ")";
            }

            else if (msg.constructor === Laya.Vector4)
            {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + "," + msg.w + ")";
            }

            else if (msg.constructor === Laya.Quaternion)
            {
                logMsg += "(" + msg.x + "," + msg.y + "," + msg.z + "," + msg.w + ")";
            }
            else
            {
                logMsg += msg;
            }
        }
        return logMsg;
    }
}