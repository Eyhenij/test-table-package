import { InjectionToken } from '@angular/core';
import { IEntitiesApiService } from '../interfaces';


export const API_SERVICE: InjectionToken<IEntitiesApiService<object, string>> =
    new InjectionToken<IEntitiesApiService<object, string>>('API_SERVICE');
