import { messageService } from "./message.service.js";
import { createTextMessageSchema } from "./schemas/create-text-message.schema.js";
import { createFileMessageSchema } from "./schemas/create-file-message.schema.js";
import { getMessageContentByIdSchema } from "./schemas/get-message-content-by-id.schema.js";
import { getMessagesListSchema } from "./schemas/get-messages-list.schema.js";
import basicAuthPlugin from "../auth/plugins/basic-auth.plugin.js";

export const messageController = async (fastify) => {
  await fastify.register(basicAuthPlugin);

  fastify.get('/list', { schema: getMessagesListSchema }, async (req, reply) => {
    const messages = await messageService.getAllWithPagination(req.query)

    reply.code(200).send(messages);
  });

  fastify.get('/content/:id', { schema: getMessageContentByIdSchema }, async (req, reply) => {
    await messageService.getContentById(req.params.id, reply)
  });

  fastify.post('/text', { schema: createTextMessageSchema }, async (req, reply) => {
    const result = await messageService.createTextMessage(req.user, req.body)

    reply.code(201).send(result);
  });

  fastify.post(
    '/file', 
    { 
      schema: createFileMessageSchema,
    }, 
    async (req, reply) => {
      const data = await req.file({limits: { files: 1 }})

      const result = await messageService.createFileMessage(req.user.id, data)

      reply.code(201).send(result);
    }, 
  );
}