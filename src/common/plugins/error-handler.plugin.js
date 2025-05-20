import { PrismaClientValidationError } from '@prisma/client/runtime/client';
import fp from 'fastify-plugin';
import { HttpError } from '../http/http-error.js';

export default fp(async function simpleErrorHandler (fastify) {
  fastify.setErrorHandler((err, req, reply) => {
    let message = err.message || 'Unexpected error';
    let error = 'Internal Server Error';
    let statusCode = err.statusCode || 500;
    
    if (err.validation) {
      error = 'Bad Request',
      message = err.message
    } else if(err instanceof HttpError) {
      statusCode = err.statusCode;
      error = err.name;
      message = err.message;
    } else if(err instanceof PrismaClientValidationError) {
      message = err.message;
    }

    reply.code(statusCode).send({
      statusCode,
      error,
      message,
    });
  });
});
