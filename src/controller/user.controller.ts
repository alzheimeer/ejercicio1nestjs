import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    BadRequestException,
    Inject,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateAddressDto } from './dto/update-address.dto';
  import { IUserService } from './service/user.service';
  
  @ApiTags('users')
  @Controller('api/v1/users')
  export class UserController {
    constructor(
      @Inject('IUserService')
      private readonly userService: IUserService
    ) {}
  
    @Post()
    @ApiOperation({ description: 'Crea un nuevo usuario con direcciones' })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    async createUser(@Body() createUserDto: CreateUserDto) {
      const user = await this.userService.createUser(createUserDto);
      if (!user) {
        throw new BadRequestException('No se pudo crear el usuario');
      }
      return user;
    }
  
    @Get(':userId')
    @ApiOperation({ description: 'Obtiene un usuario y su dirección principal activa' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    async getUser(@Param('userId') userId: string) {
      const user = await this.userService.getUserAndMainAddress(userId);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      return user;
    }
  
    @Put(':userId/addresses')
    @ApiOperation({ description: 'Actualiza las direcciones de un usuario' })
    @ApiResponse({ status: 200, description: 'Direcciones actualizadas' })
    async updateAddresses(
      @Param('userId') userId: string,
      @Body() updateAddressDtos: UpdateAddressDto[]
    ) {
      const result = await this.userService.updateAddresses(userId, updateAddressDtos);
      if (!result) {
        throw new BadRequestException('No se pudieron actualizar las direcciones');
      }
      return result;
    }
  }