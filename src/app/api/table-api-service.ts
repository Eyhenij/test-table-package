import { inject, Injectable } from '@angular/core';

import { BaseApiService } from './base-api.service';
import { TableEntityModelMapper } from './table-entity-model.mapper';
import { API_FACADE } from '../util/tokens';
import { IEntitiesApiFacade } from '../util/interfaces';


@Injectable()
export class TableApiService extends BaseApiService<object, object, string> {
    protected override readonly mapper: TableEntityModelMapper = new TableEntityModelMapper();
    protected override readonly apiFacade: IEntitiesApiFacade<object, string> = inject(API_FACADE);
}
