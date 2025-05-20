export const registerSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 3, maxLength: 35 },
      password: { type: 'string', minLength: 6, maxLength: 20 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        username: { type: 'string', example: 'tzhuraveel' },
        createdAt: { type: 'string'}
      }
    }
  },
  security: [],
  tags: ['Auth'],
  summary: 'Register new user'
};

