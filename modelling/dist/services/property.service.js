"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_model_1 = __importDefault(require("../models/note.model"));
const property_model_1 = __importDefault(require("../models/property.model"));
class PropertyService {
    constructor() {
        // Add a Property
        this.add = async (name, val) => {
            const prop = new property_model_1.default();
            prop.name = name;
            prop.val = val;
            await prop.save();
            return prop;
        };
        // Add a Note inside the property
        this.addNote = async (pId, text, images) => {
            const property = await property_model_1.default.get(pId);
            if (property) {
                const note = new note_model_1.default();
                note.text = text;
                note.images = images;
                property.notes.insert(note);
                property.save();
                return note;
            }
            return null;
        };
        // Delete a property (the notes inside that property will also be deleted.)
        this.delete = async (pId) => {
            const property = await property_model_1.default.get(pId);
            if (property) {
                await property.delete();
            }
        };
        // Delete a note inside a property
        this.deleteNote = async (pId, noteId) => {
            const property = await property_model_1.default.get(pId);
            if (property) {
                const note = await property.notes.doc(noteId, note_model_1.default);
                if (note) {
                    property.notes.delete(note);
                }
            }
        };
    }
}
exports.default = PropertyService;
//# sourceMappingURL=property.service.js.map