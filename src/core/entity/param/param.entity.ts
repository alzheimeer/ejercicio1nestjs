/**
 * Clase donde se definen los campos de los parametros generales
 * @author Santiago Martinez
 */
export interface IParam {
	id_param: string;
	description: string;
	status?: boolean;
	createdUser: string;
	updatedUser: string;
	createdAt: string;
	updatedAt: string;
	values: any;
}