import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_URL } from '../util/tokens';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    readonly #apiUrl: string = inject(API_URL);
    readonly #http: HttpClient = inject(HttpClient);

    public get<R, T extends {} = {}>(url: string, params: T | HttpParams = new HttpParams()): Observable<R> {
        if (!(params instanceof HttpParams)) {
            params = new HttpParams({ fromObject: params });
        }
        return this.#http.get<R>(`${this.#apiUrl}/${url}`, {
            headers: this.#headers(),
            params
        });
    }

    public post<R, T extends {}>(
        url: string,
        data: T,
        params: T | HttpParams = new HttpParams(),
        headers: HttpHeaders = this.#headers()
    ): Observable<R> {
        if (!(params instanceof HttpParams)) {
            params = new HttpParams({ fromObject: params });
        }

        const isFormData: boolean = data instanceof FormData;

        return this.#http.post<R>(`${this.#apiUrl}/${url}`, isFormData ? data : JSON.stringify(data), {
            headers: isFormData ? undefined : headers,
            params
        });
    }

    #headers(): HttpHeaders {
        const headersConfig: { [name: string]: string | string[] } = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        return new HttpHeaders(headersConfig);
    }
}
