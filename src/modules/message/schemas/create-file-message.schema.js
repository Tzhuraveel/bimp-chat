export const createFileMessageSchema = {
  consumes: ['multipart/form-data'],
  tags: ['Message'],
  summary: 'Upload file message',
  body: {
    type: 'object',
    properties: {
      file: { isFile: true, type: 'string', format: 'binary' } 
    },
    required: ['file']
  },
  response: {
    201: {
      type: 'object',
      properties: { id: { type: 'integer' } }
    }
  }
};
