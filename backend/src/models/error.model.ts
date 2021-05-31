export default class AppError extends Error {
  private _statusCode: number;
  get statusCode(): number { return this._statusCode }
  set statusCode(value: number) { this._statusCode = value }

  constructor(message = '', statusCode = 400) {
    super(message);
    this._statusCode = statusCode
  }
}
