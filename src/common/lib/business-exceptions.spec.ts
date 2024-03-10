import { Test, TestingModule } from '@nestjs/testing';
import { BusinessException } from '../lib/business-exceptions';
import { EmessageMapping } from '../utils/enums/message.enum';

describe('BusinessException Class', () => {
    let module: TestingModule;
  
    beforeEach(async () => {
      module = await Test.createTestingModule({
        providers: [BusinessException],
      }).compile();
    });
  
    it('should do something', async () => {    
      const result = await new BusinessException(400,'Description', false, {codMessage : EmessageMapping.DEFAULT_ERROR});
      expect(result).toBeDefined();
      expect(result.code).toBe(400);
    });
  });