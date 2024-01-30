import { NgModule } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


@NgModule({
    imports: [CdkVirtualForOf],
    exports: [
        NzInputModule,
        NzCheckboxModule,
        NzPaginationModule,
        NzDatePickerModule,
        NzSpinModule,
        NzIconModule,
        NzButtonModule,
        NzTableModule,
        NzPopconfirmModule,
        NzDropDownModule,
        NzTypographyModule,
        NzToolTipModule,
        NzFormModule,
        NzSelectModule,
        NzInputNumberModule,
        NzDividerModule,
        NzTabsModule,
        NzSwitchModule,
        NzRadioModule,
        NzUploadModule,
        NzGridModule,
        NzSpaceModule,
        NzCollapseModule,
        NzDrawerModule,
        NzStatisticModule,
        NzLayoutModule,
        NzListModule,
        NzModalModule,
        NzAutocompleteModule,
        NzTimePickerModule,
        NzWaveModule,
        NzSkeletonModule,
        NzEmptyModule,

        CdkVirtualForOf,
    ]
})
export class NgZorroModule {}
