import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
