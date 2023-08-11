import { useContext } from 'react';
import { CounterContext } from './Cart_Context/counterContext';

export const useCounterContext = () => {
  return useContext(CounterContext);
};