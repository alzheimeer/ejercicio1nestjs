/**
 * Dto que valida el manejo de errores
 * @author Fredy Santiago Martinez
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class IErrorDTO {
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false, description: "This is page of query" })
    page?: number=1;
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false, description: "This is limit of query" })
    limit?: number;

    @ApiProperty({ type: 'date', required: true, description: "This is startDate of query"})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty({ required: true, description: "This is endDate of query"})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;
}