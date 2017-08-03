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
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (!func(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
};

_.uniq = function (array) {
    array = array || [];
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        if (newArray.indexOf(value) == -1) {
            newArray.push(value);
        }
    }
    return newArray;
};

_.map = function (array, func) {
    array = array || [];
    let newArray = [];
    if (!Array.isArray(array)) {
        for (let prop in array) {
            let objResult = func(array[prop]);
            newArray.push(objResult);
        }
    }
    for (let i = 0; i < array.length; i++) {
        let result = func(array[i]);
        newArray.push(result);
    }
    return newArray;
};

_.contains = function (array, target, fromIndex) {
    let slice = array.slice(fromIndex);
    if (slice.indexOf(target) !== -1) {
        return true;
    } else {
        return false;
    }
};

_.once = function (arg) {
    let called = false;
    return function () {
        if (called === false) {
            called = true;
            return arg.apply(null, arguments);
        }
    };
};

_.memoize = function (fn, hashFunction) {
    let cache = {};
    let newFunc = function (key) {
        let finalKey = hashFunction ? hashFunction.apply(null, arguments) : key;
        if (!(finalKey in cache)) {
            cache[finalKey] = fn.apply(null, arguments);
        }
        return cache[finalKey];
    };
    newFunc.cache = cache;
    return newFunc;
};

_.shuffle = function (list) {
    let arrayCopy = Array.prototype.slice.call(list);
    let results = [];
    for (let i = 0; i < list.length; i++) {
        let random = Math.floor(Math.random() * arrayCopy.length);
        results.push(arrayCopy[random]);
        arrayCopy.splice(random, 1);
    }
    return results;
};


if (typeof module !== 'undefined') {
    module.exports = _;
}