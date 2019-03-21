enum ForceMode
{
    Force,//添加一个可持续力到刚体，使用它的质量。
    Acceleration,//添加一个可持续加速度到刚体，忽略它的质量。
    Impulse,//添加一个瞬间冲击力到刚体，使用它的质量。
    VelocityChange//添加一个瞬间速度变化给刚体，忽略它的质量。
}
class MRigidbody extends Laya.Script
{
    private readonly fixedTimestep: number = 0.02;
    private _bounciness: number = 0;
    private _friction: number = 0;
    private _gravity: number = 9.8;
    private _mass: number = 1;
    private _grag: number = 0;
    private _useGravity: boolean = false;
    private _ground: number = 0;

    private isStart: boolean = false;
    private obj: Sprite3D;
    private transform: Laya.Transform3D;
    private frictionForce: Vector3 = null;
    private gravityForce: Vector3 = null;
    private force: Vector3 = null;
    private forceMode: ForceMode = null;
    private acceleration: Vector3 = Vector3.ZERO.clone();
    private velocity: Vector3 = Vector3.ZERO.clone();
    private initVelocity: Vector3 = Vector3.ZERO.clone();

    private endHander: Laya.Handler;

    public _load(owner: Sprite3D)
    {
        this.obj = owner as Sprite3D;
        this.transform = this.obj.transform;
        this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
    }

    public set bounciness(value: number)
    {
        this._bounciness = value;
    }

    public set friction(value: number)
    {
        this._friction = value;
    }

    public set gravity(value: number)
    {
        this._gravity = value;
        this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
    }

    public set mass(value: number)
    {
        this._mass = value;
        this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
    }

    public set grag(value: number)
    {
        this._grag = value;
    }

    public set useGravity(value: boolean)
    {
        this._useGravity = value;
        this._gravity = value ? this._gravity : 0;
        this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
    }

    public set ground(value: number)
    {
        this._ground = value;
    }

    public addForce(force: Vector3, mode: ForceMode = ForceMode.Force)
    {
        // Debug.log("force:",force);
        // Debug.log("addForce11:",force, this.velocity, " ", this.acceleration);
        this.force = force;
        this.forceMode = mode;

        // if (this.frictionForce == null)
        // {
        //     this.frictionForce = new Vector3(0, this._friction * this._mass * this._gravity, 0);
        // }

        if (this.forceMode == ForceMode.Force)
        {
            Vector3.scale(this.force, 1 / this._mass, this.acceleration); //F = ma
            Vector3.add(this.acceleration, this.gravityForce, this.acceleration);
        }
        else if (this.forceMode == ForceMode.Acceleration)
        {
            this.acceleration = this.force;
        }
        else if (this.forceMode == ForceMode.Impulse)
        {
            Vector3.scale(this.force, 1 / this._mass, this.acceleration); // F=ma
            Vector3.scale(this.force, 0.1, this.acceleration);  // at(t=0.1)
            Vector3.add(this.velocity, this.acceleration, this.velocity);
            Vector3.add(this.initVelocity, this.acceleration, this.initVelocity);
            this.acceleration = new Vector3(0, -this._gravity, 0);
        }
        else if (this.forceMode == ForceMode.VelocityChange)
        {
            Vector3.add(this.velocity, this.force, this.velocity);
        }

        if (!this.isStart)
        {
            this.isStart = true;
            Laya.timer.loop(this.fixedTimestep * 1000, this, this.update);
        }
        // Debug.log("addForce:", this.velocity, " ", this.acceleration);
    }

    public setVelocity(velocity: Vector3)
    {
        this.acceleration = new Vector3(0, -this._gravity, 0);
        this.velocity = velocity.clone();
        this.initVelocity = this.velocity.clone();
        if (!this.isStart)
        {
            this.isStart = true;
            Laya.timer.loop(this.fixedTimestep * 1000, this, this.update);
        }
    }

    public addListenter(end: Laya.Handler)
    {
        this.endHander = end;
    }

    public getVelocity(): Vector3
    {
        return this.velocity;
    }


    public clear()
    {
        this.acceleration = Vector3.ZERO.clone();
        this.velocity = Vector3.ZERO.clone();
        this.initVelocity = Vector3.ZERO.clone();
        this.isStart = false;
        Laya.timer.clear(this, this.update);
    }

    private update()
    {
        if (!this.isStart)
        {
            return;
        }

        this.updatePos();
        if (this.transform.position.y <= this._ground && this._bounciness == 0)
        {
            this.end();
            return;
        }
        else if (this.transform.position.y <= this._ground && this._bounciness != 0)
        {
            // this.transform.position = new Vector3(this.transform.position.x, 0, this.transform.position.y);
            this.velocity = new Vector3(this.velocity.x * this._bounciness, -this.velocity.y * this._bounciness, this.velocity.z * this._bounciness);
        }
    }

    private updatePos()
    {
        let addVelocity: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.acceleration, this.fixedTimestep, addVelocity);
        Vector3.add(this.velocity, addVelocity, this.velocity);

        let move: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.acceleration, 0.5 * this.fixedTimestep * this.fixedTimestep, move);
        let vt: Vector3 = Vector3.ZERO.clone();
        Vector3.scale(this.velocity, this.fixedTimestep, vt);
        Vector3.add(vt, move, move);
        // let move: Vector3 = Vector3.ZERO.clone();
        // Vector3.scale(this.velocity, this.fixedTimestep, move);

        if (this.transform.position.y + move.y < this._ground)
        {
            let rate: number = (this.transform.position.y - this._ground) / Math.abs(move.y);
            Vector3.scale(move, rate, move);
        }
        this.transform.translate(move, false);
    }

    private end()
    {
        this.clear();
        if (this.endHander != null)
        {
            this.endHander.run();
        }
    }

}