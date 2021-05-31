import * as Pring from 'pring'
import { ReferenceCollection } from 'pring'
import Property from './property.model'
const property = Pring.property

export class User extends Pring.Base {
  @property firstName?: string
  @property lastName?: string
  @property email?: string
  @property followings: ReferenceCollection<User> = new ReferenceCollection(this)
  @property shares: ReferenceCollection<Property> = new ReferenceCollection(this)
}
