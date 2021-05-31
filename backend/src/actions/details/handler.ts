import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { IPropertyGetRequest } from '@models/property.model';
import DataService from '@services/data.service';

import schema from './schema';

const details: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dataService = new DataService()
  return dataService.get({
    id: event.pathParameters.id
  } as IPropertyGetRequest)
}

export const main = middyfy(details);
