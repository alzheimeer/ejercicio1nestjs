import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString, IsOptional } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    @ApiProperty({ type: 'string', example: "65f36dba83b7dd878dbf4ac1", description: "Direccion ID", required: false})
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', example:"Calle 34 4-89" , description: "Detalles de la direccion"})
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ type: 'boolean', example:true ,description: "La direccion esta activa"})
    readonly isActive: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ type: 'boolean', example:true ,description: "La direccion es la Principal"})
    readonly isPrimary: boolean;
}