var Maths = /** @class */ (function () {
    function Maths() {
    }
    Maths.round = function (d, decimals) {
        return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };
    Maths.randomFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Maths.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    Maths.randomBoolean = function () {
        return Math.random() > 0.5 ? true : false;
    };
    Maths.randomArray = function (array) {
        var newArray = this.deepClone(array);
        newArray.sort(function g(a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        });
        return newArray;
    };
    Maths.deepClone = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    };
    return Maths;
}());
//# sourceMappingURL=Maths.js.map