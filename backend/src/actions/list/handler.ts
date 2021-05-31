import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import DataService from '@services/data.service';

import schema from './schema';

const list: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const dataService = new DataService()
  return dataService.list()
}

export const main = middyfy(list);
