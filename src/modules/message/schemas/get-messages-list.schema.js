export const getMessagesListSchema = {
  security: [{ basicAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      take: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id:        { type: 'integer' },
              type:      { type: 'string' },
              text:      { type: 'string', nullable: true },
              filename:  { type: 'string', nullable: true },
              mimetype:  { type: 'string', nullable: true },
              createdAt: { type: 'string', format: 'date-time' }
            },
            required: ['id', 'type', 'createdAt']
          }
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'integer', example: 1 },
            take: { type: 'integer', example: 10 },
            itemCount: { type: 'integer', example: 100 },
            pageCount: { type: 'integer', example: 100 },
            hasNextPage: { type: 'boolean', example: true },
            hasPreviousPage: { type: 'boolean', example: true }
          },
          required: ['page', 'take', 'itemCount', 'pageCount', 'hasNextPage', 'hasPreviousPage'],
        }
      }
    }
  },
  tags: ['Message'],
  summary: 'Get paginated list of messages'
};
