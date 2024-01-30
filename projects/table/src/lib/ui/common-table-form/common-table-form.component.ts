import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    ValidationErrors
} from '@angular/forms';

import { debounceTime, filter } from 'rxjs';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { BaseDirectiveFormData, Nullable, BaseDirectiveFormModel } from '../../util/interfaces';


@Component({
    standalone: true,
    selector: 'bo-common-table-form',
    templateUrl: './common-table-form.component.html',
    styleUrls: ['./common-table-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgZorroModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CommonTableFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CommonTableFormComponent,
            multi: true
        }
    ]
})
export class CommonTableFormComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() public title: string;
    @Input({ transform: booleanAttribute }) public isSearchShown: boolean = true;
    @Input({ transform: booleanAttribute }) public isSearchInputDisabled: boolean;
    @Input({ transform: booleanAttribute }) public emptyFilters: boolean;
    @Input({ transform: booleanAttribute }) public isMobile: Nullable<boolean>;

    @Output() public readonly resetFilters: EventEmitter<void> = new EventEmitter<void>();

    public form: FormGroup<BaseDirectiveFormModel>;

    #onChanged: (value: Partial<BaseDirectiveFormData>) => void;
    #onTouched: () => void;

    readonly #destroyRef: DestroyRef = inject(DestroyRef);
    readonly #fb: FormBuilder = inject(FormBuilder);

    public ngOnInit(): void {
        this.form = this.#fb.nonNullable.group<BaseDirectiveFormModel>({
            search: this.#fb.control<Nullable<string>>(null)
        });

        this.form.controls.search.valueChanges.pipe(
            filter(() => !!this.#onChanged),
            debounceTime(500),
            takeUntilDestroyed(this.#destroyRef)
        ).subscribe((search: Nullable<string>) => {
            this.#onChanged({ search });
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.isSearchInputDisabled && this.form?.controls?.search) {
            if (this.isSearchInputDisabled) {
                this.form.controls.search.disable({ emitEvent: false });
            } else {
                this.form.controls.search.enable({ emitEvent: false });
            }
        }
    }

    // ––––––––––––– Value Accessor –––––––––––––––

    public writeValue(value: Partial<BaseDirectiveFormData>): void {
        if (value) {
            this.form.patchValue(value, { emitEvent: false });
        }
    }

    public registerOnChange(fn: (value: Partial<BaseDirectiveFormData>) => void): void {
        this.#onChanged = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.#onTouched = fn;
    }

    public validate(): Nullable<ValidationErrors> {
        return this.form.valid ? null : { formInvalid: true };
    }

    // ––––––––––––– Actions –––––––––––––––

    public onClearSearch(): void {
        this.#onChanged({ search: null });
        this.form.controls.search.reset(null, { emitEvent: false });
    }

    public onResetFilters(): void {
        this.resetFilters.emit();
    }
}
