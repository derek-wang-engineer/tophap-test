import * as Pring from 'pring'
import { NestedCollection } from 'pring'
import Note from './note.model'
const property = Pring.property

export default class Property extends Pring.Base {
  @property name?: string
  @property val?: string
  @property notes: NestedCollection<Note> = new NestedCollection(this)
}
