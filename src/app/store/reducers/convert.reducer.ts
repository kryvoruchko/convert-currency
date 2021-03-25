import { DEFAULT_FROM_CURRENCY } from 'src/app/core/constants/convert.constants';
import { ConvertActions, EConvertActions } from '../actions/convert.actions';
import { IConvertState, initialConvertState } from '../state/convert.state';

export const convertReducer = (
    state = initialConvertState,
    action: ConvertActions
): IConvertState => {
    const settings = state.settings;

    switch (action.type) {
        case EConvertActions.GetCurrenciesListSuccess:
            return {
                ...state,
                currenciesList: action.payload,
            };

        case EConvertActions.SetFromCurrency:
            return {
                ...state,
                settings: {
                    ...settings,
                    from: action.payload,
                }
            };

        case EConvertActions.SetToCurrency:
            return {
                ...state,
                settings: {
                    ...settings,
                    to: action.payload,
                }
            };

        case EConvertActions.SetCurrencySettingsDate:
            return {
                ...state,
                settings: {
                    ...settings,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                }
            };

        case EConvertActions.ClearCurrencySettings:
            return {
                ...state,
                settings: {
                    from: DEFAULT_FROM_CURRENCY,
                    to: '',
                    startDate: null,
                    endDate: null
                }
            };
    
        default:
            return state;
    }
}
