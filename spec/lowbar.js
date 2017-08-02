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
        var input = [1, 2, 3, 4];
        var result = _.identity(input);
        expect(result).to.equal(input);
    });
});