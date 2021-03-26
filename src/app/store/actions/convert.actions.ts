import { createAction, props } from '@ngrx/store';
import { ICurrency } from 'src/app/convert/interfaces/currency.interface';

export const getCurrenciesList = createAction('[Convert] Get Currencies List');

export const getCurrenciesListSuccess = createAction(
    '[Convert] Get Currencies List Success',
    props<{ currencies: ICurrency[] }>()
);

export const getCurrenciesListFailed = createAction(
    '[Convert] Get Currencies List Failed',
    props<{ error: any }>()
);

export const setFromCurrency = createAction(
    '[Convert] Set Default From Currency',
    props<{ from: string }>()
);

export const setToCurrency = createAction(
    '[Convert] Set Default To Currency',
    props<{ to: string }>()
);

export const setCurrencySettingsDate = createAction(
    '[Convert] Set Currency Settings Date',
    props<{ startDate: Date | string, endDate: Date | string }>()
);

export const clearCurrencySettings = createAction('[Convert] Clear Currency Settings');