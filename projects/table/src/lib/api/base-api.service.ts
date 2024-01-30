import { map, Observable } from 'rxjs';
import {
    GridRequestInterface,
    IEntitiesApiFacade,
    IEntitiesApiService,
    IMapper,
    PaginationListApiModel,
    PaginationListStateModel
} from '../util/interfaces';
import { convertPaginationApiModelToStateModel } from './pagination-converter';


/**
 * Implementation for "Adapter" pattern;
 * Layer for transformation api models to state models
 */
export abstract class BaseApiService<
    ENTITY_API_TYPE,
    ENTITY_STATE_TYPE,
    SORT_PROPERTY_TYPE,
> implements IEntitiesApiService<ENTITY_STATE_TYPE, SORT_PROPERTY_TYPE> {
    protected readonly mapper: IMapper<ENTITY_API_TYPE, ENTITY_STATE_TYPE>;
    protected readonly apiFacade: IEntitiesApiFacade<ENTITY_API_TYPE, SORT_PROPERTY_TYPE>;

    public getList(
        params: GridRequestInterface<SORT_PROPERTY_TYPE>,
        body: {}
    ): Observable<PaginationListStateModel<ENTITY_STATE_TYPE> | ENTITY_STATE_TYPE[]> {
        return this.apiFacade.getList(params, body).pipe(
            map((response: PaginationListApiModel<ENTITY_API_TYPE> | ENTITY_API_TYPE[]) => {
                if (Array.isArray(response)) {
                    return response.map((el: ENTITY_API_TYPE): ENTITY_STATE_TYPE => {
                        return this.mapper.mapFrom(el);
                    });
                } else {
                    return convertPaginationApiModelToStateModel(
                        (company: ENTITY_API_TYPE): ENTITY_STATE_TYPE => this.mapper.mapFrom(company),
                        response
                    );
                }
            })
        );
    }
}
