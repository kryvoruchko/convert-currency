import { Action, createReducer, on } from '@ngrx/store';
import { DEFAULT_FROM_CURRENCY } from 'src/app/core/constants/convert.constants';
import { IConvertState, initialConvertState } from '../state/convert.state';
import * as ConvertActions from '../actions/convert.actions';


const reducer = createReducer(
    initialConvertState,
    on(ConvertActions.getCurrenciesListSuccess, (state, { currencies }) => ({ ...state, currenciesList: currencies })),
    on(ConvertActions.setFromCurrency, (state, { from }) => (
        {
            ...state,
            settings: {
                ...state.settings,
                from
            }
        }
    )),
    on(ConvertActions.setToCurrency, (state, { to }) => (
        {
            ...state,
            settings: {
                ...state.settings,
                to
            }
        }
    )),
    on(ConvertActions.setCurrencySettingsDate, (state, { startDate, endDate }) => (
        {
            ...state,
            settings: {
                ...state.settings,
                startDate,
                endDate
            }
        }
    )),
    on(ConvertActions.clearCurrencySettings, state => (
        {
            ...state,
            settings: {
                from: DEFAULT_FROM_CURRENCY,
                to: '',
                startDate: null,
                endDate: null
            }
        }
    )),
);
  
export function convertReducer(state: IConvertState | undefined, action: Action) {
    return reducer(state, action);
}
