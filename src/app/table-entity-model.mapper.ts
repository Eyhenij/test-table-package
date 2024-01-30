import { IMapper } from '../../projects/table/src/lib/util/interfaces';


export class TableEntityModelMapper implements IMapper<Record<string, any>, Record<string, any>>{

    public mapFrom(raw: Record<string, any>): Record<string, any> {
        return {
            id: raw?.id ?? null,
            title: raw?.title ?? null,
            views: raw?.views ?? null,
        };
    }
}
