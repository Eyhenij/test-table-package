import { Inject, Injectable, Optional, signal, WritableSignal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { BaseAsyncStoreService } from './base-async-store.service';
import {
    GridRequestInterface,
    IBaseAsyncState,
    IEntitiesApiService,
    IEntitiesState,
    IEntitiesStoreService,
    IRequestParam,
    Nullable,
    PageModel,
    PaginationListStateModel,
    SortModel
} from '../util/interfaces';
import { INITIAL_ENTITIES_STATE } from '../util/tokens';
import { BASE_INITIAL_STATE } from '../util/constants';
import { LIST_SORT_ORDER_ENUM } from '../util/enums';


@Injectable()
export abstract class BaseEntitiesStoreService<
    ENTITY_TYPE,
    SORT_PROPERTY_TYPE
> extends BaseAsyncStoreService implements IEntitiesStoreService<ENTITY_TYPE, SORT_PROPERTY_TYPE> {

    // ================================
    // List State Selectors
    // ================================

    public readonly pageModel: WritableSignal<PageModel>;
    public readonly sortModel: WritableSignal<SortModel<SORT_PROPERTY_TYPE>>;
    public readonly searchTerm: WritableSignal<Nullable<string>>;
    public readonly params: WritableSignal<{ [key: string]: IRequestParam }>;

    public readonly pageEntities: WritableSignal<ENTITY_TYPE[]>;

    // ================================
    // Private Fields
    // ================================

    protected readonly apiService: IEntitiesApiService<ENTITY_TYPE, SORT_PROPERTY_TYPE>;

    readonly #entitiesInitialState: IEntitiesState<ENTITY_TYPE, SORT_PROPERTY_TYPE>;

    readonly #loadListSource: Subject<void> = new Subject<void>();
    readonly #fetchListSource: Subject<void> = new Subject<void>();

    protected constructor(
        @Optional()
        @Inject(INITIAL_ENTITIES_STATE)
        protected readonly providedInitialEntitiesState: Partial<IEntitiesState<ENTITY_TYPE, SORT_PROPERTY_TYPE>>
    ) {
        const initialAsyncState: IBaseAsyncState = {
            loading: providedInitialEntitiesState?.loading ?? BASE_INITIAL_STATE.ASYNC.loading,
            fetching: providedInitialEntitiesState?.fetching ?? BASE_INITIAL_STATE.ASYNC.fetching,
            pending: providedInitialEntitiesState?.pending ?? BASE_INITIAL_STATE.ASYNC.pending,

            requestStatus: providedInitialEntitiesState?.requestStatus ?? BASE_INITIAL_STATE.ASYNC.requestStatus,
        };
        super(initialAsyncState);

        this.#entitiesInitialState = {
            ...BASE_INITIAL_STATE.ENTITIES,
            ...providedInitialEntitiesState,

            sortModel: {
                propertyName: providedInitialEntitiesState?.sortModel?.propertyName || null as SORT_PROPERTY_TYPE,
                sortDirection: providedInitialEntitiesState?.sortModel?.sortDirection || LIST_SORT_ORDER_ENUM.DESC
            },
            entities: providedInitialEntitiesState?.entities || [],
        };

        this.pageModel = signal<PageModel>(this.#entitiesInitialState.pageModel);
        this.sortModel = signal<SortModel<SORT_PROPERTY_TYPE>>(this.#entitiesInitialState.sortModel);
        this.searchTerm = signal<Nullable<string>>(this.#entitiesInitialState.searchTerm);
        this.params = signal<{ [key: string]: IRequestParam }>(this.#entitiesInitialState.params);

        this.pageEntities = signal<ENTITY_TYPE[]>(this.#entitiesInitialState.entities);

        this.#loadListSource.pipe(
            tap(() => this.startLoading()),
            switchMap(() => {
                const params: GridRequestInterface<SORT_PROPERTY_TYPE> = this.#getRequestParams();

                return this.apiService.getList(params, {}).pipe(
                    catchError((error: HttpErrorResponse) => this.setLoadingFailure(error))
                );
            }),
            catchError((error: HttpErrorResponse) => this.setLoadingFailure(error)),
            takeUntilDestroyed()
        ).subscribe((res: PaginationListStateModel<ENTITY_TYPE> | ENTITY_TYPE[]) => {
            if (Array.isArray(res)) {
                this.#setEntities(res);
            } else {
                this.#setPageEntities(res);
            }

            this.setLoadingSuccess();
        });

        this.#fetchListSource.pipe(
            tap(() => this.startFetching()),
            switchMap(() => {
                const params: GridRequestInterface<SORT_PROPERTY_TYPE> = this.#getRequestParams();

                return this.apiService.getList(params, {}).pipe(
                    catchError((error: HttpErrorResponse) => this.setFetchingFailure(error))
                );
            }),
            catchError((error: HttpErrorResponse) => this.setFetchingFailure(error)),
            takeUntilDestroyed()
        ).subscribe((res: PaginationListStateModel<ENTITY_TYPE> | ENTITY_TYPE[]) => {
            if (Array.isArray(res)) {
                this.#setEntities(res);
            } else {
                this.#setPageEntities(res);
            }

            this.setFetchingSuccess();
            /**
             * Need to set loading success as well
             * For case, when we set initial value for "loading" field as true
             * e.g. in config module: branches list, etc.
             */
            this.setLoadingSuccess();
        });
    }

    public getInitialEntitiesState(): IEntitiesState<ENTITY_TYPE, SORT_PROPERTY_TYPE> {
        return this.#entitiesInitialState;
    }

    // ================================
    // List State Actions
    // ================================

    public resetListState(defaultParentId?: string): void {
        this.pageModel.set(this.#entitiesInitialState.pageModel);
        this.sortModel.set(this.#entitiesInitialState.sortModel);
        this.searchTerm.set(this.#entitiesInitialState.searchTerm);
        this.params.set(this.#entitiesInitialState.params);
    }

    public resetListStateAndFetch(defaultParentId?: string): void {
        this.resetListState(defaultParentId);
        this.fetchList();
    }

    public resetEntitiesState(): void {
        this.resetListState();
        this.pageEntities.set([]);
    }

    public setPageModel(partialPageModel: Partial<PageModel>): void {
        this.pageModel.set({ ...this.pageModel(), ...partialPageModel });
        this.fetchList();
    }

    public setSortModel(sortModel: SortModel<SORT_PROPERTY_TYPE>): void {
        this.sortModel.set(sortModel);
        this.fetchList();
    }

    public setSearchTerm(searchTerm: Nullable<string>): void {
        this.searchTerm.set(searchTerm);
        this.fetchList();
    }

    public setParams(newParams: { [key: string]: IRequestParam }): void {
        this.params.update((prevParams: { [key: string]: IRequestParam }) => {
            const result: { [key: string]: IRequestParam } = { ...prevParams };

            Object.keys(newParams).forEach((key: string) => {
                if (
                    Object.prototype.hasOwnProperty.call(prevParams, key) &&
                    Object.prototype.hasOwnProperty.call(newParams, key)
                ) {
                    result[key] = newParams[key];
                } else if (Object.prototype.hasOwnProperty.call(newParams, key)) {
                    result[key] = newParams[key];
                }
            });

            return result;
        });

        this.fetchList();
    }

    // ================================
    // Entities State Actions
    // ================================

    public loadList(): void {
        this.#loadListSource.next();
    }

    public fetchList(): void {
        this.#fetchListSource.next();
    }

    // ================================
    // Private Actions
    // ================================

    #setPageEntities(data: PaginationListStateModel<ENTITY_TYPE>, addToList?: boolean): void {
        this.pageModel.set({ ...this.pageModel(), totalCount: data.totalCount });
        this.pageEntities.set(addToList ? [...this.pageEntities(), ...data.data] : data.data);
    }

    /** For responses without pagination */
    #setEntities(data: ENTITY_TYPE[], addToList?: boolean): void {
        this.pageEntities.set(addToList ? [...this.pageEntities(), ...data] : data);
    }

    #getRequestParams(): GridRequestInterface<SORT_PROPERTY_TYPE> {
        let params: GridRequestInterface<SORT_PROPERTY_TYPE> = {
            page: this.pageModel().pageNumber,
            limit: this.pageModel().pageSize,
        };

        Object.keys(this.params()).forEach((key: string) => {
            if (Object.prototype.hasOwnProperty.call(this.params(), key) && key !== 'order') {
                params[key] = this.params()[key];
            }
        });

        if (this.sortModel().propertyName) {
            params = {
                ...params,

                ['order.by']: this.sortModel().propertyName,
                ['order.type']: this.sortModel().sortDirection,
            };
        }

        return params;
    }
}
