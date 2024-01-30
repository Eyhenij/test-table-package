import { Injectable } from '@angular/core';

import { BaseApiFacade } from '../../projects/table/src/lib/api';
import { Nullable } from '../../projects/table/src/lib/util';


@Injectable()
export class TableApiFacade extends BaseApiFacade<object, string> {
    protected override readonly getListUrl: Nullable<string> = 'posts';
}
