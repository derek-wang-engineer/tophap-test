import * as Pring from 'pring'
const property = Pring.property

export default class Note extends Pring.Base {
  @property text?: string
  @property images?: string[]
}
