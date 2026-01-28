declare module 'swagger-jsdoc' {
  interface SwaggerOptions {
    definition: Record<string, unknown>;
    apis: string[];
  }

  function swaggerJsdoc(options: SwaggerOptions): Record<string, unknown>;

  export default swaggerJsdoc;
}
