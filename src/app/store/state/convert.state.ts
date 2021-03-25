import { ICurrency } from 'src/app/convert/interfaces/currency.interface';
import { DEFAULT_FROM_CURRENCY } from 'src/app/core/constants/convert.constants';

export interface IConvertState {
    settings: {
        from: string;
        to: string;
        startDate: Date | string;
        endDate: Date | string;
    };
    currenciesList: ICurrency[];
}
  
export const initialConvertState: IConvertState = {
    settings: {
        from: DEFAULT_FROM_CURRENCY,
        to: '',
        startDate: null,
        endDate: null,
    },
    currenciesList: [],
};