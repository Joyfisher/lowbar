let _ = {};

_.identity = function (value) {
    return value;
};

_.first = function (array, n) {
    if (arguments.length === 1) {
        return array.shift();
    } else if (arguments.length === 2) {
        return array.slice(0, n);
    }
};

_.last = function (array, n) {
    if (arguments.length === 1) {
        return array.pop();
    } else if (arguments.length === 2) {
        return array.slice(-n);
    }
};

_.each = function (array, func) {
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        func(item, i);
    }
};

if (typeof module !== 'undefined') {
    module.exports = _;
}