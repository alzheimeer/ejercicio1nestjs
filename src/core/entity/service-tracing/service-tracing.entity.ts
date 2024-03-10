/**
 * Clase donde se definen los campos para la trazabilidad
 * @author Fredy Santiago Martinez
 */

export interface IServiceTracing {
	transactionId?: string;
	status? : string; 
	origen? : string;
	task?: string;
	description?: string;
	request?: any;
	method?: string;
	response?: any;
	processingTime?: number;

}
export interface IServiceTracingInicial {
	id:string,
	client?: object;
	origen : string;
	request? : object;
	channel?:string;
	method?: string;
	response?: any;
}