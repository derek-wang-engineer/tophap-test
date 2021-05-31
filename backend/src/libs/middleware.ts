import middy from '@middy/core';
import AppError from '@models/error.model';
import AuthService from '@services/auth.service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatErrorResponse, formatSuccessResponse } from './apiGateway';
import MiddlewareFunction = middy.MiddlewareFunction;

export const apiGatewayResponseMiddleware = (options: { enableErrorLogger?: boolean } = {}) => {
  const before: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
    const validNames = [ 'backend-dev-login', 'backend-dev-register' ]
    if (!validNames.includes(request.context.functionName)) {
      if (request.event.headers.Authorization == null) {
        throw new AppError('Token missing', 500)
      }

      const token = request.event.headers.Authorization.replace('Bearer ', '')
      const authService = new AuthService()
      const isValid = await authService.isValid(token)
      if (!isValid) {
        throw new AppError('Invalid token', 500)
      }
    }
  }

  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
    if (request.response === undefined || request.response === null) {
      return
    }

    const existingKeys = Object.keys(request.response)
    const isHttpResponse = existingKeys.includes('statusCode')
      && existingKeys.includes('headers')
      && existingKeys.includes('body');

    if (isHttpResponse) {
      return
    }

    request.response = formatSuccessResponse(request.response);
  }

  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    let statusCode = 500;

    if (error instanceof AppError) {
      statusCode = error.statusCode
    }

    if (options.enableErrorLogger) {
      console.error(error);
    }

    request.response = formatErrorResponse(statusCode, error.message)
  }

  return {
    before,
    after,
    onError,
  }
}
