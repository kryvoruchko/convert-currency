import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectConvert = (state: IAppState) => state.convert;
export const getCurrenciesList = createSelector(selectConvert, (state) => state.currenciesList);
export const getConvertSetttings = createSelector(selectConvert, (state) => state.settings);