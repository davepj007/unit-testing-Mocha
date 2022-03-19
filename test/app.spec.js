const assert = require('assert');
const { should } = require('chai');
const { add } = require('../src/unit-testing');

describe('the add function', () => {
    it('should add 2 numbers together', () => {
        const result = add(2,2);
        assert.equal(result, 4);
    })
})