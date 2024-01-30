import { booleanAttribute, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { debounceTime, map, pairwise, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { Nullable, PageModel } from '../../util/interfaces';
import { PAGE_SIZE_OPTIONS } from '../../util/constants';


@Component({
    standalone: true,
    selector: 'bo-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss'],
    imports: [
        NgIf,
        NgForOf,
        NgSwitch,
        NgSwitchCase,

        NgZorroModule,
        FormsModule
    ]
})
export class PaginationComponent implements OnInit {
    @Input() public pageModel: PageModel;
    @Input({ transform: booleanAttribute }) public disabledNext: boolean;
    @Input({ transform: booleanAttribute }) public mobilePagination: Nullable<boolean>;
    @Input({ transform: booleanAttribute }) public isPageSizeSelectShown: boolean = true;

    @Output() public readonly pageModelChange: EventEmitter<Partial<PageModel>> = new EventEmitter<Partial<PageModel>>();

    public currentPage: number = 1;
    public readonly pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

    readonly #destroyRef: DestroyRef = inject(DestroyRef);
    readonly #pageModelSource: Subject<Partial<PageModel>> = new Subject<Partial<PageModel>>();

    public ngOnInit(): void {
        this.currentPage = this.pageModel.pageNumber;

        this.#pageModelSource.pipe(
            startWith({}),
            pairwise(),
            map(([previous, current]:  [Partial<PageModel>, Partial<PageModel>]) => ({ ...previous, ...current })),
            debounceTime(100),
            takeUntilDestroyed(this.#destroyRef)
        ).subscribe((value: Partial<PageModel>) => {
            this.pageModelChange.emit(value);
        });
    }

    public onPageNumberChange(pageNumber: number): void {
        this.#pageModelSource.next({ pageNumber });
    }

    public onPageSizeChange(pageSize: number): void {
        this.#pageModelSource.next({ pageSize });
    }

    public onPageSizeChangeSimplePagination(pageSize: number): void {
        this.currentPage = 1;
        this.#pageModelSource.next({ pageSize, pageNumber: 1 });
    }

    public onPreviousPageNumber(): void {
        this.currentPage--;
        this.onPageNumberChange(this.currentPage);
    }

    public onNextPageNumber(): void {
        this.currentPage++;
        this.onPageNumberChange(this.currentPage);
    }
}
