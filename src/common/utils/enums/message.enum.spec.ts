import { EmessageMapping } from "./message.enum";

describe('EmessageMapping should have correct values', () => {

    it('EmessageMapping" ', () => {  
        expect(EmessageMapping.CHANNEL_ERROR).toBe("CHANNEL_ERROR");
        expect(EmessageMapping.DEFAULT_ERROR).toBe("DEFAULT_ERROR")
        expect(EmessageMapping.DEFAULT).toBe("DEFAULT")
    });


});
