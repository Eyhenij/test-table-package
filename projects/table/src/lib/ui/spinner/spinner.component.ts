import { Component, Input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types/size';


@Component({
    standalone: true,
    selector: 'bo-spinner',
    template: `
        <div class="spin-wrapper">
            <nz-spin nzSimple [nzSize]="size"></nz-spin>
        </div>`,
    styles: [`
        :host {
            z-index: var(--z-index-spinner);
            position: absolute;

            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            background-color: rgba(0, 0, 0, 0.3);
        }
    `],
    imports: [
        NzSpinModule
    ]
})
export class SpinnerComponent {
    @Input() public size: NzSizeLDSType = 'large';
}
