import { Action } from '@ngrx/store';
import { ICurrency } from 'src/app/convert/interfaces/currency.interface';

export enum EConvertActions {
    GetCurrenciesList = '[Convert] Get Currencies List',
    GetCurrenciesListSuccess = '[Convert] Get Currencies List Success',
    GetCurrenciesListFailed = '[Convert] Get Currencies List Success',
    SetFromCurrency = '[Convert] Set Default From Currency',
    SetToCurrency = '[Convert] Set Default To Currency',
    SetCurrencySettingsDate = '[Convert] Set Currency Settings Date',
    ClearCurrencySettings = '[Convert] Clear Currency Settings',
}

export class GetCurrenciesList implements Action {
    readonly type = EConvertActions.GetCurrenciesList;
}

export class GetCurrenciesListSuccess implements Action {
    readonly type = EConvertActions.GetCurrenciesListSuccess;
    constructor(public payload: ICurrency[]) {}
}

export class GetCurrenciesListFailed implements Action {
    readonly type = EConvertActions.GetCurrenciesListFailed;
    constructor(public payload: any) {}
}

export class SetFromCurrency implements Action {
    readonly type = EConvertActions.SetFromCurrency;
    constructor(public payload: string) {}
}

export class SetToCurrency implements Action {
    readonly type = EConvertActions.SetToCurrency;
    constructor(public payload: string) {}
}

export class SetCurrencySettingsDate implements Action {
    readonly type = EConvertActions.SetCurrencySettingsDate;
    constructor(public payload: { startDate: Date | string, endDate: Date | string }) {}
}

export class ClearCurrencySettings implements Action {
    readonly type = EConvertActions.ClearCurrencySettings;
}

export type ConvertActions = 
    GetCurrenciesList |
    GetCurrenciesListSuccess |
    GetCurrenciesListFailed |
    SetFromCurrency |
    SetToCurrency |
    ClearCurrencySettings |
    SetCurrencySettingsDate;