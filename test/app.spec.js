const assert = require('assert');
const { should } = require('chai')
const { add } = require('../src/unit-testing');

describe('the add function', () => {
    it('should add 2 numbers together', () => {
        const result = add(2,2);
        assert.equal(result, 4);
    });

    it('should be able to handle 1 number', () => {
        const result = add(2);
        assert.equal(result, 2);
    });

    it('should be able to handle 0 number', () => {
        const result = add();
        assert.equal(result, 0);
    });

    it('should return 0 if either argument is not a number', () => {
        const result = add();
        assert.equal(result, 0);
    });
})