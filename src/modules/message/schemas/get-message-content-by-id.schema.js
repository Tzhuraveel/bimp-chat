export const getMessageContentByIdSchema = {
  params: {
      type: 'object',
      properties: {
        id: { type: 'integer', minimum: 1 },
      }
  },
  response: {
    200: {
      description: 'Raw message text or file stream',
      type: 'object',
      content: {
        'text/plain': {
          schema: { type: 'string' }
        },
        '*/*': {
          schema: {
            type: 'string',
            format: 'binary'
          }
        }
      },
    },
  },
  tags: ['Message'],
  summary: 'Get raw content'
};

