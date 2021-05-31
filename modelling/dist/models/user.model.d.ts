import * as Pring from 'pring';
import { ReferenceCollection } from 'pring';
import Property from './property.model';
export declare class User extends Pring.Base {
    firstName?: string;
    lastName?: string;
    email?: string;
    followings: ReferenceCollection<User>;
    shares: ReferenceCollection<Property>;
}
