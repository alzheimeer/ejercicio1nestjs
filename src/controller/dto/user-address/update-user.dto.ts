import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from './update-address.dto'; // Asume que ya tienes este DTO

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly documentType?: string;

    @IsString()
    @IsOptional()
    readonly documentNumber?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    @IsOptional()
    readonly addresses?: UpdateAddressDto[];
}
