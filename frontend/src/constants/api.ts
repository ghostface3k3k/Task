export const API_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const AUTH_TOKEN_KEY = 'authToken';

// Demo credentials - FOR DEMONSTRATION PURPOSES ONLY
// In production, use proper authentication with backend validation
export const LOGIN_CREDENTIALS = {
  username: 'HR',
  password: 'HR',
};
