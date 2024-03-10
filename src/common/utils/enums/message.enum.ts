/**
 * Enumera la identificación de mensajes usados en el microservicio para mapear la respuesta de una petición api recibida
 * @author Fredy Santiago Martinez
 */
export enum EmessageMapping {
    CHANNEL_ERROR = 'CHANNEL_ERROR',
    DEFAULT_ERROR = 'DEFAULT_ERROR',
    DEFAULT ='DEFAULT',
    ERROR_TIMEOUT_LEGACY = 'ERROR_TIMEOUT_LEGACY',
}


export enum ETaskMessageGeneral {
    GET_BY_ID = "GET_ID_MESSAGE",
    GET_ALL = "GET_ALL_MESSAGES"
}