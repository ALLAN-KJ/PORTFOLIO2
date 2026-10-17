'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type PortfolioMode = 'SECURITY' | 'BUILDER';

interface ModeContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  isSecurity: boolean;
  isBuilder: boolean;
}

const ModeContext = createContext<ModeContextType>({
  mode: 'SECURITY',
  setMode: () => {},
  toggleMode: () => {},
  isSecurity: true,
  isBuilder: false,
});

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PortfolioMode>('SECURITY');

  const toggleMode = () => {
    setMode((prev) => (prev === 'SECURITY' ? 'BUILDER' : 'SECURITY'));
  };

  const isSecurity = mode === 'SECURITY';
  const isBuilder = mode === 'BUILDER';

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isSecurity,
        isBuilder,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('usePortfolioMode must be used within a ModeProvider');
  }
  return context;
}
