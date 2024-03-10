import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateAddressDto } from './dto/user-address/';
import { UsersService } from '../controller/service/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get(':id/direccion-principal')
    async getUserMainAddress(@Param('id') userId: string) {
        return this.usersService.getUserMainAddress(userId);
    }

    @Put(':id/direcciones')
    async updateUserAddresses(@Param('id') userId: string, @Body() updateAddressDto: UpdateAddressDto[]) {
        return this.usersService.updateUserAddresses(userId, updateAddressDto);
    }
}
