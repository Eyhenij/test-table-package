import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonPlaceholderComponent } from '../placeholder/common-placeholder.component';
import { ColumnPropertiesInterface, Nullable, PageModel } from '../../util/interfaces';
import { CommonTableComponent } from '../common-table/common-table.component';


@Component({
    standalone: true,
    selector: 'bo-common-table-container',
    templateUrl: './common-table-container.component.html',
    styleUrls: ['./common-table-container.component.scss'],
    imports: [
        NgZorroModule,

        SpinnerComponent,
        PaginationComponent,
        CommonPlaceholderComponent,
        PaginationComponent,
        CommonTableComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableContainerComponent<T, R> {
    @Input() public title: Nullable<string>;
    @Input() public pageModel: Nullable<PageModel>;
    @Input() public placeholderButtonIconType: string = 'plus';
    @Input() public entities: T[] = [];
    @Input() public columns: Readonly<Array<ColumnPropertiesInterface>>;
    @Input({ transform: booleanAttribute }) public isSmallPlaceholderShown: boolean;
    @Input({ transform: booleanAttribute }) public isMobile: Nullable<boolean>;
    @Input({ transform: booleanAttribute }) public isLoading: boolean;
    @Input({ transform: booleanAttribute }) public isPlaceholderShown: boolean;
    @Input({ transform: booleanAttribute }) public isPaginationShown: boolean = true;
    @Input({ transform: booleanAttribute }) public isPageSizeSelectShown: boolean = true;
    @Input({ transform: booleanAttribute }) public isPlaceholderButtonShown: boolean = false;

    @Output() public readonly pageModelChange: EventEmitter<Partial<PageModel>> = new EventEmitter<Partial<PageModel>>();
    @Output() public readonly sortChange: EventEmitter<{
        sortDirection: string;
        propertyName: R;
    }> = new EventEmitter<{ sortDirection: string; propertyName: R; }>();
    @Output() public readonly rowClick: EventEmitter<T> = new EventEmitter<T>();

    public onPageModelChange(pageModel: Partial<PageModel>): void {
        this.pageModelChange.emit(pageModel);
    }

    public onSortChange(sortModel: { sortDirection: string; propertyName: R; }): void {
        this.sortChange.emit(sortModel);
    }

    public onRowClick(data: T): void {
        this.rowClick.emit(data);
    }
}
