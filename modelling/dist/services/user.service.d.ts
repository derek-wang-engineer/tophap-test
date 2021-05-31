import Property from '../models/property.model';
import { User } from '../models/user.model';
export default class UserService {
    add: (firstName: string, lastName: string, email: string) => Promise<User>;
    delete: (uid: string) => Promise<void>;
    getFavorites: (uid: string) => Promise<Property[]>;
    getFollowers: (uid: string) => Promise<User[]>;
    toggleFavorite: (uid: string, pid: string) => Promise<void>;
    toggleFollow: (uid: string, followUid: string) => Promise<void>;
}
