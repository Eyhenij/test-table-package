import { ListSortOrderType } from '../enums';

export interface ListState<T> {
    pageModel: PageModel;
    sortModel: SortModel<T>;
    searchTerm: string;
}

export interface SortModel<T> {
    propertyName: T;
    sortDirection: ListSortOrderType;
}

export interface PageModel {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}
