import { Signal, WritableSignal } from '@angular/core';
import { IBaseAsyncState, IBaseAsyncStoreService } from './base-async-store.model';
import { Nullable } from './nullable.type';
import { PageModel, SortModel } from './lists.interface';
import { IRequestParam } from './request-params.interface';


export interface IEntitiesState<ENTITY_TYPE, SORT_PROPERTY_TYPE> extends IBaseAsyncState {
    pageModel: PageModel;
    sortModel: SortModel<SORT_PROPERTY_TYPE>;
    searchTerm: Nullable<string>;
    params: { [key: string]: IRequestParam };

    entities: ENTITY_TYPE[];
}

export interface IEntitiesStoreProps<SORT_PROPERTY_TYPE> {
    pageModel?: Partial<PageModel>;
    sortModel?: SortModel<SORT_PROPERTY_TYPE>;
    searchTerm?: Nullable<string>;
}

export interface IEntitiesStoreService<ENTITY_TYPE, SORT_PROPERTY_TYPE> extends IBaseAsyncStoreService {

    // ================================
    // List State Selectors
    // ================================

    pageModel: WritableSignal<PageModel>;
    sortModel: WritableSignal<SortModel<SORT_PROPERTY_TYPE>>;
    searchTerm: WritableSignal<Nullable<string>>
    params: WritableSignal<{ [key: string]: IRequestParam }>;

    // ================================
    // Entities State Selectors
    // ================================

    pageEntities: WritableSignal<ENTITY_TYPE[]>;

	/**
	 * @description Resets the next props to initial values:
	 *  - pageModel,
	 *  - sortModel,
	 *  - filterModel,
	 *  - searchTerm,
	 */
	resetListState(defaultParentId?: string): void;
    resetListStateAndFetch(defaultParentId?: string): void;
	resetEntitiesState(): void;

    getInitialEntitiesState(): IEntitiesState<ENTITY_TYPE, SORT_PROPERTY_TYPE>;

    setPageModel(partialPageModel: Partial<PageModel>): void;
    setSortModel(sortModel: SortModel<SORT_PROPERTY_TYPE>): void;
    setSearchTerm(searchTerm: Nullable<string>): void;
    setParams(params: { [key: string]: IRequestParam }): void;

    // ================================
    // Entities State Actions
    // ================================

    loadList(): void;
    fetchList(): void;
}
