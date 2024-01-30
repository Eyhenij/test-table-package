import { ListSortOrderType } from '../enums';

export interface GridRequestInterface<SORT_PROPERTY_TYPE> {
    /**
     * Page number
     */
    page: number;

    /**
     * Sample size
     */
    limit: number;

    /**
     * Sorting data
     */
    order?: {
        by: SORT_PROPERTY_TYPE; // The name of the property by which we sort the data. One of those that we receive in the response from the server.
        type: ListSortOrderType;
    };

    filters?: string[];
    search?: string;
    dateFrom?: string;
    dateTo?: string;
}
