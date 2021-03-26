import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as currencyActions from '../actions/convert.actions';
import { ConvertService } from 'src/app/convert/services/convert.service';
import { ICurrency } from 'src/app/convert/interfaces/currency.interface';


@Injectable()
export class ConvertEffects {
    constructor(
        private readonly convertService: ConvertService,
        private readonly actions$: Actions,
    ) {}

    getCurrenciesList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currencyActions.getCurrenciesList),
            exhaustMap(action =>
                this.convertService.getCurrencies().pipe(
                    map(currencies => {
                        const transformCurrencies: ICurrency[] = [];
                        for (let k in currencies) {
                            transformCurrencies.push({ id: k, value: currencies[k] });
                        }
                        return currencyActions.getCurrenciesListSuccess({ currencies: transformCurrencies })
                    }),
                    catchError(error => of(currencyActions.getCurrenciesListFailed({ error })))
                )
            )
        )
    );
}