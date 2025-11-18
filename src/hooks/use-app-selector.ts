import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../types/state';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default useAppSelector;
