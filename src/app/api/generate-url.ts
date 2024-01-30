import { GridRequestInterface, Nullable } from '../util/interfaces';


export function stringifyHttpParams<T extends {}>(params: Nullable<T>): string {
    if (!params) {
        return '';
    }

    const url: string = Object.keys(params).reduce((acc: string, key: string) => {
        const value: string = (params as any)[key] !== null && (params as any)[key] !== undefined
            ? `${key}=${(params as any)[key]}`
            : '';

        return value
            ? acc + `${acc.length ? '&' : ''}${value}`
            : acc;
    }, '');

    return url.length ? `?${url}` : '';
}

export function generateGetListUrl<T>(data: GridRequestInterface<T>): string {
    return stringifyHttpParams<GridRequestInterface<T>>(data);
}
