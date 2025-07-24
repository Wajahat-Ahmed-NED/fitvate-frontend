import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../store/auth';

// Helper function to get auth header for API requests
export const useAuthHeader = () => {
  const token = useAtomValue(authTokenAtom);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// For non-hook contexts, you can still access the token directly
export const getAuthHeader = (token: string | null): Record<string, string> => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};