import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string', example: '123 Main St', description: 'La direccion del usuario' })
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ type: 'boolean', example: true, description: 'Cuando la direccion esta activa', required: false })
    readonly isActive?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ type: 'boolean', example: false, description: 'Cuando la direccion es la direccion principal', required: false })
    isPrimary?: boolean;
}