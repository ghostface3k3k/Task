export const getCorsOrigins = (): string[] => {
  return process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:4200', 'http://localhost:4000'];
};
