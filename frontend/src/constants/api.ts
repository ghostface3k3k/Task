export const API_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const AUTH_CREDENTIALS = {
  USERNAME: 'HR',
  PASSWORD: 'HR',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'hr_auth_token',
  USER: 'hr_user',
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DEPARTMENT: '/department/:id',
};
