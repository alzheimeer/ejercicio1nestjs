/**
 * Clase que guarda la trazabilidad del microservicio
 * @author Fredy Santiago Martinez
 */
import { IServiceTracing } from "src/core/entity/service-tracing/service-tracing.entity";
import { EStatusTracingGeneral } from "../utils/enums/tracing.enum";

export default class Traceability {

    private readonly Traceability: IServiceTracing;

    constructor(traceability: IServiceTracing) {
        this.Traceability = traceability;
    }

    /**
     * Asignación del transactionId realizada utilizado en peticiones recibidas 
     * @param {string} transactionId tarea con la información de estado de peticiones recibidas
     */
    public setTransactionId(transactionId: string) {
        this.Traceability.transactionId = transactionId;
    }

    /**
    * Asignación del estado de la trazabilidad
    */
    public setStatus(status: string) {
        this.Traceability.status = status;
    }

    /**
    * Asignación del origen de la trazabilidad
    */
    public setOrigen(origen: string) {
        this.Traceability.origen = origen;
    }

    /**
    * Asignación de la tarea enviado en el request
    */
    public setTask(task: string) {
        this.Traceability.task = task;
    }

    /**
    * Asignación de la descripcion enviado en el request
    */
    public setDescription(description: string) {
        this.Traceability.description = description;
    }

    /**
    * Retorna arreglo con información de trazabilidad
    */
    public getTraceability() {
        return this.Traceability;
    }

    /**
     * Asignación del request utilizado en peticiones recibidas 
     * @param {Object} request Arreglo con información de peticiones recibidas
     */
    public setRequest(request: any) {
        this.Traceability.request = request;
    }

    /**
     * Asignación del metodo realizada utilizado en peticiones recibidas 
     * @param {string} method tarea con el metodo del metodo usado en respuesta de peticiones recibidas
     */
    public setMethod(method: string) {
        this.Traceability.method = method;
    }

    /**
     * Asignación de la respuesta utilizado en peticiones recibidas 
     * @param {any} response Arreglo con información respuesta de peticiones recibidas
     */
    public setResponse(response: any) {
        this.Traceability.response = response;
    }

    /**
     * Asignación del processingTime utilizado en peticiones recibidas 
     * @param {Object} processingTime Arreglo con información de peticiones recibidas
     */
    public setProcessingTime(processingTime: any) {
        this.Traceability.processingTime = processingTime;
    }

    /**
     * Función para generar estado de trazabilidad según respuesta de legado
     * @param {any} result arreglo con información respuesta de legado
     * @returns Cadena con estado de trazabilidad según respuesta
     */
    public static getStatusTraceability(result: any) {
        let statusTraceability: EStatusTracingGeneral;
        if (!result.executed) {
            statusTraceability = EStatusTracingGeneral.LEGACY_ERROR;
        } else {
            statusTraceability = (result.status === 200 || result.status === 201) ? EStatusTracingGeneral.LEGACY_SUCCESS : EStatusTracingGeneral.LEGACY_WARN
        }
        return statusTraceability
    }

}