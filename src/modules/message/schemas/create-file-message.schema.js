export const createFileMessageSchema = {
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    required: ['file'],
    properties: {
      file: {
        type: 'string',
        format: 'binary'
      }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: { success: { type: 'boolean' } }
    }
  },
  tags: ['Message'],
  summary: 'Upload file message'
};
