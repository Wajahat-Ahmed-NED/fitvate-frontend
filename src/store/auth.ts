import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';


const storedToken = localStorage.getItem('authToken')?.toString() || null;

// Atoms with localStorage persistence
export const authTokenAtom = atomWithStorage<string | null>('authToken', storedToken);

// Derived atom for authentication status
export const isAuthenticatedAtom = atom((get) => {
  const token = get(authTokenAtom);
  return !!token;
});

// Action atoms
export const loginAtom = atom(
  null,
  (get, set, { token }: { token: string }) => {
    set(authTokenAtom, token);
  }
);

export const logoutAtom = atom(
  null,
  (get, set) => {
    set(authTokenAtom, null);
  }
);