'use client';

import React, { useState, createContext } from 'react';

interface CounterProviderProps {
  children: React.ReactNode;
}
export const CounterContext = createContext({
  counter: 0,
  setCounter: (counter: number) => {},
});
export const CounterProvider = ({ children }: CounterProviderProps) => {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
};