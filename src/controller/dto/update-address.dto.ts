import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString, IsOptional } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "Direccion ID", required: false})
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Detalles de la direccion"})
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: "La direccion esta activa"})
    readonly isActive: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: "La direccion es la Principal"})
    readonly isPrimary: boolean;
}