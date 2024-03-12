import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsBoolean, IsString, IsOptional } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "Address ID", required: false})
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Address detail"})
    readonly address: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: "Is the address active"})
    readonly isActive: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: "Is the address primary"})
    readonly isPrimary: boolean;
}