import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { CurrencyPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { CommonPlaceholderComponent } from '../placeholder/common-placeholder.component';
import { ColumnPropertiesInterface } from '../../util/interfaces';


@Component({
    standalone: true,
    selector: 'bo-common-table',
    templateUrl: './common-table.component.html',
    styleUrls: ['./common-table.component.scss'],
    imports: [
        NgZorroModule,
        CurrencyPipe,
        NgTemplateOutlet,
        NgComponentOutlet,
        CommonPlaceholderComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent<T, R> {
    @Input() public entities: T[] = [];
    @Input() public columns: Readonly<Array<ColumnPropertiesInterface>>;
    @Input({ transform: booleanAttribute }) public isSmallPlaceholderShown: boolean;

    @Output() public readonly sortChange: EventEmitter<{
        sortDirection: string;
        propertyName: R;
    }> = new EventEmitter<{ sortDirection: string; propertyName: R; }>();
    @Output() public readonly rowClick: EventEmitter<T> = new EventEmitter<T>();

    public onSortChange(sortDirection: string, propertyName: R): void {
        if (this.entities.length && sortDirection) {
            this.sortChange.emit({ sortDirection, propertyName });
        }
    }

    public onRowClick(data: T): void {
        this.rowClick.emit(data);
    }
}
