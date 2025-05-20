import { authService } from "./auth.service.js";
import { registerSchema } from "./schemas/register.scheme.js";

export const authController = async (fastify) => {
  fastify.post('/register', 
    { 
      schema: registerSchema, 
    }, 
    async (req, reply) => {
      const user = await authService.register(req.body)
      reply.code(201).send(user);
    });
}