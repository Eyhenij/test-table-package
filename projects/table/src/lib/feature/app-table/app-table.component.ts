import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

import { BaseListDirective } from './base-list.directive';

import { CommonTableComponent } from '../../ui/common-table/common-table.component';
import { CommonTableFormComponent } from '../../ui/common-table-form/common-table-form.component';
import { CommonTableContainerComponent } from '../../ui/common-table-container/common-table-container.component';
import { IEntitiesStoreService, ITableConfig, STORE_SERVICE, TABLE_CONFIG, } from '../../util';


@Component({
    standalone: true,
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: ['./app-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgZorroModule,
        NgComponentOutlet,
        CommonTableComponent,
        CommonTableFormComponent,
        ReactiveFormsModule,
        CommonTableContainerComponent,
    ],
    providers: []
})
export class AppTableComponent extends BaseListDirective<any, any> implements OnInit {
    override readonly fb: FormBuilder = inject(FormBuilder);
    override readonly store: IEntitiesStoreService<object, string> = inject(STORE_SERVICE);

    override readonly config: ITableConfig = {
        autoLoading: true,
        id: Math.floor((Math.random() * 1000) + 1),
        props: {},

        ...inject(TABLE_CONFIG)
    };

    public override ngOnInit(): void {
        super.ngOnInit();

        this.columns = this.config.columns;

        if (this.config.props) {
            this.store.setParams(this.config.props);
        }

        if (this.config.autoLoading && !this.store.pageEntities().length) {
            this.getData();
        }

        if (this.config.header) {
            this.setTitle(this.config.header);
        }
    }

    public getData(): void {
        this.store.loadList();
    }
}
