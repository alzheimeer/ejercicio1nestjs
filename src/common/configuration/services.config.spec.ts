import * as config from '../configuration/services.config'

describe('Servives should have correct values',()=>{

    it('correct value timeout', () => {
        expect(config.default.httpConfig).toEqual({"timeout": 15000});
    });
})