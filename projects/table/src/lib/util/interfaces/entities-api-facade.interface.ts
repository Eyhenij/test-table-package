import { Observable } from 'rxjs';
import { PaginationListApiModel } from './pagination-list-api.model';
import { GridRequestInterface } from './grid-request.interface';


/**
 * Interface for implementation of the "Adapter" pattern;
 * Layer for managing of data-sources:
 * - REST http-calls;
 * - gRPC calls;
 * - etc.;
 */
export interface IEntitiesApiFacade<ENTITY_TYPE, SORT_PROPERTY_TYPE> {
    getList(
        params: GridRequestInterface<SORT_PROPERTY_TYPE>,
        body: object
    ): Observable<PaginationListApiModel<ENTITY_TYPE> | ENTITY_TYPE[]>;
}
