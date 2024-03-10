/**
 * Clase con estructura para manejo de paginación
 */
 export class Pagination {

    readonly previousPageIndex?: number;
    readonly nextPageIndex?: number;
    readonly totalPages?: number;
    readonly pageIndex: number;
    readonly pageSize: number

    constructor(readonly totalDocuments: number, _pageIndex: number, _pageSize: number) {
        this.pageIndex = +_pageIndex;
        this.pageSize = +_pageSize;
        const tp = Math.trunc(totalDocuments / this.pageSize);
        this.totalPages = ((totalDocuments % this.pageSize) > 0) ? (tp + 1) : tp;
        this.previousPageIndex = (this.pageIndex > 1) ? (this.pageIndex - 1) : null;
        this.nextPageIndex = (this.pageIndex < this.totalPages) ? this.pageIndex + 1 : null;
    }
}

export class ResponsePaginator<T> {
    public readonly pagination: Pagination;

    constructor(public readonly data: T[], page: number, limit: number) {
        this.pagination = new Pagination(data?.length || 0, page, limit);
    }
}


