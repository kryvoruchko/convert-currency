import { RouterReducerState } from '@ngrx/router-store';
import { IConvertState, initialConvertState } from './convert.state';

export interface IAppState {
    router?: RouterReducerState;
    convert: IConvertState;
}

export const initialAppState: IAppState = {
    convert: initialConvertState,
}

export function getInitialState(): IAppState {
    return initialAppState;
}