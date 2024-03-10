import * as db from './database.config'

describe('Database should have correct values', () => {
    it('correct value data base', () => {
        expect(db.default.database).toContain('DBTemplateNestJS_DE');
    });
});