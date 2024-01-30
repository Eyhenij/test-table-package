import { FormControl } from '@angular/forms';
import { Nullable } from './nullable.type';


export interface BaseDirectiveFormModel {
    search: FormControl<Nullable<string>>;
}

export interface BaseDirectiveFormData {
    search: Nullable<string>;
}
