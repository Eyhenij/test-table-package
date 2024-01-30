import { Observable } from 'rxjs';
import { PaginationListStateModel } from './pagination-list-state.model';
import { GridRequestInterface } from './grid-request.interface';


/**
 * Interface for implementation of the "Adapter" pattern;
 * Layer for transformation api models to state models
 */
export interface IEntitiesApiService<
    ENTITY_TYPE,
    SORT_PROPERTY_TYPE,
> {
    getList(
        params: GridRequestInterface<SORT_PROPERTY_TYPE>,
        body: {}
    ): Observable<PaginationListStateModel<ENTITY_TYPE> | ENTITY_TYPE[]>;
}
