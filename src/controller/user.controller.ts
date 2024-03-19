  /**
 * Clase de endpoints al microservicio Users
 * @author Carlos Mauricio Quintero
 */
import { Body, Controller, Get, Post, Put, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IUserService } from './service/user.service';
import generalConfig from 'src/common/configuration/general.config';
import { MethodUser } from 'src/common/utils/enums/mapping-api-rest';
import Logging from 'src/common/lib/logging';
import { EStatusTracingGeneral, Etask } from 'src/common/utils/enums/taks.enum';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import Traceability from 'src/common/lib/traceability';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { UserResponseDto } from './dto/user-response.dto';



  @ApiTags(generalConfig.controllerUser) 
  @Controller(`${generalConfig.apiVersion}${generalConfig.controllerUser}`)
  export class UserController {
    private readonly logger = new Logging(UserController.name);

    constructor( 
      private readonly _userService: IUserService,
      private readonly _serviceTracing: IServiceTracingUc
    ) {}
  
    @Post()
    @ApiOperation({ description: 'Crea un nuevo usuario con direcciones' })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    async createUser(@Body() createUserDto: CreateUserDto) {
      this.logger.write(`createUser()`, Etask.CREATE_USER, ELevelsErros.INFO);
      const user = await this._userService.createUser(createUserDto);
      if (!user) {
        throw new BadRequestException('No se pudo crear el usuario');
      }
      const traceability = new Traceability({
        origen: `${generalConfig.apiVersion}${generalConfig.controllerUser}`,
        description: Etask.CREATE_USER,
        task: Etask.CREATE_USER,
        status: EStatusTracingGeneral.STATUS_SUCCESS,
      });
      this._serviceTracing.createServiceTracing(traceability.getTraceability());
      return user;
    }
  
    @Get(MethodUser.GETALL)
    @ApiOperation({ description: 'Obtiene todos los usuarios y su dirección principal activa' })
    @ApiResponse({ status: 200, description: 'Usuarios econtrados' })
    async getAllUsers() {
      this.logger.write(`getAllUsers()`, Etask.FINDALL_USER, ELevelsErros.INFO); 
      const users = await this._userService.getAllUsers();
      const traceability = new Traceability({
        origen: `${generalConfig.apiVersion}${generalConfig.controllerUser}`,
        description: Etask.FINDALL_USER,
        task: Etask.FINDALL_USER,
        status: EStatusTracingGeneral.STATUS_SUCCESS,
      });
      this._serviceTracing.createServiceTracing(traceability.getTraceability());
      return users;
      
    }

    @Get(MethodUser.GETBYID)
    @ApiOperation({ description: 'Obtiene un usuario y su dirección principal activa' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    async getUser(@Param('userId') userId: string): Promise<UserResponseDto | undefined> {
      const user = await this._userService.getUserAndMainAddress(userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const traceability = new Traceability({
        origen: `${generalConfig.apiVersion}${generalConfig.controllerUser}`,
        description: Etask.FINDONE_USER,
        task: Etask.FINDONE_USER,
        status: EStatusTracingGeneral.STATUS_SUCCESS,
      });
      this._serviceTracing.createServiceTracing(traceability.getTraceability());
      return user;
    }
    
  
    @Put(MethodUser.UPDATE)
    @ApiOperation({ description: 'Actualiza las direcciones de un usuario' })
    @ApiResponse({ status: 200, description: 'Direcciones actualizadas' })
    async updateAddresses( @Param('userId') userId: string, @Body() updateAddressDtos: UpdateAddressDto[] ) {
      this.logger.write(`updateAddresses()`, Etask.UPDATE_USER_ADDRESS, ELevelsErros.INFO); 
      const result = await this._userService.updateAddresses(userId, updateAddressDtos);
      if (!result) {
        throw new BadRequestException('No se pudieron actualizar las direcciones');
      }
      const traceability = new Traceability({
        origen: `${generalConfig.apiVersion}${generalConfig.controllerUser}`,
        description: Etask.UPDATE_USER_ADDRESS,
        task: Etask.UPDATE_USER_ADDRESS,
        status: EStatusTracingGeneral.STATUS_SUCCESS,
      });
      this._serviceTracing.createServiceTracing(traceability.getTraceability());
      return result;
    }
  }