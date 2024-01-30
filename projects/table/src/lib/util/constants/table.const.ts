import { LIST_SORT_ORDER_ENUM } from '../enums';
import { ColumnPropertiesInterface, SortModel } from '../interfaces';


/**
 * Constants provide a structured and organized way to manage various aspects of the table entities,
 * such as sorting, input fields, and table columns.
 * By centralizing these constants, you can easily make consistent changes and updates
 * across the project related to the table entities.
 */
export namespace TABLE_CONST {
    export const DEFAULT_LIST_SORT_MODEL: Readonly<SortModel<string>> = Object.freeze({
        propertyName: '',
        sortDirection: LIST_SORT_ORDER_ENUM.DESC
    });

    export const TABLE_COLUMNS: Readonly<Array<ColumnPropertiesInterface<any>>> = Object.freeze([
        {
            display: true,
            order: 1,
            header: 'title',
            propName: 'title',
            sorting: true,
            component: null,
        },
        {
            display: true,
            order: 2,
            header: 'id',
            propName: 'id',
            sorting: true,
            component: null,
        },
        {
            display: true,
            order: 3,
            header: 'views',
            propName: 'views',
            sorting: true,
            component: null,
        },

        // {
        //     display: true,
        //     order: 4,
        //     header: 'created',
        //     propName: 'createdAt',
        //     sorting: false,
        //     component: null,
        // },
        // {
        //     display: true,
        //     order: 5,
        //     header: 'updated',
        //     propName: 'updatedAt',
        //     sorting: false,
        //     component: null,
        // },
    ]);
}
