import { HttpPruebaController } from "./http-prueba.controller";
import { Test, TestingModule } from '@nestjs/testing';
import { IHttpPruebaService } from "./service/http-prueba.service";
import { IHttpPruebaUc } from "src/core/use-case/http-prueba.uc";


describe('se realiza el testeo a Controller', () => {
    let controller: HttpPruebaController
    let service: jest.Mocked<IHttpPruebaService>;
    let mockHttpPruebaUc: jest.Mocked<IHttpPruebaUc>;


    beforeEach(async () => {
        service = {
            getById: jest.fn(),
            getAll: jest.fn(),
          } as unknown as jest.Mocked<IHttpPruebaService>;

          mockHttpPruebaUc = {
            getById: jest.fn(),
            getAll: jest.fn(),
          } as jest.Mocked<IHttpPruebaUc>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [HttpPruebaController],
            providers: [
                { provide: IHttpPruebaService, useValue: service },
                { provide: IHttpPruebaUc, useValue: mockHttpPruebaUc },
            ],
        }).compile();
        controller = module.get<HttpPruebaController>(HttpPruebaController);
    });

    describe('de la funcion getbyId', () => {
        it('response exitoso', async () => {
            const expectValue = {
                success: true,
                message: 'suscess',
                status: 201,
                documents: 'token suscess',
                process: 'd0542610-858e-11ee-b63a-392be1944d49',
                requestTime: '2023-11-17T21:18:12+00:00',
                method: 'POST',
                origen: '/MSCommunicatInterToken/V1/Token/Validate'
            }
            service.getById.mockResolvedValue(expectValue);
            const cont = await controller.getById('1');
            expect(cont).toBe(expectValue);
            expect(service.getById).toHaveBeenCalled();
            //expect(cont).toStrictEqual(expectValue);
        });


        describe('de la funcion getAll', () => {
            it('response exitoso', async () => {
                const expectValue = {
                    success: true,
                    message: 'suscess',
                    status: 201,
                    documents: 'token suscess',
                    process: 'd0542610-858e-11ee-b63a-392be1944d49',
                    requestTime: '2023-11-17T21:18:12+00:00',
                    method: 'POST',
                    origen: '/MSCommunicatInterToken/V1/Token/Validate'
                }
                service.getAll.mockResolvedValue(expectValue);
                const cont = await controller.getAll(1, 15);
                expect(cont).toBe(expectValue);
                expect(service.getAll).toHaveBeenCalled();
            });
    
        });

    });

});

