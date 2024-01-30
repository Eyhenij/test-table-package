import { PaginationListApiModel, PaginationListStateModel } from '../util/interfaces';


export function convertPaginationApiModelToStateModel<A, S>(
    itemConverter: (item: A) => S,
    api: PaginationListApiModel<A>
): PaginationListStateModel<S> {
    return {
        data: Boolean(api?.data) && Array.isArray(api.data) ? api.data.map((item: A) => itemConverter(item)) : [],
        totalCount: api.allCounts ?? api?.data?.length,
    };
}
