var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.keys = [];
        this.values = [];
    }
    Object.defineProperty(Dictionary.prototype, "count", {
        get: function () {
            return this.Count();
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.Add = function (key, value) {
        this.keys.push(key);
        return this.values.push(value);
    };
    Dictionary.prototype.Remove = function (key) {
        var index = this.keys.indexOf(key, 0);
        this.RemoveAt(index);
    };
    Dictionary.prototype.RemoveAt = function (index) {
        if (index >= this.keys.length) {
            return false;
        }
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
        return true;
    };
    Dictionary.prototype.Count = function () {
        return this.keys.length;
    };
    Dictionary.prototype.SetDicValue = function (key, value) {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            this.keys[index] = key;
            this.values[index] = value;
            return true;
        }
        return false;
    };
    Dictionary.prototype.TryGetValue = function (key) {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            return this.values[index];
        }
        return null;
    };
    Dictionary.prototype.ContainsKey = function (key) {
        var ks = this.keys;
        for (var i = 0; i < ks.length; ++i) {
            if (ks[i] == key) {
                return true;
                ;
            }
        }
        return false;
    };
    Dictionary.prototype.GetKeyAt = function (index) {
        if (index >= this.keys.length) {
            return null;
        }
        return this.keys[index];
    };
    Dictionary.prototype.GetValueAt = function (index) {
        if (index >= this.values.length) {
            return null;
        }
        return this.values[index];
    };
    Dictionary.prototype.GetKeys = function () {
        return this.keys;
    };
    Dictionary.prototype.GetValues = function () {
        return this.values;
    };
    return Dictionary;
}());
//# sourceMappingURL=Dictionary.js.map