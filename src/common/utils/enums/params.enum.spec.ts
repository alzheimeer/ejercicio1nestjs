import { Echannel, EtypeDocument } from "./params.enum";

describe('Echannel should have correct values', () => {

    it('Echannel" ', () => {
        expect(Echannel.EC9_B2C).toBe("EC9_B2C");
    });
});

describe('EtypeDocument should have correct values', () => {

    it('EtypeDocument" ', () => {
        expect(EtypeDocument.CC).toBe("CC");
        expect(EtypeDocument.CE).toBe("CE");
    });

    it('total enums', () => {
        expect(Object.keys(EtypeDocument).length).toBe(2);
    });

});