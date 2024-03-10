import { Test, TestingModule } from '@nestjs/testing';
import { MockupService } from './mockup.service.impl';
import { IGlobalValidateIService } from '../globalValidate.service';
import { CreateMockupDto } from '../../dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from '../../dto/mockup/update-mockup.dto';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';

describe('MockupService', () => {
  let service: MockupService;
  let globalValidateServiceMock: jest.Mocked<IGlobalValidateIService>;

  beforeEach(async () => {
    globalValidateServiceMock = {
      validateChannel: jest.fn(),
    } as jest.Mocked<IGlobalValidateIService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockupService,
        { provide: IGlobalValidateIService, useValue: globalValidateServiceMock },
      ],
    }).compile();

    service = module.get<MockupService>(MockupService);
  });

  describe('create', () => {
    it('should create a mockup and return a response', () => {
      const createMockupDto: CreateMockupDto = { id: 1, message: 'Mockup one' };
      const expectedResult = new ResponseService(true, createMockupDto.message, 200, createMockupDto);

      const result = service.create(createMockupDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should find all mockups based on the filter and return a response', async () => {
      const channel = 'test';
      const page = 1;
      const limit = 10;
      const expectedResult = new ResponseService(
        true,
        'Default message',
        200,
        new ResponsePaginator([
          { id: 1, message: 'Mockup one' },
          { id: 2, message: 'Mockup two' },
          { id: 3, message: 'Mockup three' },
          { id: 4, message: 'Mockup four' },
        ], page, limit)
      );

      globalValidateServiceMock.validateChannel.mockResolvedValue(true);

      const result = await service.findAll(channel, page, limit);

      expect(globalValidateServiceMock.validateChannel).toHaveBeenCalledWith(channel);
      
    });
  });

  describe('findOne', () => {
    it('should find a mockup by id and return a response', () => {
      const id = 1;
      const expectedResult = new ResponseService(true, 'DEFAULT', 200, { id: 1, message: 'Mockup one' });

      const result = service.findOne(id);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a mockup and return a response', () => {
      const id = 1;
      const updateMockupDto: UpdateMockupDto = { id: 1, message: 'Updated mockup' };
      const expectedResult = new ResponseService(true, `This action update a #${id} mockup`, 200, updateMockupDto);

      const result = service.update(id, updateMockupDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if id does not match in the update dto', () => {
      const id = 1;
      const updateMockupDto: UpdateMockupDto = { id: 2, message: 'Updated mockup' };

      expect(() => service.update(id, updateMockupDto)).toThrowError('Bad request');
    });
  });

  describe('remove', () => {
    it('should remove a mockup by id and return a response', () => {
      const id = 1;
      const expectedResult = new ResponseService(true, `This action removes a #${id} mockup`);

      const result = service.remove(id);

      expect(result).toEqual(expectedResult);
    });
  });
});