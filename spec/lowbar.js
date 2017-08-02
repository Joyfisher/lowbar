var path = require('path');
var expect = require('chai').expect;

var _ = require(path.join(__dirname, '..', './lowbar.js'));

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