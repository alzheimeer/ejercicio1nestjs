import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', example: 'Carlos Perez', description: 'El nombre de usuario' })
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', example: '1234567890', description: 'El numero de documento del usuario' })
    readonly documentNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', example: 'ID', description: 'El tipo de documento del usuario' })
    readonly documentType: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    @ApiProperty({ description: "Lista de direcciones del usuario", type: [CreateAddressDto]})
    readonly addresses: CreateAddressDto[];
} 