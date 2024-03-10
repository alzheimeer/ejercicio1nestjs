// create-user.dto.ts
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
    @IsString()
    readonly street: string;

    // Agregar más propiedades según el modelo de dirección
}

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    readonly addresses: AddressDto[];
}


