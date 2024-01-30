import { Injectable } from '@angular/core';

import { BaseApiFacade } from './base-api-facade';
import { Nullable } from '../util/interfaces';


@Injectable()
export class TableApiFacade extends BaseApiFacade<object, string> {
    protected override readonly getListUrl: Nullable<string> = 'company-branch';
}
