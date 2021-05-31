import type { APIGatewayProxyEvent, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts';
import { StatusCode } from '@enums/status-code.enum'
import { IResponse, ResponseModel } from '@models/response.model';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, any>

export const formatSuccessResponse = (data: any, message = ''): IResponse => {
  const response = new ResponseModel(data, StatusCode.SUCCESS, message)
  return response.generate()
}

export const formatErrorResponse = (statusCode: number, message: string): IResponse => {
  const response = new ResponseModel({}, statusCode, message)
  return response.generate()
}
