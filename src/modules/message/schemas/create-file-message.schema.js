export const createFileMessageSchema = {
  consumes: ['multipart/form-data'],
  response: {
    201: {
      type: 'object',
      properties: { id: { type: 'integer' } }
    }
  },
  tags: ['Message'],
  summary: 'Upload file message'
};
