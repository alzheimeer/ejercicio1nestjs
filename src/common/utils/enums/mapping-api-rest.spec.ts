import { MethodMessage } from "./mapping-api-rest";

describe('MethodMessage should have correct values', () => {

    it('GETBYID should "GETBYID" ', () => {
      expect(MethodMessage.GETBYID).toBe(":Id");
    });
  
    it('GETALL should be "GETALL"', () => {
      expect(MethodMessage.GETALL).toBe("/");
    })

  });
  