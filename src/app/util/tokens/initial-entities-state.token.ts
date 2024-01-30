import { InjectionToken } from '@angular/core';
import { IEntitiesState } from '../interfaces';


export const INITIAL_ENTITIES_STATE: InjectionToken<IEntitiesState<any, any>> =
    new InjectionToken<IEntitiesState<any, any>>('INITIAL_ENTITIES_STATE');
