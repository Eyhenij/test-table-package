import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { GridRequestInterface, IEntitiesApiFacade, Nullable, PaginationListApiModel } from '../util/interfaces';
import { ApiService } from './api-service';
import { generateGetListUrl } from './generate-url';


/**
 * Implementation for "Adapter" pattern;
 * Layer for managing of data-sources:
 * - REST http-calls;
 * - gRPC calls;
 * - etc.;
 */
export abstract class BaseApiFacade<
    ENTITY_API_TYPE extends object,
    SORT_PROPERTY_TYPE
> implements IEntitiesApiFacade<ENTITY_API_TYPE, SORT_PROPERTY_TYPE> {
    protected readonly getListUrl: Nullable<string>;
    protected readonly apiService: ApiService = inject(ApiService);

    public getList(
        params: GridRequestInterface<SORT_PROPERTY_TYPE>,
        body: {}
    ): Observable<PaginationListApiModel<ENTITY_API_TYPE> | ENTITY_API_TYPE[]> {
        if (this.getListUrl) {
            return this.apiService.post<
                PaginationListApiModel<ENTITY_API_TYPE> | ENTITY_API_TYPE[],
                {}
            >(`${this.getListUrl}${generateGetListUrl(params)}`, body);
        } else {
            throw new HttpErrorResponse({ status: 400, error: 'The action is not allowed' });
        }
    }
}
