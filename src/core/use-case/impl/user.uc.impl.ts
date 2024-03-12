import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from 'src/controller/dto/create-user.dto';
import { UpdateAddressDto } from 'src/controller/dto/update-address.dto';
import { IUserUc } from '../user.uc';
import { IUser } from '../../../core/entity/user.interface';
import { IAddress } from '../../../core/entity/address.interface';
import { UserModel } from 'src/data-provider/model/user.model';

@Injectable()
export class UserUcImpl implements IUserUc {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserModel>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const createdUser = new this.userModel(createUserDto);
        const savedUser = await createdUser.save();
        return this.toIUser(savedUser);
    }

    async getUserAndMainAddress(userId: string): Promise<IUser> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
        }
        const mainAddress = user.addresses.find(address => address.isPrimary && address.isActive);
        const resultUser = this.toIUser(user);
        resultUser.addresses = mainAddress ? [this.toIAddress(mainAddress)] : [];
        return resultUser;
    }

    async updateAddresses(userId: string, updateAddressDtos: UpdateAddressDto[]): Promise<boolean> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
        }

        // user.addresses = updateAddressDtos.map(dto => ({...dto}));
        user.addresses = addresses.map(addr => ({
            ...addr,
            _id: addr.id ? new mongoose.Types.ObjectId(addr.id) : new mongoose.Types.ObjectId(),
        }));
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

    private toIAddress(address: any): IAddress { // Asegúrate de tipar correctamente este método según tus necesidades
        return {
            id: address._id.toString(),
            address: address.address,
            isActive: address.isActive,
            isPrimary: address.isPrimary
        };
    }
}