import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import { apiGatewayResponseMiddleware } from './middleware'

export const middyfy = (handler: any) => {
  return middy(handler).use(middyJsonBodyParser()).use(apiGatewayResponseMiddleware({
    enableErrorLogger: true
  }))
}
