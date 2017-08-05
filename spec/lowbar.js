let path = require('path');
let expect = require('chai').expect;
let sinon = require('sinon');

let _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
    'use strict';
    it('is an object', function () {
        expect(_).to.be.an('object');
    });
});

describe('#identity', function () {
    it('is a function', function () {
        expect(_.identity).to.be.a('function');
    });
    it('should return the original value if given a number', function () {
        expect(_.identity(100)).to.equal(100);
    });
    it('should return the original value if given a string', function () {
        expect(_.identity('Hello World')).to.equal('Hello World');
    });
    it('should return the original value if given an array', function () {
        let input = [1, 2, 3, 4];
        let result = _.identity(input);
        expect(result).to.equal(input);
    });
});

describe('#first', function () {
    it('is a function', function () {
        expect(_.first).to.be.a('function');
    });
    it('should return the first element if 1 is given as a parameter', function () {
        expect(_.first([1, 2, 3], 1)).to.eql([1]);
    });
    it('should return the first 2 array items if 2 is given as a parameter', function () {
        expect(_.first([4, 5, 6], 2)).to.eql([4, 5]);
    });
    it('should return the nth number of array items', function () {
        expect(_.first([7, 8, 9], 3)).to.eql([7, 8, 9]);
    });
    it('should return undefined if not passed an argument', function () {
        expect(_.first()).to.eql(undefined);
    });
    it('should return the full array if given a number greater than the array length', function () {
        expect(_.first([1, 2, 3, 4], 5)).to.eql([1, 2, 3, 4]);
    });
});

describe('#last', function () {
    it('is a function', function () {
        expect(_.last).to.be.a('function');
    });
    it('should return the last array item if given 1', function () {
        expect(_.last([1, 2, 3], 1)).to.eql([3]);
    });
    it('should return the last 2 array items if 2 is given as a parameter', function () {
        expect(_.last([4, 5, 6], 2)).to.eql([5, 6]);
    });
    it('should return the last nth number of array items', function () {
        expect(_.last([7, 8, 9], 3)).to.eql([7, 8, 9]);
    });
    it('should return the whole array if the number is greater than the array length', function () {
        expect(_.last([1, 2, 3, 4], 5)).to.eql([1, 2, 3, 4]);
    });
    it('should return undefined if not passed an argument', function () {
        expect(_.last()).to.eql(undefined);
    });
});

describe('#each', function () {
    it('is a function', function () {
        expect(_.each).to.be.a('function');
    });
    it('calls the passed function as many times as elements in the array', function () {
        let count = 0;
        _.each([1, 2, 3, 4, 7], function () {
            count++;
        });
        expect(count).to.equal(5);
    });
    it('calls the function with each item of the array as the first argument', function () {
        let basket = [];
        function putItemInBasket(item) {
            basket.push(item);
        }
        _.each([1, 5, 2, 4, 3], putItemInBasket);
        expect(basket).to.eql([1, 5, 2, 4, 3]);
    });
    it('calls the function with each item of the array as first argument with its index', function () {
        let basket = [];
        function putItemInBasket(item, i) {
            basket.push(item, i);
        }
        _.each([1, 2, 3], putItemInBasket);
        expect(basket).to.eql([1, 0, 2, 1, 3, 2]);
    });
});

describe('#indexOf', function () {
    it('is a function', function () {
        expect(_.indexOf).to.be.a('function');
    });
    it('returns the index of the item', function () {
        expect(_.indexOf([1, 2, 3], 2)).to.eql(1);
        expect(_.indexOf([1, 2, 3], 1)).to.eql(0);
    });
    it('should return -1 if the value is not present in the array', function () {
        expect(_.indexOf([1, 2, 3], 52)).to.eql(-1);
    });
});

describe('#filter', function () {
    it('is a function', function () {
        expect(_.filter).to.be.a('function');
    });
    it('should return even numbers when passed an array of numbers', function () {
        let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        function isEven(num) {
            return !(num % 2);
        }
        expect(_.filter(numberList, isEven)).to.eql([2, 4, 6, 8, 10]);
    });
    it('should return words longer than 5 letters long', function () {
        let sentence = ['elephant', 'and', 'the', 'ginormous', 'giraffe'];
        function wordOverFiveLetters(word) {
            return word.length > 5;
        }
        expect(_.filter(sentence, wordOverFiveLetters)).to.eql(['elephant', 'ginormous', 'giraffe']);
    });
    it('should return [] if passed an empty array', function () {
        expect(_.filter([])).to.eql([]);
    });
});

describe('#reject', function () {
    it('is a function', function () {
        expect(_.reject).to.be.a('function');
    });
    it('should return a list filtered by the predicate', function () {
        let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        function isEven(num) {
            return !(num % 2);
        }
        expect(_.reject(numberList, isEven)).to.eql([1, 3, 5, 7, 9]);
    });
    it('should return a list filtered by the predicate', function () {
        let sentence = ['elephant', 'and', 'the', 'ginormous', 'giraffe'];
        function wordOverFiveLetters(word) {
            return word.length > 5;
        }
        expect(_.reject(sentence, wordOverFiveLetters)).to.eql(['and', 'the']);
    });
    it('should return a array if passed one', function () {
        expect(_.reject([])).to.eql([]);
    });
});

