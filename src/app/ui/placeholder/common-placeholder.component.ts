import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { NgIf } from '@angular/common';


@Component({
    standalone: true,
    selector: 'bo-common-placeholder',
    templateUrl: './common-placeholder.component.html',
    styleUrls: ['./common-placeholder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgZorroModule,
        NgIf
    ],
})
export class CommonPlaceholderComponent {
    @Input() public title: string = '';
    @Input() public buttonTitle: string = 'Create';
    @Input({ transform: booleanAttribute }) public isButtonShown: boolean;

    @Output() public readonly placeholderButtonClick: EventEmitter<void> = new EventEmitter<void>();

    public onPlaceholderButtonClick(): void {
        this.placeholderButtonClick.emit();
    }
}
