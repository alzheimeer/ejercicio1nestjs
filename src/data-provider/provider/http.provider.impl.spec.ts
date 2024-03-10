import { TestingModule, Test } from "@nestjs/testing";
import { ResponseHttp } from "../model/http/response-http.model";
import { HttpProvider } from "./http.provider.impl";
import { AxiosResponse } from 'axios';
import { EHttpMethod, IRequestConfigHttp, IRequestConfigHttpSOAP } from "../model/http/request-config-http.model";
import { IServiceTracingProvider } from '../service-tracing.provider';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { IServiceTracing } from "src/core/entity/service-tracing/service-tracing.entity";


describe('HttpProvider', () => {
  let httpProvider: HttpProvider;
  let iServiceTracingProvider: IServiceTracingProvider;
  let httpService: HttpService;

  // let mockResponseHttp: jest.Mocked<ResponseHttp>;
  //let responseHttp : jest.Mocked<ResponseHttp>;

  beforeEach(async () => {

    /*const iServiceTracingProvider: IServiceTracingProvider = {
      createServiceTracing: jest.fn(),
    };*/



    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpProvider,
        { provide: IServiceTracingProvider, useValue: iServiceTracingProvider },
        { provide: HttpService, useValue: httpService },],
    }).compile();

    httpProvider = module.get<HttpProvider>(HttpProvider);
  });

  afterEach(() => {
    jest.resetAllMocks
  });

  describe('executeRest', () => {
    it('should execute a REST request successfully', async () => {
      // Define los datos de prueba
      const requestConfig: IRequestConfigHttp = {
        method: EHttpMethod.get,
        url: ""
      };

      const mockHeaders: Record<string, string | string[]> = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
        requestStartedAt: "1703351372162",
        processingTime: "20",
        // Add any other headers you need
      };

      const mockResponse: AxiosResponse = {
        data: 'mock data',
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: "",
          method: "get",
          headers: mockHeaders as any,

          transformRequest: [(data: any) => data],
          transformResponse: [(data: any) => data],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
        },
        request: { sillegoalgo: "sillegoalgo" }

      };

      const mockResponseconfig = {
        config: {
          headers: mockHeaders as any,
        },
      };

      const httpService = jest.fn().mockImplementation(() => ({
        request: jest.fn().mockReturnValue(of(mockResponse)),
        //axiosRef: { interceptors: { request: { use: jest.fn(() => mockResponseconfig) }, response: { use: jest.fn(() => mockResponseconfig) } } },
        axiosRef: { interceptors: { request: { use: jest.fn().mockReturnValue(mockResponseconfig) }, response: { use: jest.fn(() => mockResponseconfig) } } },
      }))();

      const serviceTracing: IServiceTracing = {
        transactionId: "123456789",
        status: "success",
        origen: "API",
        task: "processData",
        description: "Processing data",
        request: { data: "example" },
        method: "POST",
        response: { message: "Data processed successfully" },
        processingTime: 1000
      };

      const iServiceTracingProvider: IServiceTracingProvider = {
        createServiceTracing: jest.fn().mockReturnValue(serviceTracing),
      };

      httpProvider = new HttpProvider(iServiceTracingProvider, httpService);
      const result: ResponseHttp<any> = await httpProvider.executeRest(requestConfig);


      expect(result.status).toEqual(200);

    });


  });

  describe('executeSOAP', () => {
    it('should execute a SOAP request and return the response', async () => {

      // Define los datos de prueba
      const requestConfig: IRequestConfigHttpSOAP = {
        url: "https://api.example.com",
        data: "<Flower><name>Poppy</name><color>RED</color><petals>9</petals></Flower>",
        soapAction: "https://api.example.com/soapAction"
      };

      const mockHeaders: Record<string, string | string[]> = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': 'soapAction',
        requestStartedAt: "1703351372162",
        processingTime: "20",
        // Add any other headers you need
      };

      const mockResponse: AxiosResponse = {
        data: "<Flower><name>Poppy</name><color>RED</color><petals>9</petals></Flower>",
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          url: "",
          method: "get",
          headers: mockHeaders as any,

          transformRequest: [(data: any) => data],
          transformResponse: [(data: any) => data],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
        },
        request: { sillegoalgo: "sillegoalgo" }

      };

      const mockResponseconfig = {
        config: {
          headers: mockHeaders as any,
        },
      };

      const httpService = jest.fn().mockImplementation(() => ({
        request: jest.fn().mockReturnValue(of(mockResponse)),
        axiosRef: { interceptors: { request: { use: jest.fn(() => mockResponseconfig) }, response: { use: jest.fn(() => mockResponseconfig) } } },
      }))();

      const serviceTracing: IServiceTracing = {
        transactionId: "123456789",
        status: "success",
        origen: "API",
        task: "processData",
        description: "Processing data",
        request: { data: "example" },
        method: "POST",
        response: { message: "Data processed successfully" },
        processingTime: 1000
      };

      const iServiceTracingProvider: IServiceTracingProvider = {
        createServiceTracing: jest.fn().mockReturnValue(serviceTracing),
      };

      httpProvider = new HttpProvider(iServiceTracingProvider, httpService);
      const result: ResponseHttp<any> = await httpProvider.executeSOAP(requestConfig);

      expect(result.status).toEqual(200);
    });
  });
})