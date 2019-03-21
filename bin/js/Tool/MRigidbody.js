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
var ForceMode;
(function (ForceMode) {
    ForceMode[ForceMode["Force"] = 0] = "Force";
    ForceMode[ForceMode["Acceleration"] = 1] = "Acceleration";
    ForceMode[ForceMode["Impulse"] = 2] = "Impulse";
    ForceMode[ForceMode["VelocityChange"] = 3] = "VelocityChange"; //添加一个瞬间速度变化给刚体，忽略它的质量。
})(ForceMode || (ForceMode = {}));
var MRigidbody = /** @class */ (function (_super) {
    __extends(MRigidbody, _super);
    function MRigidbody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fixedTimestep = 0.02;
        _this._bounciness = 0;
        _this._friction = 0;
        _this._gravity = 9.8;
        _this._mass = 1;
        _this._grag = 0;
        _this._useGravity = false;
        _this._ground = 0;
        _this.isStart = false;
        _this.frictionForce = null;
        _this.gravityForce = null;
        _this.force = null;
        _this.forceMode = null;
        _this.acceleration = Vector3.ZERO.clone();
        _this.velocity = Vector3.ZERO.clone();
        _this.initVelocity = Vector3.ZERO.clone();
        return _this;
    }
    MRigidbody.prototype._load = function (owner) {
        this.obj = owner;
        this.transform = this.obj.transform;
        this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
    };
    Object.defineProperty(MRigidbody.prototype, "bounciness", {
        set: function (value) {
            this._bounciness = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "friction", {
        set: function (value) {
            this._friction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "gravity", {
        set: function (value) {
            this._gravity = value;
            this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "mass", {
        set: function (value) {
            this._mass = value;
            this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "grag", {
        set: function (value) {
            this._grag = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "useGravity", {
        set: function (value) {
            this._useGravity = value;
            this._gravity = value ? this._gravity : 0;
            this.gravityForce = new Vector3(0, -this._mass * this._gravity, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MRigidbody.prototype, "ground", {
        set: function (value) {
            this._ground = value;
        },
        enumerable: true,
        configurable: true
    });
    MRigidbody.prototype.addForce = function (force, mode) {
        if (mode === void 0) { mode = ForceMode.Force; }
        // Debug.log("force:",force);
        // Debug.log("addForce11:",force, this.velocity, " ", this.acceleration);
        this.force = force;
        this.forceMode = mode;
        // if (this.frictionForce == null)
        // {
        //     this.frictionForce = new Vector3(0, this._friction * this._mass * this._gravity, 0);
        // }
        if (this.forceMode == ForceMode.Force) {
            Vector3.scale(this.force, 1 / this._mass, this.acceleration); //F = ma
            Vector3.add(this.acceleration, this.gravityForce, this.acceleration);
        }
        else if (this.forceMode == ForceMode.Acceleration) {
            this.acceleration = this.force;
        }
        else if (this.forceMode == ForceMode.Impulse) {
            Vector3.scale(this.force, 1 / this._mass, this.acceleration); // F=ma
            Vector3.scale(this.force, 0.1, this.acceleration); // at(t=0.1)
            Vector3.add(this.velocity, this.acceleration, this.velocity);
            Vector3.add(this.initVelocity, this.acceleration, this.initVelocity);
            this.acceleration = new Vector3(0, -this._gravity, 0);
        }
        else if (this.forceMode == ForceMode.VelocityChange) {
            Vector3.add(this.velocity, this.force, this.velocity);
        }
        if (!this.isStart) {
            this.isStart = true;
            Laya.timer.loop(this.fixedTimestep * 1000, this, this.update);
        }
        // Debug.log("addForce:", this.velocity, " ", this.acceleration);
    };
    MRigidbody.prototype.setVelocity = function (velocity) {
        this.acceleration = new Vector3(0, -this._gravity, 0);
        this.velocity = velocity.clone();
        this.initVelocity = this.velocity.clone();
        if (!this.isStart) {
            this.isStart = true;
            Laya.timer.loop(this.fixedTimestep * 1000, this, this.update);
        }
    };
    MRigidbody.prototype.addListenter = function (end) {
        this.endHander = end;
    };
    MRigidbody.prototype.getVelocity = function () {
        return this.velocity;
    };
    MRigidbody.prototype.clear = function () {
        this.acceleration = Vector3.ZERO.clone();
        this.velocity = Vector3.ZERO.clone();
        this.initVelocity = Vector3.ZERO.clone();
        this.isStart = false;
        Laya.timer.clear(this, this.update);
    };
    MRigidbody.prototype.update = function () {
        if (!this.isStart) {
            return;
        }
        this.updatePos();
        if (this.transform.position.y <= this._ground && this._bounciness == 0) {
            this.end();
            return;
        }
        else if (this.transform.position.y <= this._ground && this._bounciness != 0) {
            // this.transform.position = new Vector3(this.transform.position.x, 0, this.transform.position.y);
            this.velocity = new Vector3(this.velocity.x * this._bounciness, -this.velocity.y * this._bounciness, this.velocity.z * this._bounciness);
        }
    };
    MRigidbody.prototype.updatePos = function () {
        var addVelocity = Vector3.ZERO.clone();
        Vector3.scale(this.acceleration, this.fixedTimestep, addVelocity);
        Vector3.add(this.velocity, addVelocity, this.velocity);
        var move = Vector3.ZERO.clone();
        Vector3.scale(this.acceleration, 0.5 * this.fixedTimestep * this.fixedTimestep, move);
        var vt = Vector3.ZERO.clone();
        Vector3.scale(this.velocity, this.fixedTimestep, vt);
        Vector3.add(vt, move, move);
        // let move: Vector3 = Vector3.ZERO.clone();
        // Vector3.scale(this.velocity, this.fixedTimestep, move);
        if (this.transform.position.y + move.y < this._ground) {
            var rate = (this.transform.position.y - this._ground) / Math.abs(move.y);
            Vector3.scale(move, rate, move);
        }
        this.transform.translate(move, false);
    };
    MRigidbody.prototype.end = function () {
        this.clear();
        if (this.endHander != null) {
            this.endHander.run();
        }
    };
    return MRigidbody;
}(Laya.Script));
//# sourceMappingURL=MRigidbody.js.map