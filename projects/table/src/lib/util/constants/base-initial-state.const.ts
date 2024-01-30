import { IBaseAsyncState, IEntitiesState } from '../interfaces';
import { LIST_SORT_ORDER_ENUM, ModelStatus } from '../enums';
import { DEFAULT_PAGE_MODEL } from './pagination.const';


export namespace BASE_INITIAL_STATE {
	export const ASYNC: Readonly<IBaseAsyncState> = Object.freeze({
		loading: false,
		fetching: false,
		pending: false,
		requestStatus: ModelStatus.Init,
	});

	export const ENTITIES: Readonly<IEntitiesState<unknown, unknown>> = Object.freeze({
		...ASYNC,

		sortModel: {
			sortDirection: LIST_SORT_ORDER_ENUM.DESC,
			propertyName: null
		},
		pageModel: DEFAULT_PAGE_MODEL,
		searchTerm: null,
        params: {},

		entities: [],
	});
}
