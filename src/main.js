import Fastify from 'fastify';

import fastifyMultipart, { ajvFilePlugin } from '@fastify/multipart';
import { appConfig } from './config/configuration.js';

import errorHandlerPlugin from './common/plugins/error-handler.plugin.js';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { db } from './infra/database/db.js';
import { authController } from './modules/auth/auth.controller.js';
import { messageController } from './modules/message/message.controller.js';

const fastify = Fastify({
  ajv: {
    plugins: [ajvFilePlugin]
  }
});

await fastify.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: { title: 'Bimp Chat API', version: '1.0.0' },
    servers: [{ url: `http://${appConfig.host}:${appConfig.port}` }],
    components: {
      securitySchemes: {
        basicAuth: { type: 'http', scheme: 'basic' }   
      }
    },
    security: [
      {
        basicAuth: []
      }
    ],
  }
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',            
  uiConfig: {
    persistAuthorization: true 
  }
});

fastify.register(fastifyMultipart);
fastify.register(errorHandlerPlugin);
fastify.register(authController, { prefix: 'auth' })
fastify.register(messageController, { prefix: 'message' })


async function startServer() {
  try {
    await db.$connect();

    await fastify.listen({ port: appConfig.port, host: appConfig.host });

    console.log(`Server is running on http://${appConfig.host}:${appConfig.port}`);
    console.log(`Swagger is running on http://${appConfig.host}:${appConfig.port}/docs`);

  } catch (err) {
    console.error(err.message)
    process.exit(1);
  }
}

startServer()