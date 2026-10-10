"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export interface CartLine {
  itemKey: string;
  categoryKey: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  note: string;
}

type CartAction =
  | { type: "hydrate"; state: CartState }
  | {
      type: "setQuantity";
      itemKey: string;
      categoryKey: string;
      title: string;
      price: number;
      quantity: number;
    }
  | { type: "setNote"; note: string }
  | { type: "clear" };

const EMPTY_STATE: CartState = { lines: [], note: "" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setNote":
      return { ...state, note: action.note };
    case "clear":
      return EMPTY_STATE;
    case "setQuantity": {
      const { itemKey, categoryKey, title, price, quantity } = action;
      const existingIndex = state.lines.findIndex(
        (line) => line.itemKey === itemKey,
      );

      if (quantity <= 0) {
        if (existingIndex === -1) return state;
        return {
          ...state,
          lines: state.lines.filter((line) => line.itemKey !== itemKey),
        };
      }

      if (existingIndex === -1) {
        return {
          ...state,
          lines: [
            ...state.lines,
            { itemKey, categoryKey, title, price, quantity },
          ],
        };
      }

      return {
        ...state,
        lines: state.lines.map((line, index) =>
          index === existingIndex ? { ...line, quantity } : line,
        ),
      };
    }
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  note: string;
  count: number;
  total: number;
  getQuantity: (itemKey: string) => number;
  setQuantity: (item: Omit<CartLine, "quantity">, quantity: number) => void;
  setNote: (note: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(tableNumber: string) {
  return `taqamtiku-cart-${tableNumber}`;
}

export function CartProvider({
  tableNumber,
  children,
}: {
  tableNumber: string;
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(cartReducer, EMPTY_STATE);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey(tableNumber));
      if (raw) {
        dispatch({ type: "hydrate", state: JSON.parse(raw) });
      }
    } catch {
      // ignore malformed/unavailable storage, start with an empty cart
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNumber]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(tableNumber), JSON.stringify(state));
    } catch {
      // storage unavailable (private browsing, quota) — cart just won't persist
    }
  }, [tableNumber, state]);

  const setQuantity = useCallback(
    (item: Omit<CartLine, "quantity">, quantity: number) => {
      dispatch({ type: "setQuantity", ...item, quantity });
    },
    [],
  );

  const setNote = useCallback((note: string) => {
    dispatch({ type: "setNote", note });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const getQuantity = useCallback(
    (itemKey: string) =>
      state.lines.find((line) => line.itemKey === itemKey)?.quantity ?? 0,
    [state.lines],
  );

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = state.lines.reduce(
      (sum, line) => sum + line.quantity * line.price,
      0,
    );
    return {
      lines: state.lines,
      note: state.note,
      count,
      total,
      getQuantity,
      setQuantity,
      setNote,
      clear,
    };
  }, [state, getQuantity, setQuantity, setNote, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
