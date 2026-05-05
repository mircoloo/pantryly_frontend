import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { ProductItem } from '@/types/product';

type PantryContextValue = {
  items: ProductItem[];
  upsertFromScan: (item: Omit<ProductItem, 'scannedAt'>) => ProductItem;
};

const PantryContext = createContext<PantryContextValue | undefined>(undefined);

type PantryProviderProps = {
  children: ReactNode;
};

export function PantryProvider({ children }: PantryProviderProps) {
  const [items, setItems] = useState<ProductItem[]>([]);

  const value = useMemo<PantryContextValue>(() => {
    return {
      items,
      upsertFromScan: (item) => {
        const nextItem: ProductItem = {
          ...item,
          scannedAt: new Date().toISOString(),
        };

        setItems((prev) => {
          const existingIndex = prev.findIndex((entry) => entry.code === item.code);

          if (existingIndex === -1) {
            return [nextItem, ...prev];
          }

          const updated = [...prev];
          updated[existingIndex] = nextItem;
          return updated;
        });

        return nextItem;
      },
    };
  }, [items]);

  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}

export function usePantry() {
  const context = useContext(PantryContext);

  if (!context) {
    throw new Error('usePantry must be used within PantryProvider.');
  }

  return context;
}
