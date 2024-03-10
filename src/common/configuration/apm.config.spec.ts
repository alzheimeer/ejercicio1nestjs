import * as config from './apm.config';

describe('apm should have correct values', () => {

    it('correct values apm servicename', () => {
        expect(config.default.serviceName).toBeDefined();
    });

    it('correct values apm environment', () => {
        expect(config.default.environment).toBeDefined();
    });
});