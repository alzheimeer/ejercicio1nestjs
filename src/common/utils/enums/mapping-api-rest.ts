/**
 * Enumera los nombres de metodos usados en el microservicio
 * @author Fredy Santiago Martinez
 */

export enum MethodMessage {
    GETBYID = ':Id',
    GETALL = '/',
    UPDATE = ':Id'
}

export enum MethodUser {
    GETBYID = ':userId',
    GETALL = '/',
    UPDATE = ':userId/addresses'
}
