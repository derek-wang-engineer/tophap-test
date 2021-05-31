import * as Pring from 'pring';
import { NestedCollection } from 'pring';
import Note from './note.model';
export default class Property extends Pring.Base {
    name?: string;
    val?: string;
    notes: NestedCollection<Note>;
}
