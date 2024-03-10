/**
 * Dto que valida los datos de registro del mockup
 * @author Fredy Santiago Martinez
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Max, Min, ValidateIf } from "class-validator";


export class CreateMockupDto {
    
    @ApiProperty({ type: 'number', required: false, description: "Identificador" })
    @ValidateIf(v => v.id != null)
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    id: number;

    @ApiProperty({  type: 'string', required: true, description: "Detalle del mockup" })
    @IsString()
    @Length(5, 50)
    message: string;
}
