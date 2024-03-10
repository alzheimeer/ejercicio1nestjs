/**
 * Clase para realizar las respectivas operaciones de mockups
 * @author Oscar Avila
 */

import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import Logging from '../../../common/lib/logging';
import { Etask } from '../../../common/utils/enums/taks.enum';
import { ResponseService } from '../../../controller/dto/response-service.dto';
import { UpdateMockupDto } from '../../dto/mockup/update-mockup.dto';
import { CreateMockupDto } from '../../dto/mockup/create-mockup.dto';
import { IMockupService } from '../mockup.service';
import { ResponsePaginator } from '../../../controller/dto/response-paginator.dto';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { IGlobalValidateIService } from '../globalValidate.service';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';

@Injectable()
export class MockupService implements IMockupService {

  private readonly logger = new Logging(MockupService.name);

  constructor(
    public readonly _GlobalValidate: IGlobalValidateIService,
  ) { }

  /** 
    * Crear un mockup
    * @param {CreateMockupDto} createMockupDto arreglo con información del mockup
    */
  create(createMockupDto: CreateMockupDto) {
    this.logger.write('create()', Etask.CREATE, ELevelsErros.INFO);
    return new ResponseService(true, createMockupDto.message, 200, createMockupDto);
  }

  /**
    * Consulta todos los mockup segun el filtro
    * @param {string} channel Canal recibido por en el header
    * @param {number} page Cantidad de registros por página
    * @param {number} limit Número de página a consultar
    */
  async findAll(channel:string, page: number = 1, limit: number = 10) {    
    this.logger.write('findAll()', Etask.FINDALL, ELevelsErros.INFO);
    const documents: CreateMockupDto[] = [
      { id: 1, message: 'Mockup one' },
      { id: 2, message: 'Mockup two' },
      { id: 3, message: 'Mockup three' },
      { id: 4, message: 'Mockup four' }
    ];
    //Se valida canal
    await this._GlobalValidate.validateChannel(channel);

    return new ResponseService(true, EmessageMapping.DEFAULT, 200, new ResponsePaginator(documents, page, limit));  
  }

  /**
    * Consulta mockup por Id
    * @param {number} id Identificador del mockup
    * */
  findOne(id: number) {
    this.logger.write('findOne()', Etask.FINDONE, ELevelsErros.INFO);
    return new ResponseService(true, EmessageMapping.DEFAULT, 200, { id: 1, message: 'Mockup one' });
  }

  /**
    * Actualiza un mockup 
    * @param {number} id Identificador del mockup
    * @param {UpdateMockupDto} updateMockupDto Información asociada al mockup
    */
  update(id: number, updateMockupDto: UpdateMockupDto) {

    if (id != updateMockupDto.id) {
      this.logger.write('update()', Etask.UPDATE, ELevelsErros.WARNING, updateMockupDto);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return new ResponseService(true, `This action update a #${id} mockup`, 200, updateMockupDto);
  }

  /**
    * Elimina el mockup por Id
    * @param {number} id Identificador del mockup
    */
  remove(id: number) {
    this.logger.write('remove()', Etask.REMOVE, ELevelsErros.INFO);
    return new ResponseService(true, `This action removes a #${id} mockup`);
  }
}
