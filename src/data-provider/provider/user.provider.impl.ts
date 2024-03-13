import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { IUser } from 'src/core/entity/user.interface';
import { IAddress } from 'src/core/entity/address.interface';
import { IUserProvider } from '../user.provider';
import { UserModel } from '../model/user.model';
import { Address, AddressSchema } from '../model/address.model';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';

@Injectable()
export class UserProvider implements IUserProvider {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = new this.userModel(createUserDto);
        const savedUser = await newUser.save();
        return this.toIUser(savedUser);
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) return null;
        return this.toIUser(user);
    }

    async updateUserAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) return false;

        user.addresses = [];

        updateAddressDtos.forEach(dto => {
        const address = new Address({
            address: dto.address,
            isActive: dto.isActive,
            isPrimary: dto.isPrimary
        });

        user.addresses.push(address);
    });
        await user.save();
        return true;
    }

    private toIUser(user: UserModel): IUser {
        return {
            id: user._id.toString(),
            name: user.name,
            documentNumber: user.documentNumber,
            documentType: user.documentType,
            addresses: user.addresses.map(this.toIAddress)
        };
    }

    private toIAddress(address: any): IAddress {
        return {
            id: address._id.toString(),
            address: address.address,
            isActive: address.isActive,
            isPrimary: address.isPrimary
        };
    }
}
