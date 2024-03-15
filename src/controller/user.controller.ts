  /**
 * Clase de endpoints al microservicio Users
 * @author Carlos Mauricio Quintero
 */
  import { Body, Controller, Get, Post, Put, Param, BadRequestException, Inject, } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateAddressDto } from './dto/update-address.dto';
  import { IUserService } from './service/user.service';
  import generalConfig from 'src/common/configuration/general.config';
import { MethodUser } from 'src/common/utils/enums/mapping-api-rest';
  
  @ApiTags(generalConfig.controllerUser) 
  //@ApiTags('users') 
  @Controller(`${generalConfig.apiVersion}${generalConfig.controllerUser}`)
  // @Controller('V1/users')

  export class UserController {
    constructor(
      private readonly _userService: IUserService 
    ) {}
  
    @Post()
    @ApiOperation({
       description: 'Crea un nuevo usuario con direcciones' 
    })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    async createUser(@Body() createUserDto: CreateUserDto) {
      const user = await this._userService.createUser(createUserDto);
      if (!user) {
        throw new BadRequestException('No se pudo crear el usuario');
      }
      return user;
    }
  
    @Get(MethodUser.GETALL)
    @ApiOperation({ description: 'Obtiene todos los usuarios y su dirección principal activa' })
    @ApiResponse({ status: 200, description: 'Usuarios econtrados' })
    async getAllUsers() {
      return await this._userService.getAllUsers();
    }

    @Get(MethodUser.GETBYID)
    @ApiOperation({ description: 'Obtiene un usuario y su dirección principal activa' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    async getUser(@Param('userId') userId: string) {
      const user = await this._userService.getUserAndMainAddress(userId);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      return user;
    }
  
    @Put(MethodUser.UPDATE)
    @ApiOperation({ description: 'Actualiza las direcciones de un usuario' })
    @ApiResponse({ status: 200, description: 'Direcciones actualizadas' })
    async updateAddresses(
      @Param('userId') userId: string,
      @Body() updateAddressDtos: UpdateAddressDto[]
    ) {
      const result = await this._userService.updateAddresses(userId, updateAddressDtos);
      if (!result) {
        throw new BadRequestException('No se pudieron actualizar las direcciones');
      }
      return result;
    }
  }