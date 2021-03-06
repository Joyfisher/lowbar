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

_.pluck = function (list, propertyName) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        result.push(list[i][propertyName]);
    }
    return result;
};

_.reduce = function (list, iteratee, memo) {
    for (let i = 0; i < list.length; i++) {
        memo = iteratee(memo, list[i]);
    }
    return memo;
};

_.every = function (list, predicate) {
    for (let i = 0; i < list.length; i++) {
        if (!predicate(list[i])) {
            return false;
        }
    }
    return true;
};

_.some = function (list, predicate) {
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            return true;
        }
    }
    return false;
};

_.extend = function (destination, source) {
    return Object.assign({}, destination, source);
};

_.defaults = function (object, defaults) {
    return Object.assign({}, defaults, object);
};

// advanced method

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

_.sortedIndex = function (array, obj) {
    let value = obj;
    let low = 0, high = array.length;
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (array[mid] < value) low = mid + 1; else high = mid;
    }
    return low;
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

_.difference = function (list) {
    let argumentsArray = Array.prototype.slice.call(arguments);
    let results = [];

    _.each(list, function (item) {
        let isUnique = true;

        for (let i = 1; i < argumentsArray.length; i++) {
            for (let j = 0; j < argumentsArray[i].length; j++) {
                if (item === argumentsArray[i][j]) {
                    isUnique = false;
                }
            }
        }

        if (isUnique) {
            results.push(item);
        }

    });

    return results;
};

_.binaryIndexOf = function (searchElement) {
    'use strict';

    let minIndex = 0;
    let maxIndex = this.length - 1;
    let currentIndex;
    let currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = this[currentIndex];

        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
};


if (typeof module !== 'undefined') {
    module.exports = _;
}