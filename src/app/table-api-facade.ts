import { Injectable } from '@angular/core';

import { BaseApiFacade } from '../../projects/table/src/lib/api/base-api-facade';
import { Nullable } from '../../projects/table/src/lib/util/interfaces';


@Injectable()
export class TableApiFacade extends BaseApiFacade<object, string> {
    protected override readonly getListUrl: Nullable<string> = 'posts';
}
