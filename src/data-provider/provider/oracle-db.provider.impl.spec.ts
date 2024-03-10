import { OracleDBProvider } from './oracle-db.provider.impl';
import { Test } from '@nestjs/testing';
import * as oracledb from 'oracledb';
import { IServiceTracingProvider } from '../service-tracing.provider';
import {
  ECursorNameDB,
  EStoreProcedureDB,
} from 'src/common/utils/enums/store-procedure.enum';

describe('OracleDbProvider', () => {
  let oracleProvider: OracleDBProvider;
  let serviceTracingProvider: IServiceTracingProvider;
  const storedProcedure = EStoreProcedureDB.TEST_SP;
  const params = {
    response: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const mockGetRows = [
    ['DEFAULT', 'Mensaje por defecto', 'Execution successfully'],
    [
      'DEFAULT_ERROR',
      'Mensaje de error por defecto',
      '¡Ups!, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466.',
    ],
  ];
  const mockMetaData = [
    {
      name: 'ID',
      dbType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
      nullable: true,
      isJson: false,
      byteSize: 50,
      dbTypeName: 'VARCHAR2',
      fetchType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
    },
    {
      name: 'DESCRIPTION',
      dbType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
      nullable: true,
      isJson: false,
      byteSize: 100,
      dbTypeName: 'VARCHAR2',
      fetchType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
    },
    {
      name: 'MESSAGE',
      dbType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
      nullable: true,
      isJson: false,
      byteSize: 500,
      dbTypeName: 'VARCHAR2',
      fetchType: {
        num: 2001,
        name: 'DB_TYPE_VARCHAR',
        columnTypeName: 'VARCHAR2',
        _bufferSizeFactor: 4,
        _oraTypeNum: 1,
        _csfrm: 1,
      },
    },
  ];
  const mockConnection = {
    outBinds: {
      [`${ECursorNameDB.TEST_SP}`]: {
        getRows: jest.fn().mockReturnValue(mockGetRows),
        metaData: mockMetaData,
      },
    },
  };
  const mockGetConnection = {
    execute: jest.fn().mockReturnValue(mockConnection),
    close: jest.fn(),
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OracleDBProvider,
        {
          provide: IServiceTracingProvider,
          useValue: { createServiceTracing: jest.fn() },
        },
      ],
    }).compile();
    oracleProvider = module.get<OracleDBProvider>(OracleDBProvider);
    serviceTracingProvider = module.get<IServiceTracingProvider>(
      IServiceTracingProvider,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy path', () => {
    it('Respuesta con data no mapeada (Array<Array>)', async () => {
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(() => Promise.resolve(mockGetConnection));
      const response = await oracleProvider.consultSP(
        storedProcedure,
        params,
        ECursorNameDB.TEST_SP,
      );
      expect(response.data.length).toBe(2);
      expect(response.data[0].length).toBe(3);
      expect(response.code).toBe(200);
      expect(response.description).toBe('Ejecución exitosa.');
      expect(oracledb.getConnection).toBeCalledTimes(1);
      expect(mockGetConnection.execute).toBeCalledTimes(1);
      expect(mockGetConnection.close).toBeCalledTimes(1);
      expect(serviceTracingProvider.createServiceTracing).toBeCalledTimes(2);
    });

    it('Respuesta con data mapeada (Array<Object>)', async () => {
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(() => Promise.resolve(mockGetConnection));
      const response = await oracleProvider.consultSP(
        storedProcedure,
        params,
        ECursorNameDB.TEST_SP,
        true,
      );
      expect(response.data.length).toBe(2);
      expect(response.data[0].ID).toBeDefined();
      expect(response.code).toBe(200);
      expect(response.description).toBe('Ejecución exitosa.');
      expect(oracledb.getConnection).toBeCalledTimes(1);
      expect(mockGetConnection.execute).toBeCalledTimes(1);
      expect(mockGetConnection.close).toBeCalledTimes(1);
      expect(serviceTracingProvider.createServiceTracing).toBeCalledTimes(2);
    });
  });

  describe('Bad path', () => {
    it('Error en conexion a oracle', async () => {
      const mockError = new Error('Error de conexión!');
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(() => Promise.reject(mockError));
      const response = await oracleProvider.consultSP(
        storedProcedure,
        params,
        ECursorNameDB.TEST_SP,
        true,
      );
      expect(response.description).toBe('Error de conexión!');
      expect(response.code).toBe(500);
      expect(response.data.length).toBe(0);
      expect(serviceTracingProvider.createServiceTracing).toBeCalledTimes(2);
      expect(oracledb.getConnection).toBeCalledTimes(1);
      expect(mockGetConnection.execute).toBeCalledTimes(0);
      expect(mockGetConnection.close).toBeCalledTimes(0);
    });
  });
});
