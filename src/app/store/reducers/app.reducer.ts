import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { convertReducer } from './convert.reducer';

export const appReducers: ActionReducerMap<any, any> = {
    router: routerReducer,
    convert: convertReducer,
};