import { InjectionToken } from '@angular/core';
import { ITableConfig } from '../interfaces/table-config.interface';


export const TABLE_CONFIG: InjectionToken<ITableConfig> = new InjectionToken<ITableConfig>('TABLE_CONFIG');
