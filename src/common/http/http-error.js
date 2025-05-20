export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
    this.name = 'HttpError';
  }
}
