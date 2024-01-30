import { InjectionToken } from '@angular/core';
import { IEntitiesApiFacade } from '../interfaces';


export const API_FACADE: InjectionToken<IEntitiesApiFacade<object, string>> =
    new InjectionToken<IEntitiesApiFacade<object, string>>('API_FACADE');
