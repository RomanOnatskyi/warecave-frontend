import { BaseResponse } from './responses/base-response';
import { Observable, of } from 'rxjs';

export function HandleError<T extends BaseResponse>(operation = 'Operation') {

    return (error: any): Observable<T> => {

        const result = {} as T;
        result.errors = `${operation} failed: ${error.message}`;

        return of(result);
    };
}
