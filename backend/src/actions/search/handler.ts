import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { IPropertySearchRequest } from '@models/property.model';
import DataService from '@services/data.service';

import schema from './schema';

const search: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dataService = new DataService()
  return dataService.search(event.body as IPropertySearchRequest)
}

export const main = middyfy(search);
