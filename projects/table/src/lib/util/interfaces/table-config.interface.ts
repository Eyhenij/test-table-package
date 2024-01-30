import { ColumnPropertiesInterface } from './table-column.interface';

export interface ITableConfig {
    autoLoading: boolean;
    id: string;
    props: Record<string, string | number | boolean>;
    columns: Array<ColumnPropertiesInterface<any>>;

    messageNotFound?: string;
    messagePending?: string;
    header?: string;
}
