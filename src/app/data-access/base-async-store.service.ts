import { computed, Injectable, Optional, signal, Signal, WritableSignal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { ModelStatus } from '../util/enums';
import { IBaseAsyncState, IBaseAsyncStoreService } from '../util/interfaces';
import { BASE_INITIAL_STATE } from '../util/constants';


@Injectable()
export abstract class BaseAsyncStoreService implements IBaseAsyncStoreService {

    public readonly loading: Signal<boolean>;
    public readonly fetching: Signal<boolean>;
    public readonly pending: Signal<boolean>;
    public readonly requestStatus: Signal<ModelStatus>;

    readonly #loading: WritableSignal<boolean>;
    readonly #fetching: WritableSignal<boolean>;
    readonly #requestStatus: WritableSignal<ModelStatus>;

    #initialAsyncState: IBaseAsyncState;

    protected constructor(@Optional() protected readonly initialAsyncState: Partial<IBaseAsyncState> = {}) {
        this.#initialAsyncState = {
            ...BASE_INITIAL_STATE.ASYNC,
            ...initialAsyncState
        };

        this.#loading = signal<boolean>(this.#initialAsyncState.loading);
        this.loading = this.#loading.asReadonly();

        this.#fetching = signal<boolean>(this.#initialAsyncState.fetching);
		this.fetching = this.#fetching.asReadonly();

		this.pending = computed<boolean>(() => this.loading() || this.fetching());

        this.#requestStatus = signal<ModelStatus>(this.#initialAsyncState.requestStatus);
        this.requestStatus = this.#requestStatus.asReadonly();
    }

	// ================================
	// region Actions
	// ================================

	public handleError(error: HttpErrorResponse, message: string): void {
		// eslint-disable-next-line no-console
		console.error(error);
	}

    public resetAsyncState(): void {
        this.#loading.set(this.#initialAsyncState.loading);
        this.#fetching.set(this.#initialAsyncState.fetching);
        this.#requestStatus.set(this.#initialAsyncState.requestStatus);
    }
    // endregion

    // ================================
    // region Load Actions
    // ================================

	public startLoading(): void {
		this.#loading.set(true);
		this.#requestStatus.set(ModelStatus.Pending);
	}
	public setLoadingSuccess(): void {
		this.#loading.set(false);
		this.#requestStatus.set(ModelStatus.Success);
	}
	public setLoadingFailure(error: HttpErrorResponse): Observable<never> {
		this.#loading.set(false);
		this.#requestStatus.set(ModelStatus.Error);
        return throwError(() => error);
	}
    public setLoadingFailureVoid(): void {
        this.#loading.set(false);
        this.#requestStatus.set(ModelStatus.Error);
    }
    // endregion

    // ================================
    // region Fetch Actions
    // ================================

	public startFetching(): void {
		this.#fetching.set(true);
		this.#requestStatus.set(ModelStatus.Pending);
	}
	public setFetchingSuccess(): void {
		this.#fetching.set(false);
		this.#requestStatus.set(ModelStatus.Success);
	}
	public setFetchingFailure(error: HttpErrorResponse): Observable<never> {
		this.#fetching.set(false);
		this.#loading.set(false);
		this.#requestStatus.set(ModelStatus.Error);
        return throwError(() => error);
	}
    public setFetchingFailureVoid(): void {
        this.#fetching.set(false);
        this.#loading.set(false);
        this.#requestStatus.set(ModelStatus.Error);
    }
    // endregion
}
