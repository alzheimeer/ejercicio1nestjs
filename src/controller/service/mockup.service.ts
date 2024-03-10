/**
 * Clase abstracta para realizar las respectivas operaciones de los mockups
 * @author Fredy Santiago Martinez
 */
import { Injectable } from '@nestjs/common';
import { CreateMockupDto } from '../dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from '../dto/mockup/update-mockup.dto';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IMockupService {

  /**  
    * Crear un mockup 
    * @param {CreateMockupDto} createMockupDto arreglo con información del mockup
    */
  abstract create(createMockupDto: CreateMockupDto): ResponseService;

  /**
    * Consulta todos los mockup segun el filtro
    * @param {string} channel Canal recibido por en el header
    * @param {number} page Cantidad de registros por página
    * @param {number} limit Número de página a consultar
    */
  abstract findAll(channel:string, page: number, limit: number);

  /**
    * Consulta mockup por Id
    * @param {number} id Identificador del mockup
    */
  abstract findOne(id: number): ResponseService;

  /**
    * Actualiza un mockup 
    * @param {number} id Identificador del mockup
    * @param {UpdateMockupDto} updateMockupDto Información asociada al mockup
    */
  abstract update(id: number, updateMockupDto: UpdateMockupDto): ResponseService;

  /**
    * Elimina el mockup por Id
    * @param {number} id Identificador del mockup
    */
  abstract remove(id: number): ResponseService;
}
