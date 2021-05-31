import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { IRegisterRequest } from '@models/auth.model';
import AuthService from '@services/auth.service';

import schema from './schema';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const authService = new AuthService()
  return authService.register(event.body as IRegisterRequest)
}

export const main = middyfy(register);
