export const createTextMessageSchema = {
  body: {
    type: 'object',
    required: ['text'],
    properties: {
      text: { type: 'string', minLength: 1, maxLength: 1000},
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      }
    }
  },
  tags: ['Message'],
  summary: 'Create message'
};

