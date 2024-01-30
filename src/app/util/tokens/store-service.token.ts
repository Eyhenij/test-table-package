import { InjectionToken } from '@angular/core';
import { IEntitiesStoreService } from '../interfaces';


export const STORE_SERVICE: InjectionToken<IEntitiesStoreService<object, string>> =
    new InjectionToken<IEntitiesStoreService<object, string>>('STORE_SERVICE');
