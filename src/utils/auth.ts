export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const getUser = (): any | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const setAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};