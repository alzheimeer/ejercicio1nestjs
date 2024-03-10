import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ParamModel } from '../model/param/param.model';
import { ParamProvider } from './param.provider.impl';
import { IParam } from 'src/core/entity/param/param.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('ParamProvider', () => {
  let paramProvider: ParamProvider;
  let paramModel: Model<ParamModel>;

  beforeEach(async () => {
    const paramModel = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      findOneAndUpdate: jest.fn(),
      countDocuments: jest.fn(),
    } as unknown as jest.Mocked<ParamModel>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParamProvider,
        { provide: getModelToken(ParamModel.name), useValue: {} },
        { provide: ParamModel, useValue: paramModel },
      ],
    }).compile();

    paramProvider = module.get<ParamProvider>(ParamProvider);
    //paramModel = module.get<Model<ParamModel>>(getModelToken(ParamModel.name));
  });

  afterEach(() => {
    jest.resetAllMocks
  });

  describe('getTotal', () => {
    it('should return the total number of records', async () => {
      // Arrange
      const filter = { /* your filter object */ };
      const expectedTotal = 10;
      //jest.spyOn(paramModel, 'countDocuments').mockResolvedValue(expectedTotal);
      const paramModel = jest.fn().mockImplementation(() => ({
        countDocuments: jest.fn().mockReturnValue(10),
      }))();

      const paramProvider = new ParamProvider(paramModel);
      // Act
      const total = await paramProvider.getTotal(filter);

      // Assert
      expect(total).toBe(expectedTotal);
      expect(paramModel.countDocuments).toHaveBeenCalledWith(filter);
    });
  });

  describe('getParams', () => {
    it('should return the paginated params', async () => {
      // Arrange
      const page = 1;
      const limit = 10;
      const filter = { /* your filter object */ };
      const projection = { /* your projection object */ };
      const expectedParams: IParam[] = [
        {         
          id_param: 'id_paramvalue',
        description: 'descriptionvalue',
        status: true,
        createdUser: 'createdUservalue',
        updatedUser: 'updatedUservalue',
        createdAt: 'createdAtvalue',
        updatedAt: 'updatedAtvalue',
        values: 'valuesvalue' 
      },
      {         
        id_param: 'id_paramvalue2',
      description: 'descriptionvalue',
      status: true,
      createdUser: 'createdUservalue',
      updatedUser: 'updatedUservalue',
      createdAt: 'createdAtvalue',
      updatedAt: 'updatedAtvalue',
      values: 'valuesvalue' 
    }
      ];
      //jest.spyOn(paramModel, 'find').mockReturnThis();
      //jest.spyOn(paramModel, 'skip').mockReturnThis();
      //jest.spyOn(paramModel, 'limit').mockResolvedValue(expectedParams);

      const paramModel = jest.fn().mockImplementation(() => ({
        find: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnThis(),
          limit: jest.fn().mockResolvedValue(expectedParams),
        }),
      }))();
      const paramProvider = new ParamProvider(paramModel);
      // Act
      const params = await paramProvider.getParams(page, limit, filter, projection);

      // Assert
      expect(params).toEqual(expectedParams);
      expect(paramModel.find).toHaveBeenCalledWith(filter, projection);
      //expect(paramModel.skip).toHaveBeenCalledWith(limit * (page - 1));
      //expect(paramModel.limit).toHaveBeenCalledWith(limit);
    });
  });

  describe('getParamByIdParam', () => {
    it('should return the param with the given id', async () => {
      // Arrange
      const id_param = 'id_paramvalue';
      const expectedParam: IParam = {
        id_param: 'id_paramvalue',
        description: 'descriptionvalue',
        status: true,
        createdUser: 'createdUservalue',
        updatedUser: 'updatedUservalue',
        createdAt: 'createdAtvalue',
        updatedAt: 'updatedAtvalue',
        values: 'valuesvalue'
      };
      //jest.spyOn(paramModel, 'findOne').mockResolvedValue(expectedParam);
      const paramModel = jest.fn().mockImplementation(() => ({
        findOne: jest.fn().mockReturnValue(expectedParam),
      }))();

      const paramProvider = new ParamProvider(paramModel);
      // Act
      const param = await paramProvider.getParamByIdParam(id_param);

      // Assert
      expect(param).toEqual(expectedParam);
      expect(paramModel.findOne).toHaveBeenCalledWith({ id_param });
    });
  });

  describe('updateParam', () => {
    it('should update the param and return the updated param', async () => {
      // Arrange
      const param: IParam = {
        id_param: 'id_paramvalue',
        description: 'descriptionvalue',
        status: true,
        createdUser: 'createdUservalue',
        updatedUser: 'updatedUservalue',
        createdAt: 'createdAtvalue',
        updatedAt: 'updatedAtvalue',
        values: 'valuesvalue'
      };
      const expectedUpdatedParam: IParam = {
        id_param: 'id_paramvalue',
        description: 'descriptionvalue',
        status: true,
        createdUser: 'createdUservalue',
        updatedUser: 'updatedUservalue',
        createdAt: 'createdAtvalue',
        updatedAt: 'updatedAtvalue',
        values: 'valuesvalue'
      };

      const paramModel = jest.fn().mockImplementation(() => ({
        findOneAndUpdate: jest.fn().mockReturnValue(expectedUpdatedParam),
      }))();

      const paramProvider = new ParamProvider(paramModel);

      // Act
      const updatedParam = await paramProvider.updateParam(param);

      // Assert
      expect(updatedParam).toEqual(expectedUpdatedParam);
    });
  });
});