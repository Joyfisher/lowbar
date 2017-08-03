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

_.indexOf = function (array, index) {
    array = array || [];
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (i === index) {
            return count - 1;
        } else {
            count++;
        }
    }
    return -1;
};

_.filter = function (array, func) {
    array = array || [];
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (func(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};

_.reject = function (array, func) {
    array = array || [];
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (!func(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};

if (typeof module !== 'undefined') {
    module.exports = _;
}