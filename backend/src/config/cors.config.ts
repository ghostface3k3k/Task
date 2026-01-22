export const getCorsOrigins = (): string[] => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  return process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : [frontendUrl, 'http://localhost:5173', 'http://localhost:4200', 'http://localhost:4000'];
};
