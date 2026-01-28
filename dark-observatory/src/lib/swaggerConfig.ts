import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TPB Manage API',
      version: '1.0.0',
      description: 'API documentation for TPB Manage - Store Management System',
      contact: {
        name: 'TPB Support',
        url: 'https://github.com/tranphilongib04-sys/Web_ban_hang2',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3210',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
      {
        name: 'Orders',
        description: 'Order management endpoints',
      },
      {
        name: 'Customers',
        description: 'Customer management endpoints',
      },
      {
        name: 'Reports',
        description: 'Business reports and analytics',
      },
    ],
  },
  apis: ['./src/lib/swagger.ts', './src/app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
