import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUser } from '../entity/user.interface';

@Injectable()
export abstract class IUserUc {
    abstract createUser(createUserDto: CreateUserDto): Promise<IUser>;
    abstract getAllUsers(): Promise<IUser[]>;
    abstract getUserAndMainAddress(userId: string): Promise<IUser>;
    abstract updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean>;
}