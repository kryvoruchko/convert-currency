import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EConvertActions, GetCurrenciesList, GetCurrenciesListSuccess } from '../actions/convert.actions';
import { ConvertService } from 'src/app/convert/services/convert.service';
import { ICurrency } from 'src/app/convert/interfaces/currency.interface';


@Injectable()
export class ConvertEffects {
    @Effect()
    getCurrenciesList$ = this.actions$.pipe(
        ofType<GetCurrenciesList>(EConvertActions.GetCurrenciesList),
        switchMap(() => this.convertService.getCurrencies()),
        switchMap((currencies: any) => {
            const transformCurrencies: ICurrency[] = [];
            for (let k in currencies) {
                transformCurrencies.push({ id: k, value: currencies[k] });
            }
            return of(new GetCurrenciesListSuccess(transformCurrencies));
        })
    );

    constructor(
        private readonly convertService: ConvertService,
        private readonly actions$: Actions,
    ) {}
}