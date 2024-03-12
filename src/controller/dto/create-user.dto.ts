import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '1234567890', description: 'The document number of the user' })
    readonly documentNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'ID', description: 'The document type of the user' })
    readonly documentType: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    @ApiProperty({ description: "List of user addresses", type: [CreateAddressDto]})
    readonly addresses: CreateAddressDto[];
}