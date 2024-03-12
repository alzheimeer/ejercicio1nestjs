import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { IUser } from 'src/core/entity/user.interface';
import { Address } from './model/address.model';

@Injectable()
export abstract class IUserProvider {
    abstract createUser(createUserDto: CreateUserDto): Promise<IUser>;
    abstract getUserById(userId: string): Promise<IUser | null>;
    abstract updateUserAddresses(userId: string, addresses: Address[]): Promise<boolean>;
}