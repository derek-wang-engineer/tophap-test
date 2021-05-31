import { Status } from "src/enums/status.enum";

// Interfaces
type ResponseHeader = { [header: string]: string | number | boolean; }

interface IResponseBody {
  data: any
  message: string
  status?: string
}

export interface IResponse {
  statusCode: number
  headers: ResponseHeader
  body: string
}

// Enums
const STATUS_MESSAGES = {
  200: Status.SUCCESS,
  400: Status.BAD_REQUEST,
  500: Status.ERROR,
}

const RESPONSE_HEADERS: ResponseHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
}

// Class
export class ResponseModel {
  private body: IResponseBody;
  private code: number;

  constructor(data = {}, code = 400, message = '') {
    this.body = {
      data: data,
      message: message,
      status: STATUS_MESSAGES[code],
    };
    this.code = code;
  }

  setBodyVariable = (variable: string, value: string): void => {
    this.body[variable] = value
  }

  setData = (data: any): void => {
    this.body.data = data
  }

  setCode = (code: number): void => {
    this.code = code
  }

  getCode = (): number => {
    return this.code
  }

  setMessage = (message: string): void => {
    this.body.message = message
  }

  getMessage = (): string => {
    return this.body.message
  }

  generate = (): IResponse => {
    return {
      statusCode: this.code,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify(this.body),
    };
  }
}