describe('#uniq', function () {
    it('is a function', function () {
        expect(_.uniq).to.be.a('function');
    });
    it('should return a array if passed one', function () {
        expect(_.uniq([])).to.eql([]);
    });
    it('should return an array of unique items', function () {
        expect(_.uniq([1, 2, 3, 3, 2, 4])).to.eql([1, 2, 3, 4]);
        expect(_.uniq(['hello', 'goodbye', 'hello', 'hello'])).to.eql(['hello', 'goodbye']);
    });
    it('should return the array if all items are uniq', function () {
        expect(_.uniq([1, 2, 3, 4])).to.eql([1, 2, 3, 4])
    });
});

describe('#map', function () {
    it('is a function', function () {
        expect(_.map).to.be.a('function');
    });
    it('should return a mapped array', function () {
        let numberList = [1, 2, 3, 4, 5, 6];
        function triples(num) {
            return num * 3;
        }
        expect(_.map(numberList, triples)).to.eql([3, 6, 9, 12, 15, 18]);
    });
    it('should return a mapped array if given an object', function () {
        let numberList = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
        function triples(num) {
            return num * 3;
        }
        expect(_.map(numberList, triples)).to.eql([3, 6, 9, 12, 15, 18]);
    });
    it('should return a empty array if passed one', function () {
        let emptyArray = [];
        expect(_.map(emptyArray)).to.eql([]);
    });
});

describe('_.contains', function () {
    it('is a function', function () {
        expect(_.contains).to.be.a('function');
    });
    it('should return true if the array contains the parameter', function () {
        expect(_.contains([1, 2, 3], 3)).to.equal(true);
    });
    it('should return false if the array does not contain the parameter', function () {
        expect(_.contains([4, 5, 6], 7)).to.equal(false);
    });
});

describe('it should start searching at the index provided as the third argument', function () {
    it('should return false for ([1,2,3], 1, 1)', function () {
        expect(_.contains([1, 2, 3], 1, 1)).to.equal(false);
    });
});
it('should return true for contains([1,2,3,1], 1, 2)', function () {
    expect(_.contains([1, 2, 3, 1], 1, 2)).to.equal(true);
});

describe('#once', function () {
    it('is a function', function () {
        expect(_.once).to.be.a('function');
    });
    it('should call only once', function () {
        let spy = sinon.spy();
        let limitTest = _.once(spy);

        limitTest();
        limitTest();
        limitTest();
        expect(spy.callCount).to.equal(1);
    });
});

describe('#memoize', function () {
    it('is a function', function () {
        expect(_.memoize).to.be.a('function');
    });
    it('returns same value as original funcion', function () {
        let double = function (n) { return 2 * n; };
        let spy = sinon.spy(double);
        let memDouble = _.memoize(spy);
        memDouble(5);
        memDouble(5);
        memDouble(5);
        expect(spy.callCount).to.equal(1);
    });

    it('the returned function should have a cache prop', function () {
        let double = function (n) { return 2 * n; };
        let memDouble = _.memoize(double);
        memDouble(3);
        expect(memDouble.cache).to.eql({ '3': 6 });
    });
});

describe('#shuffle', function () {
    it('is a function', function () {
        expect(_.shuffle).to.be.a('function');
    });
    it('returns a shuffled copy of the array', function () {
        expect(_.shuffle([1, 2, 3, 4, 5, 6])).to.not.eql([1, 2, 3, 4, 5, 6]);
    });
});

describe('#invoke', function () {
    it('is a function', function () {
        expect(_.invoke).to.be.a('function');
    });
    it('calls the method on each list value', function () {
        expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
});

describe('#sortBy', function () {
    it('is a function', function () {
        expect(_.sortBy).to.be.a('function');
    });
    it('returns a list sorted by function', function () {
        expect(_.sortBy([1, 2, 3, 4, 5, 6], function (num) { return Math.sin(num); })).to.eql([5, 4, 6, 3, 1, 2]);
    });
});

describe('#zip', function () {
    it('is a function', function () {
        expect(_.zip).to.be.a('function');
    });
    it('zips together two arrays with elements of the same index paired together', function () {
        expect(_.zip(['a', 'b', 'c', 'd'], [1, 2, 3])).to.eql([['a', 1], ['b', 2], ['c', 3], ['d', undefined]]);
    });
});

// sortedIndex
/*  describe('#sortedIndex', function () {
    it('is a function', function () {
      expect(_.sortedIndex).to.be.a('function');
    });
  }); */

describe('#flatten', function () {
    it('is a function', function () {
        expect(_.flatten).to.be.a('function');
    });

    it('returns a flattened array', function () {
        expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1, 2, 3, 4]);
    });
});

describe('#intersection', function () {
    it('is a function', function () {
        expect(_.intersection).to.be.a('function');
    });

    it('returns the intersection of all arrays passed', function () {
        expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
    });
});

describe('#difference', function () {
    it('is a function', function () {
        expect(_.difference).to.be.a('function');
    });

    it('returns the values from the first array that are not present in the other arrays', function () {
        expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
    });
});



