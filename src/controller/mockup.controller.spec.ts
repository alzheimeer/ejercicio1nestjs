import { Test, TestingModule } from '@nestjs/testing';
import { MockupController } from './mockup.controller';
import { IMockupService } from './service/mockup.service';
import { CreateMockupDto } from './dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from './dto/mockup/update-mockup.dto';
import { ResponseService } from './dto/response-service.dto';

describe('MockupController', () => {
  let controller: MockupController;
  let service: jest.Mocked<IMockupService>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<IMockupService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockupController],
      providers: [
        { provide: IMockupService, useValue: service },
      ],
    }).compile();

    controller = module.get<MockupController>(MockupController);
  });

  describe('create', () => {
    it('should create a new mockup', () => {
      // Arrange
      const createMockupDto: CreateMockupDto = { 
        id: 1,
        message: 'suscess',
       };
      const expectedResult = new ResponseService(
        true,
        'Mockup created',
        200,
        {},
      );

      (service.create as jest.Mock).mockResolvedValue(expectedResult);

      // Act
      const result = controller.create(createMockupDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createMockupDto);
    });
  });

  describe('findAll', () => {
    it('should return all mockups', () => {
      // Arrange
      const channel = 'test-channel';
      const page = 1;
      const limit = 15;
      const expectedResult = new ResponseService(
        true,
        'Mockups found',
        200,
        {},
      );

      service.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = controller.findAll(channel, page, limit);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(channel, page, limit);
      
    });
  });

  describe('findOne', () => {
    it('should return a mockup by id', () => {
      // Arrange
      const id = 1;
      const expectedResult = new ResponseService(
        true,
        'Mockup found',
        200,
        {},
      );
      (service.findOne as jest.Mock).mockResolvedValue(expectedResult);
      

      // Act
      const result = controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      
    });
  });

  describe('update', () => {
    it('should update a mockup', () => {
      // Arrange
      const id = 1;
      const updateMockupDto: UpdateMockupDto = { /* update mockup DTO data */ };
      const expectedResult = new ResponseService(
        true,
        'Mockup updated',
        200,
        {},
      );

      (service.update as jest.Mock).mockResolvedValue(expectedResult);
      

      // Act
      const result = controller.update(id, updateMockupDto);

      // Assert
      expect(service.update).toHaveBeenCalledWith(id, updateMockupDto);
      
    });
  });

  describe('remove', () => {
    it('should remove a mockup', () => {
      // Arrange
      const id = 1;
      const expectedResult = new ResponseService(
        true,
        'Mockup removed',
        200,
        {},
      );

      
      (service.remove as jest.Mock).mockResolvedValue(expectedResult);
      // Act
      const result = controller.remove(id);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(id);
      
    });
  });
});