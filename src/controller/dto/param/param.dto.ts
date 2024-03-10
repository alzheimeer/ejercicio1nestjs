/**
 * Dto que valida los parametros
 * @author Fredy Santiago Martinez
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsObject } from 'class-validator';

export class IParamDTO {

    @ApiProperty({ type: 'string', required: true, description: "Unique name" })
    @IsNotEmpty()
    @IsString()
    id_param: string;

    @ApiProperty({ type: 'string', required: true, description: "This is a description the param" })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ type: 'boolean', required: false, description: "This is status of param (active-inactive)" })
    @IsNotEmpty()
    @IsBoolean()
    status?: boolean = true;

    @ApiProperty({ type: 'string', required: false, description: "Name of the user creator" })
    @IsString()
    createdUser: string;

    @ApiProperty({ type: 'string', required: false, description: "Name of the last user modifier" })
    @IsString()
    updatedUser: string;

    @ApiProperty({ type: 'string', required: false, description: "Creation date" })
    @IsString()
    createdAt: string;

    @ApiProperty({ type: 'string', required: false, description: "Last update date" })
    @IsString()
    updatedAt: string;

    @ApiProperty({ type: 'any', required: true, description: "Data values" })
    @IsNotEmpty()
    @IsObject()
    values: any;
}