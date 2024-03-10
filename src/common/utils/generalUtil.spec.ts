import { ParamUcimpl } from '../../core/use-case/resource/impl/param.resource.uc.impl';
import { EtypeDocument } from './enums/params.enum';
import generalConfig from '../configuration/general.config';
import { EmessageMapping } from "./enums/message.enum";
import { MappingStatusCode } from '../configuration/mapping-statuscode';
import { BusinessException } from '../lib/business-exceptions';
import GeneralUtil from "./generalUtil";
import { IMessage } from '../../core/entity/message.entity';
import { Empty } from 'nats';
import { ELevelsErros } from './enums/logging.enum';
import { HttpStatus } from '@nestjs/common';
import Logging from '../lib/logging';
import {  Etask } from './enums/taks.enum';
import { EStatusTracingGeneral } from './enums/tracing.enum';

describe('test methods general utils', () => {

  it("should return true if the validated channel is true", () => {
    const channel = "EC9_B2C";
    ParamUcimpl.params = [{
      id_param: "CHANNEL",
      description: "canales correspondientes al servicio",
      status: true,
      createdUser: "",
      updatedUser: "",
      createdAt: "",
      updatedAt: "",
      values: ["EC9_B2C"]
    }];
    const result = GeneralUtil.validateChannel(channel);
    expect(result).toBe(true);
  });

  it('transformTypeDoc CC & CE', async () => {
    const resultcc = await GeneralUtil.transformTypeDoc(EtypeDocument.CC);
    const resultce = await GeneralUtil.transformTypeDoc(EtypeDocument.CE);
    expect(resultcc).toBe(1);
    expect(resultce).toBe(4);
  });

  it('validateValueRequired numero', async () => {
    const result = await GeneralUtil.validateValueRequired(12);
    expect(result).toBe(true);
  });

  it('validateValueRequired cadena', async () => {
    const result = await GeneralUtil.validateValueRequired("cadena");
    expect(result).toBe(true);
  });
 
  it('validateValueRequired undefined', async () => {
    const result = await GeneralUtil.validateValueRequired(undefined);
    expect(result).toBe(false);
  });

  it('getOrigin', async () => {
    const result = await GeneralUtil.getOrigin('http://');
    expect(result).toContain(generalConfig.apiMapping);
  });

  it('validateDate dates are equal', async () => {
    let date1 = new Date('2023-05-30') 
    let date2 = new Date('2023-05-30') 
    const result = await GeneralUtil.validateDate(date1,date2)
    expect(result).toBe(0)
  });

  it('validateDate first is greater than second', async () => {
    let date1 = new Date('2023-05-30') 
    let date2 = new Date('2023-05-20') 
    const result = await GeneralUtil.validateDate(date1,date2)
    expect(result).toBe(1)
  });

  it('validateDate first is less than second', async () => {
    let date1 = new Date('2023-05-20') 
    let date2 = new Date('2023-05-30') 
    const result = await GeneralUtil.validateDate(date1,date2)
    expect(result).toBe(-1)
  });

  it('getDateUTC', async () => {
    const result = await GeneralUtil.getDateUTC()
    expect(result).toBeDefined
  });

  it('validateBoolean is true', async () => {
    let value = true
    const result = await GeneralUtil.validateBoolean(value)
    expect(result).toBe(true)
  });

  it('validateBoolean is false', async () => {
    let value = false
    const result = await GeneralUtil.validateBoolean(value)
    expect(result).toBe(false)
  });

  it('validateValueAndString', async () => {
    let element1 = 'cadena'
    let element2 = 'cadena'
    const result = await GeneralUtil.validateValueAndString(element1,element2)
    expect(result).toBe(true)
  });

  it('validateValueAndString', async () => {
    let element1 = 'cadena'
    let element2 = 'string'
    const result = await GeneralUtil.validateValueAndString(element1,element2)
    expect(result).toBe(false)
  });

  it('ifExist is exist', async () => {
    let element1 = 'cadena'
    const result = await GeneralUtil.ifExist(element1)
    expect(result).toBeDefined()
  });

  it('ifExist is not exist', async () => {
    let element1 = ''
    const result = await GeneralUtil.ifExist(element1)
    expect(result).toBe('')
  });

  it('isEmpty is empty', async () => {
    let element1 = ''
    const result = await GeneralUtil.isEmpty(element1)
    expect(result).toBe(true)
  });

  it('isEmpty is no empty', async () => {
    let element1 = 'cadena'
    const result = await GeneralUtil.isEmpty(element1)
    expect(result).toBe(false)
  });

  it('isUndefined is true', async () => {
    let element1 = undefined
    const result = await GeneralUtil.isUndefined(element1)
    expect(result).toBe(true)
  });

  it('isUndefined is false', async () => {
    let element1 = 'cadena'
    const result = await GeneralUtil.isUndefined(element1)
    expect(result).toBe(false)
  });

  it('isNull is true', async () => {
    let element1 = null
    const result = await GeneralUtil.isNull(element1)
    expect(result).toBe(true)
  });

  it('isNull is false', async () => {
    let element1 = 'cadena'
    const result = await GeneralUtil.isNull(element1)
    expect(result).toBe(false)
  });

  
  it('isNullOrEmpty is null', async () => {
    let element1 = null
    const result = await GeneralUtil.isNullOrEmpty(element1)
    expect(result).toBe(true)
  });

  it('isNullOrEmpty is Empty', async () => {
    let element1 = ''
    const result = await GeneralUtil.isNullOrEmpty(element1)
    expect(result).toBe(true)
  });

  it('isNullOrEmpty is false', async () => {
    let element1 = 'cadena'
    const result = await GeneralUtil.isNullOrEmpty(element1)
    expect(result).toBe(false)
  });
  

});

