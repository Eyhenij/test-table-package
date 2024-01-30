import { inject, Injectable } from '@angular/core';

import { BaseApiService } from '../../projects/table/src/lib/api';
import { TableEntityModelMapper } from './table-entity-model.mapper';
import { API_FACADE } from '../../projects/table/src/lib/util';
import { IEntitiesApiFacade } from '../../projects/table/src/lib/util';


@Injectable()
export class TableApiService extends BaseApiService<object, object, string> {
    protected override readonly mapper: TableEntityModelMapper = new TableEntityModelMapper();
    protected override readonly apiFacade: IEntitiesApiFacade<object, string> = inject(API_FACADE);
}
