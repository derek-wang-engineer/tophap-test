import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ILoginRequest } from '@models/auth.model';
import AuthService from '@services/auth.service';

import schema from './schema';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const authService = new AuthService()
  return authService.login(event.body as ILoginRequest)
}

export const main = middyfy(login);
