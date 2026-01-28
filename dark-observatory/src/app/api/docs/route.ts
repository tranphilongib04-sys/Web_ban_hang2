import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@/lib/swaggerConfig';
import { NextApiHandler } from 'next';

const swaggerHandler: NextApiHandler = (req, res) => {
  swaggerUi.setup(swaggerSpec)(req, res);
};

export { swaggerHandler, swaggerSpec };
