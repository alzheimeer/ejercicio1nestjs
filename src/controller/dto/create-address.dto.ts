import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '123 Main St', description: 'La direccion del usuario' })
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: true, description: 'Cuando la direccion esta activa', required: false })
    readonly isActive?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false, description: 'Cuando la direccion es la direccion principal', required: false })
    isPrimary?: boolean;
}