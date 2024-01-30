export interface ITableConfig {
    autoLoading: boolean;
    id: string;
    props: Record<string, string | number | boolean>

    messageNotFound?: string;
    messagePending?: string;
    header?: string;
}
