import Note from '../models/note.model'
import Property from '../models/property.model'

export default class PropertyService {
  // Add a Property
  add = async (name: string, val: string) => {
    const prop: Property = new Property()
    prop.name = name
    prop.val = val
    await prop.save()
    return prop
  }
  // Add a Note inside the property
  addNote = async (pId: string, text: string, images: string[]) => {
    const property: Property | undefined = await Property.get(pId)
    if (property) {
      const note: Note = new Note()
      note.text = text
      note.images = images
      property.notes.insert(note)
      property.save()
      return note
    }
    return null
  }

  // Delete a property (the notes inside that property will also be deleted.)
  delete = async (pId: string) => {
    const property: Property | undefined = await Property.get(pId)
    if (property) {
      await property.delete()
    }
  }
  // Delete a note inside a property
  deleteNote = async (pId: string, noteId: string) => {
    const property: Property | undefined = await Property.get(pId)
    if (property) {
      const note: Note | undefined = await property.notes.doc(noteId, Note)
      if (note) {
        property.notes.delete(note)
      }
    }
  }
}
