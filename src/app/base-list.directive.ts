import {
    computed,
    DestroyRef,
    Directive,
    effect,
    EventEmitter,
    inject,
    Injector,
    OnInit,
    Output,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';

import { filter, map } from 'rxjs/operators';
import {
    BaseDirectiveFormData,
    ClickByRowEventInterface,
    ColumnPropertiesInterface,
    EmptyEventInterface,
    ErrorEventInterface,
    IEntitiesStoreService,
    ITableConfig,
    Nullable,
    PageModel,
    SortModel,
    UpdatedEventInterface
} from './util/interfaces';
import { LIST_SORT_ORDER_ENUM, ModelStatus } from './util/enums';


@Directive({
    standalone: true
})
export abstract class BaseListDirective<ENTITY_TYPE, SORT_PROPERTY_TYPE> implements OnInit {
    @Output() public readonly onClickByRowEvent: EventEmitter<ClickByRowEventInterface> =
        new EventEmitter<ClickByRowEventInterface>();

    @Output() public readonly onEmptyEvent: EventEmitter<EmptyEventInterface> =
        new EventEmitter<EmptyEventInterface>();

    @Output() public readonly onUpdatedEvent: EventEmitter<UpdatedEventInterface<ENTITY_TYPE[]>> =
        new EventEmitter<UpdatedEventInterface<ENTITY_TYPE[]>>();

    @Output() public readonly onErrorEvent: EventEmitter<ErrorEventInterface> =
        new EventEmitter<ErrorEventInterface>();

    /**
     * @description
     * Page model from chosen state
     * @public
     */
    public pageModel: Signal<PageModel>;
    /**
     * @description
     * Sort model from chosen state
     * @public
     */
    public sortModel: Signal<SortModel<SORT_PROPERTY_TYPE>>;

    public columns: Array<ColumnPropertiesInterface>;

    public emptyFilters: Signal<boolean>;

    /**
     * @description
     * Page header title
     * @public
     */
    public readonly title: WritableSignal<string> = signal('Table Title');

    /**
     * @description
     * Form control for search and data-range filters
     * @public
     */
    public control: FormControl<BaseDirectiveFormData>;

    /**
     * @description
     * Loading selector from chosen state
     * @public
     */
    public loading: Signal<boolean>;
    /**
     * @description
     * Fetching selector from chosen state
     * @public
     */
    public fetching: Signal<boolean>;
    /**
     * @description
     * Combination of loading$ and fetching$ selectors from chosen state
     * @public
     */
    public pending: Signal<boolean>;

    /**
     * @description
     * Array of entities on the page, selected from chosen state
     * @public
     */
    public entities: Signal<ENTITY_TYPE[]>;

    protected readonly fb: FormBuilder;
    protected readonly store: IEntitiesStoreService<ENTITY_TYPE, SORT_PROPERTY_TYPE>;
    protected readonly config: ITableConfig;

    protected readonly injector: Injector = inject(Injector);
    protected readonly destroyRef: DestroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        this.control = this.fb.nonNullable.control<BaseDirectiveFormData>({
            search: null
        });

        this.loading = this.store.loading;
        this.fetching = this.store.fetching;
        this.pending = this.store.pending;

        this.pageModel = this.store.pageModel;
        this.sortModel = this.store.sortModel;
        this.entities = this.store.pageEntities;

        this.emptyFilters = computed<boolean>(() => !this.store.searchTerm() && !this.pending());

        this.control.valueChanges.pipe(
            map((value: Partial<BaseDirectiveFormData>) => value?.search),
            filter((value: Nullable<string>) => typeof value !== 'undefined'),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((value: Nullable<string>): void => {
            this.onSearchChange(value);
        });

        effect(() => {
            if (this.store.requestStatus() === ModelStatus.Error) {
                this.onEmptyEvent.emit({ id: this.config.id });
            }

            if (this.store.requestStatus() === ModelStatus.Success && this.entities().length){
                this.onUpdatedEvent.emit({ id: this.config.id, data: this.entities() });
            }

            if (this.store.requestStatus() === ModelStatus.Success && !this.entities().length){
                this.onEmptyEvent.emit({ id: this.config.id });
            }

        }, { injector: this.injector, allowSignalWrites: true });
    }

    /**
     * @description
     * Invokes "setPageModel" method for chosen list state.
     * @param {Partial<PageModel>} pageModel
     * @returns {void}
     * @public
     */
    public onPageModelChange(pageModel: Partial<PageModel>): void {
        this.store.setPageModel(pageModel);
    }

    /**
     * @description
     * Invokes "setSortModel" method for chosen list state.
     * @param {sortDirection: string; propertyName: R;} sortModel
     * @returns {void}
     * @public
     */
    public onSortChange(sortModel: { sortDirection: string; propertyName: SORT_PROPERTY_TYPE; }): void {
        this.store.setSortModel({
            sortDirection: sortModel.sortDirection === 'ascend' ? LIST_SORT_ORDER_ENUM.ASC : LIST_SORT_ORDER_ENUM.DESC,
            propertyName: sortModel.propertyName
        });
    }

    /**
     * @description
     * Invokes "setSearchTerm" method for chosen list state.
     * @param {string} searchValue
     * @returns {void}
     * @public
     */
    public onSearchChange(searchValue: Nullable<string>): void {
        this.store.setSearchTerm(searchValue);
    }

    /**
     * @description
     * Reset all filters for current list and fetch the list data.
     * @returns {void}
     * @public
     */
    public resetFilters(): void {
        this.store.resetListStateAndFetch();
    }

    public setTitle(title: Nullable<string>): void {
        this.title.set(title ?? 'Table Title');
    }

    public onRowClick(data: any): void {
        this.onClickByRowEvent.emit({ id: this.config.id, data });
    }
}
