import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    readonly addressLine: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly department: string;

    @IsString()
    readonly country: string;

    @IsBoolean()
    @IsOptional()
    readonly principal?: boolean = false;

    @IsBoolean()
    @IsOptional()
    readonly active?: boolean = true;
}
