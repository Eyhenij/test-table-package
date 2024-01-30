import { inject, Inject, Injectable, Optional } from '@angular/core';

import { API_SERVICE, INITIAL_ENTITIES_STATE } from '../../projects/table/src/lib/util/tokens';
import { BaseEntitiesStoreService } from '../../projects/table/src/lib/data-access/base-entities-store.service';
import { BASE_INITIAL_STATE, TABLE_CONST } from '../../projects/table/src/lib/util/constants';
import { IEntitiesApiService, IEntitiesState } from '../../projects/table/src/lib/util/interfaces';


export type IBranchesUpsertEntitiesState = IEntitiesState<object, string>;

const initialState: IBranchesUpsertEntitiesState = {
    ...BASE_INITIAL_STATE.ENTITIES,
    sortModel: TABLE_CONST.DEFAULT_LIST_SORT_MODEL,
    entities: [],
};


/**
 * @description Service extends BaseEntitiesStoreService, you can override any method of base service here
 */
@Injectable()
export class TableEntitiesStoreService extends BaseEntitiesStoreService<any, string> {
    protected override readonly apiService: IEntitiesApiService<object, string> = inject(API_SERVICE);

    constructor(
        @Optional()
        @Inject(INITIAL_ENTITIES_STATE)
        protected override readonly providedInitialEntitiesState: Partial<IBranchesUpsertEntitiesState>,
    ) {
        super({ ...initialState, ...providedInitialEntitiesState });
    }
}
