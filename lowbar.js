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

_.invoke = function (list, methodName) {
    let args = [].slice.call(arguments, 2);
    return list.map(function (ele) {
        return ele[methodName] ? ele[methodName].apply(ele, args) : undefined;
    });
};

_.sortBy = function (list, iteratee) {
    if (typeof (iteratee) === 'function') {
        return list.sort(function (a, b) { return iteratee(a) - iteratee(b); });
    } else {
        return list.sort(function (a, b) { return a[iteratee] - b[iteratee]; });
    }
};

_.zip = function () {
    let argumentsArray = Array.prototype.slice.call(arguments);
    let longestArray = argumentsArray.sort(function (a, b) {
        return b.length - a.length;
    })[0];

    return longestArray.map(function (value, index) {
        return argumentsArray.map(function (val) {
            return val[index];
        });
    });
};

_.sortedIndex = function (x) {
    return x;
};

_.flatten = function (list) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
            let temp = _.flatten(list[i]);
            temp.forEach(function (value) { result.push(value); });
        } else {
            result.push(list[i]);
        }
    }
    return result;
};

_.intersection = function () {
    let argumentsArray = Array.prototype.slice.call(arguments);

    let result = [];

    _.each(argumentsArray[0], function (item) {
        let isShared = false;

        for (let i = 1; i < argumentsArray.length; i++) {
            _.each(argumentsArray[i], function (check) {
                if (item === check) {
                    isShared = true;
                }
            });
        }

        if (isShared) {
            result.push(item);
        }

    });

    return result;
};


if (typeof module !== 'undefined') {
    module.exports = _;
}