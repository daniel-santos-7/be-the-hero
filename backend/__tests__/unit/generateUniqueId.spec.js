const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('generate unique id', ()=> {
    it('should generate an unique id',()=> {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});