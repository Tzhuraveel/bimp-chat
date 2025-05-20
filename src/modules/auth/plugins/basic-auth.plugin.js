import fp from 'fastify-plugin';
import { HttpError } from '../../../common/http/http-error.js';
import { authService } from '../auth.service.js';

export default fp(async function basicAuthPlugin(fastify) {
  fastify.decorateRequest('user', null);          

  fastify.addHook('onRequest', async (req) => {
    const header = req.headers?.authorization;

    if (!header?.startsWith('Basic ')) {
      throw new HttpError(401, 'Unauthorized')
    }

    const [login, password] = Buffer
      .from(header.split(' ')[1], 'base64')
      .toString()
      .split(':');


    const user = await authService.verifyAndGetUser(login, password);
    if (!user) {
      throw new HttpError(401, 'Invalid credentials')
    }

    req.user = { id: user.id, username: user.username };  
  });
});
