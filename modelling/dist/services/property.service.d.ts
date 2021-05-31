import Note from '../models/note.model';
import Property from '../models/property.model';
export default class PropertyService {
    add: (name: string, val: string) => Promise<Property>;
    addNote: (pId: string, text: string, images: string[]) => Promise<Note | null>;
    delete: (pId: string) => Promise<void>;
    deleteNote: (pId: string, noteId: string) => Promise<void>;
}
