// update-address.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
    @IsString()
    readonly id: string; // Identificador de la dirección

    @IsBoolean()
    @IsOptional()
    readonly active?: boolean; // Opcional, para marcar si la dirección está activa

    // Agregar más propiedades para la actualización según el modelo de dirección
}