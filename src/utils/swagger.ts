import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SwapHour API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk proyek SwapHour Backend',
    },
    servers: [
      {
        url: 'https://swap-hour-api.vercel.app', // URL Vercel-mu
        description: 'Production server',
      },
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  // Ini memerintahkan Swagger untuk membaca file route-mu
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);