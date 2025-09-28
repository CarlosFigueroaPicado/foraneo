import { useCallback, useSyncExternalStore } from 'react';

export type SessionState = {
  userId: string | null;
};

type Listener = () => void;

let state: SessionState = {
  userId: null,
};

const listeners = new Set<Listener>();

function setState(partial: Partial<SessionState>) {
  state = { ...state, ...partial };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSessionStore() {
  const snapshot = useSyncExternalStore(subscribe, () => state);

  const setUserId = useCallback((userId: string | null) => {
    setState({ userId });
  }, []);

  return {
    ...snapshot,
    setUserId,
  } as const;
}