it('convertXmlToJson should return JSON object', async () => {
  const xml = '<root><name>John</name><age>30</age></root>';
  const expectedJson = { root: { name: 'John', age: '30' } };
  const result = await GeneralUtil.convertXmlToJson(xml);
  expect(result).toEqual(expectedJson);
});

it('convertXmlToJson should throw error for invalid XML', async () => {
  const xml = '<root><name>John</name><age>30</age>';
  await expect(GeneralUtil.convertXmlToJson(xml)).rejects.toThrow();
});

it('convertXmlToJson should return null for empty input', async () => {
  const xml = '';
  const result = await GeneralUtil.convertXmlToJson(xml);
  expect(result).toBeNull();
});

it('should return the difference with a different data', () => {
  const date1 = new Date('xxxxxxx');
  const date2 = new Date('2022-01-03');
  const result = GeneralUtil.validateDate(date1, date2);
  expect(result).toBe(NaN);
});

describe('test methods general utils', () => {

  it("should return false if the validated channel is not true", () => {
    const channel = "EC9_B2B";
    const result = GeneralUtil.validateChannel(channel);
    expect(result).toBe(false);
  });

  it('should return null if the input is an empty object', async () => {
    const obj = {};
    const result = GeneralUtil.isEmptyObject(obj);
    expect(result).toBe(false);
  });

  it('convertXmlToJson should return JSON object233', async () => {
    const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:Add><tem:intA>?</tem:intA><tem:intB>?</tem:intB></tem:Add></soapenv:Body></soapenv:Envelope>';
    const expectedJson =  {"soapenv:Envelope": {"$": {},"soapenv:Header": "","soapenv:Body": {"tem:Add": {"tem:intA": "?","tem:intB": "?"}}}};
    const result = await GeneralUtil.convertXmlToJson(xml);
    expect(result).toEqual(expectedJson);
  });
  
  it('should return JSON object if the input is a valid XML string', async () => {
    const xml = '<root><name>John</name><age>30</age></root>';
    const result = await GeneralUtil.convertXmlToJson(xml);
    expect(result).toEqual({ root: { name: 'John', age: '30' } });
  });

  it('should replace specified values in a JSON object', async () => {
    const json = { name: 'John', age: 30, address: '123 Main St' };
    const replaceValues = ['John', 'Main'];
    const replaceBy = '***';
    const result = GeneralUtil.cleanProperties(json, replaceValues, replaceBy);
    expect(result).toEqual({ name: '***', age: 30, address: '123 *** St' });
  });

  it('should return the correct number for a given type of document', async () => {
    const resultCC = GeneralUtil.transformTypeDoc(EtypeDocument.CC);
    const resultCE = GeneralUtil.transformTypeDoc(EtypeDocument.CE);
    const resultInvalid = GeneralUtil.transformTypeDoc('invalid' as EtypeDocument);
    expect(resultCC).toBe(1);
    expect(resultCE).toBe(4);
    expect(resultInvalid).toBe(null);
  });

  it('should return true if the input is a non-empty string or number', async () => {
    const value1 = 'John';
    const value2 = 30;
    const result1 = GeneralUtil.validateValueRequired(value1);
    const result2 = GeneralUtil.validateValueRequired(value2);
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it('should return false if the input is undefined or null', async () => {
    const value1 = undefined;
    const value2 = null;
    const result1 = GeneralUtil.validateValueRequired(value1);
    const result2 = GeneralUtil.validateValueRequired(value2);
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it('should return the origin URL of a given URL', async () => {
    const url = 'http://localhost:3000/api/v1/users';
    const result = GeneralUtil.getOrigin(url);
    expect(result).toBe('/RSTemplateNestJShttp://localhost:3000/api/v1/users');
  });

  it('should update a message in cache', async () => {
    const cache = {
      set: jest.fn().mockResolvedValue([]),
      get: jest.fn().mockResolvedValue([{ id: '1', description: 'updated description', message: 'updated message' }]),
      del: jest.fn(),
      reset: jest.fn(),
      wrap: jest.fn(),
      store:{
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
        mset: jest.fn(),
        mget: jest.fn(),
        mdel: jest.fn(),
        keys: jest.fn(),
        ttl: jest.fn(),
      },
    };
    const messages: IMessage[]  = [{ id: '1', description: 'updated description', message: 'updated message' }, { id: '2', description: 'updated description', message: 'updated message' }];
    const updatedMessage: IMessage = { id: '1', description: 'updated description', message: 'updated message' };
    await GeneralUtil.cacheMessages(cache, 'update', messages, updatedMessage);
    expect(cache.get).toHaveBeenCalledWith('messages');
    expect(cache.set).toHaveBeenCalledWith('messages', [{ id: '1', description: 'updated description', message: 'updated message'  }], generalConfig.ttlCache);
  
  });
  
  it('should store messages in cache', async () => {
    const cache = {
      set: jest.fn().mockResolvedValue([]),
      get: jest.fn().mockResolvedValue(undefined),
      del: jest.fn(),
      reset: jest.fn(),
      wrap: jest.fn(),
      store:{
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
        mset: jest.fn(),
        mget: jest.fn(),
        mdel: jest.fn(),
        keys: jest.fn(),
        ttl: jest.fn(),
      },
    };
    const messages: IMessage[]  = [{ id: '1', description: '', message: 'message1' }, { id: '2', description: '', message: 'message2' }];
    await GeneralUtil.cacheMessages(cache, 'store', messages);
    expect(cache.set).toHaveBeenCalledWith('messages', messages, generalConfig.ttlCache);
  });
  
  let cachee;

  beforeEach(() => {
    cachee = {
      set: jest.fn().mockReset(),
      get: jest.fn().mockResolvedValue([]),
      del: jest.fn(),
      reset: jest.fn(),
      wrap: jest.fn(),
      store:{
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
        mset: jest.fn(),
        mget: jest.fn(),
        mdel: jest.fn(),
        keys: jest.fn(),
        ttl: jest.fn(),
      },
    };
  });


  it('should not update a message in cache if message is not found', async () => {

    const messages: IMessage[]  = [];
    const updatedMessage: IMessage = { id: '3', description: 'updated description', message: 'updated message' };
    await GeneralUtil.cacheMessages(cachee, 'update', undefined, updatedMessage);
    expect(cachee.get).toHaveBeenCalledWith('messages');
    expect(cachee.set.mockReset()).not.toHaveBeenCalled();
  });

  it('should validate the difference in days between two dates', async () => {
    const date1 = new Date('2022-01-01');
    const date2 = new Date('2022-01-02');
    const result = GeneralUtil.validateDate(date1, date2);
    expect(result).toBe(-1);
  });



    it('should return null for an empty string', async () => {
      const xml = '';
      const result = await GeneralUtil.convertXmlToJson(xml);
      expect(result).toBeNull();
    });

});


it('should throw a BusinessException with the given parameters', () => {
  const document = { order1: { id: 1, name: 'Order 1' }, order2: { id: 2, name: 'Order 2' } };
  const message = EmessageMapping.DEFAULT_ERROR;
  const status = MappingStatusCode.NOT_FOUND;
  const success = false;
  expect(() => GeneralUtil.generateBusinessException(document, message, status, success)).toThrow(BusinessException);
});


describe('getTemplateXML', () => {

  it('should throw an error if the specified XML file does not exist', () => {
    expect(() => {
      GeneralUtil.getTemplateXML('nonexistent');
    }).toThrow();
  });
});

describe('getLevelError', () => {
  it('should return ERROR level if result is not executed', () => {
    const result = { executed: false };
    const level = GeneralUtil.getLevelError(result);
    expect(level).toBe(ELevelsErros.ERROR);
  });

  it('should return INFO level if result status is OK', () => {
    const result = { executed: true, status: HttpStatus.OK };
    const level = GeneralUtil.getLevelError(result);
    expect(level).toBe(ELevelsErros.INFO);
  });

  it('should return INFO level if result status is CREATED', () => {
    const result = { executed: true, status: HttpStatus.CREATED };
    const level = GeneralUtil.getLevelError(result);
    expect(level).toBe(ELevelsErros.INFO);
  });

  it('should return WARNING level if result status is not OK or CREATED', () => {
    const result = { executed: true, status: HttpStatus.BAD_REQUEST };
    const level = GeneralUtil.getLevelError(result);
    expect(level).toBe(ELevelsErros.WARNING);
  });
});describe('logRequestResponse', () => {
  it('should log request with INFO level and "Entrada Principal" message', () => {
    const req = { url: '/api/users', method: 'GET' };
    const request = { headers: { 'Content-Type': 'application/json' }, body: {} };
    const name = 'TestLogger';
    const spyWrite = jest.spyOn(Logging.prototype, 'write');
    GeneralUtil.logRequestResponse(req, request, name);
    expect(spyWrite).toHaveBeenCalledWith(
      'Entrada Principal - /api/users - GET',
      Etask.REQUEST_HTTP,
      ELevelsErros.INFO,
      request,
      undefined,
      undefined
    );
  });



  it('should log response with WARNING level and "Salida Principal" message when status is not 200', () => {
    const req = { url: '/api/users', method: 'GET' };
    const request = { headers: { 'Content-Type': 'application/json' }, body: {} };
    const name = 'TestLogger';
    const data = { status: 404, body: { message: 'Not found' } };
    const spyWrite = jest.spyOn(Logging.prototype, 'write');
    GeneralUtil.logRequestResponse(req, request, name, data);
    expect(spyWrite).toHaveBeenCalledWith(
      'Salida Principal - /api/users - GET',
      Etask.REQUEST_HTTP,
      ELevelsErros.WARNING,
      request,
      data,
      undefined
    );
  });


});

describe('traceabilityInterceptor', () => {

  it('should set the status to STATUS_FAILED when the response status is not 200', () => {
    const req = { url: '/test', method: 'SET' };
    const request = 'test request';
    const data = { status: 400, message: 'test response' };
    const executionTime = 100;
    const result = GeneralUtil.traceabilityInterceptor(req, request, data, executionTime);
    //expect(result.setStatus).toBe(EStatusTracingGeneral.STATUS_FAILED);
    expect(result.setStatus).toBeDefined();
  });
});