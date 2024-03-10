import { Test, TestingModule } from '@nestjs/testing';
import Logging from './logging';
import { Etask } from '../utils/enums/taks.enum';
import { ELevelsErros } from '../utils/enums/logging.enum';

describe('LoggingService Class', () => {
    let service: Logging;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [Logging],
        }).compile();

        service = module.get<Logging>(Logging);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
        
    it('should log a message', () => {
        const message = 'This is a test log message';
        const log = service.write(message,Etask.LOAD_MESSAGE,ELevelsErros.INFO, {request: 'request'}, {response: 'response'});
        expect(log).toBeUndefined();
      });

});