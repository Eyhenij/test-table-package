import { PageModel } from '../interfaces';


export const DEFAULT_PAGE_SIZE: number = 5;

export const DEFAULT_PAGE_MODEL: Readonly<PageModel> = Object.freeze({
    pageNumber: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
});
