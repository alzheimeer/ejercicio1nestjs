import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IUserService {
    abstract createUser(createUserDto: CreateUserDto): Promise<ResponseService>;
    abstract getUserAndMainAddress(userId: string): Promise<ResponseService>;
    abstract updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<ResponseService>;
}