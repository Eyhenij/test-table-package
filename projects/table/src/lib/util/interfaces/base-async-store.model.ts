import { Signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ModelStatus } from '../enums';


export interface IBaseAsyncState {
    loading: boolean;
    fetching: boolean;
    pending: boolean;
    requestStatus: ModelStatus;
}

export interface ISetPropertiesConfig {
    showNotification?: boolean;
}

export interface IBaseAsyncStoreService {
    /** @description Indicates status of the first request for getting list of Entities */
    loading: Signal<boolean>;
    /** @description Indicates status of the following requests for getting list of Entities */
    fetching: Signal<boolean>;
    /** @description Indicates status of all the requests for getting list of Entities */
    pending: Signal<boolean>;

    /** @description Indicates failure status of the last request for getting list of Entities */
    requestStatus: Signal<ModelStatus>;

    handleError(error: HttpErrorResponse, message: string): void;
    /**
     * @description Resets the next props to initial values:
     * - loading,
     * - fetching,
     * - upsertStatus,
     * - deleteStatus,
     * - requestStatus
     * - detailsStatus
     */
    resetAsyncState(): void;

    startLoading(): void;
    setLoadingSuccess(): void;
    setLoadingFailure(error: HttpErrorResponse, config: ISetPropertiesConfig): Observable<never>;
    setLoadingFailureVoid(error: HttpErrorResponse, config: ISetPropertiesConfig): void;

    startFetching(): void;
    setFetchingSuccess(): void;
    setFetchingFailure(error: HttpErrorResponse, config: ISetPropertiesConfig): Observable<never>;
    setFetchingFailureVoid(error: HttpErrorResponse, config: ISetPropertiesConfig): void;
}
