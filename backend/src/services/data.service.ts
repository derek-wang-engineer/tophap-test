import {
  IBaseProperty,
  IProperty,
  IPropertyFilterRequest,
  IPropertyGetRequest,
  IPropertySearchRequest,
  PropertyModel
} from '@models/property.model'
import * as data_json from './data.json'

export default class DataService {
  private _source: PropertyModel[] = []

  constructor() {
    this._source = data_json.map(item => new PropertyModel(item))
  }

  filter = (request: IPropertyFilterRequest): IBaseProperty[] =>
    this._source.filter(({ bedsCount, bathsDecimal }) => bedsCount >= request.bedsCount && bathsDecimal >= request.bathsDecimal).map((item) => item.getBaseEntityMappings())
  get = (request: IPropertyGetRequest): IProperty | null =>
    this._source.find(({ id }) => id === request.id)?.getFullEntityMappings()
  list = (): IBaseProperty[] =>
    this._source.map((item) => item.getBaseEntityMappings())
  search = (request: IPropertySearchRequest): IBaseProperty[] =>
    this._source.filter(({ address }) => address.toLowerCase().includes(request.address.toLowerCase())).map((item) => item.getBaseEntityMappings())
}
