import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_FACADE, API_SERVICE, API_URL, INITIAL_ENTITIES_STATE, STORE_SERVICE, TABLE_CONFIG } from './util/tokens';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { DEFAULT_PAGE_MODEL } from './util/constants';
import { TableEntitiesStoreService } from './data-access/table-entities-store.service';
import { TableApiFacade } from './api/table-api-facade';
import { TableApiService } from './api/table-api-service';


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideAnimations(),
        provideRouter(routes),
        {
            provide: NZ_I18N,
            useValue: en_US
        },
        {
            provide: API_URL,
            useValue: 'http://localhost:3000'
        },
        {
            provide: TABLE_CONFIG,
            useValue: {
                autoLoading: true,
                id: 'someUniqueTableId',
                props: {
                    test: true
                }
            }
        },
        {
            provide: INITIAL_ENTITIES_STATE,
            useValue: {
                pageModel: DEFAULT_PAGE_MODEL,
                loading: true
            }
        },
        {
            provide: API_FACADE,
            useClass: TableApiFacade
        },
        {
            provide: API_SERVICE,
            useClass: TableApiService
        },
        {
            provide: STORE_SERVICE,
            useClass: TableEntitiesStoreService
        },
    ]
};
