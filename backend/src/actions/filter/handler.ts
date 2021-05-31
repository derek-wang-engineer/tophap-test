import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { IPropertyFilterRequest } from '@models/property.model';
import DataService from '@services/data.service';

import schema from './schema';

const filter: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dataService = new DataService()
  return dataService.filter(event.body as IPropertyFilterRequest)
}

export const main = middyfy(filter);
