import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '123 Main St', description: 'The address of the user' })
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: true, description: 'Whether the address is active', required: false })
    readonly isActive?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false, description: 'Whether the address is the primary address', required: false })
    readonly isPrimary?: boolean;
}