/**
 * Se define la configuracion de las interfaces usadas para consumos a legados
 * @author Fredy Santiago Martinez
 */

export interface IRequestConfigHttp {
    method: EHttpMethod;
    url: string
    headers?: any;
    params?: any;
    data?: any;
    preambleCRLF?: boolean;
    postambleCRLF?: boolean;
}


export enum EHttpMethod {
    get = 'GET',
    delete = 'DELETE',
    post = 'POST',
    put = 'PUT',
}


export interface IRequestConfigHttpSOAP {
    url: string
    soapAction: any;
    data: string;
}