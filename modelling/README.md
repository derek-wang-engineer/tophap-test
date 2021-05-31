# tophap-data-modeling-candidate-test

The prompt is to read through the feature request below and create a data model using Google's Firestore. Add to the documentation section below any tradeoffs in design you made in your data model or any description of your approach.

## feature request
 There are users who have various attributes. A user should be able to create a shared space where they can do the following

 1. invite other users to the shared space
 2. favorite and unfavorite any number of properties
    - any number of users in a shared space can favorite the same property
 4. create a list of properties
    - a list can have a property added and removed
 6. save notes
    - notes should be linked to a specific property
    - notes should be able to contain text and images

 Additional capabilities to consider when data modeling
 1. As a user that owns and is invited to mutiple shared spaces, I should be able to view a list of all those shared spaces.
 2. As a user, I should be able to view a list of properties I have favorited within a particular shared space. That list should also show other users in that shared space that have favorited those properties.
 3. As a user, I should be able to view all the notes for a particular property. I should also be able to tell if users in the shared space have seen a note or not.
 4. As a user, I should be able to see all the lists of properties or just the lists I have created.

## documentation
### Models
Models are defined in `src/models` folder.
There are 3 models defined in the folder
1. Note Model (`note.model.ts`)
This model contains all notes left for the specific property.
Each note has a text and images.
```
class Note {
  @property text?: string
  @property images?: string[]
}
```
2. Property Model (`property.model.ts`)
This model contains all properties defined.
Each property has got notes as sub collection which belonged to it.
```
class Property {
  @property name?: string
  @property val?: string
  @property notes: NestedCollection<Note>
}
```
3. User Model (`user.model.ts`)
This model contains and manages users.
Each user can follow other users and also can add any properties to their wishlist (as favorite)
So this model has `favorites` and `followings` as reference sub collections.
```
class User {
  @property firstName?: string
  @property lastName?: string
  @property email?: string
  @property followings: ReferenceCollection<User>
  @property shares: ReferenceCollection<Property>
}
```

### Services
Services are defined in `src/services` folder.
In that folder, two services are defined for our database management.
1. property.service.ts
This service manages property and note collections
```
add         - Add new property to property collection
addNote     - Add new note to the specific property
delete      - Delete the existing property on property collection
deleteNote  - Delete the existing note on the specific property

```
2. user.service.ts
This service manages users collection
```
add            - Add new user
delete         - Delete the user
getFavorite    - Get the favorites of the specific user
getFollowers   - Get the followers of the specific user
toggleFavorite - Favorite/Unfavorite the specific property on the selected user
toggleFollow   - Follow/unfollow the specific user on the selected user
```

### Test
Run `sh start-dev.sh` on the project root folder.
This will run `dist/index.js` file and will show some test results.
On this tests, those actions are processed.
```
1. Create 10 users
2. Create 10 properties
3. Create 5 notes for each property
4. Add followers to the specific user
5. Remove follower from the specific user
6. Add favorites to the specific user
7. Remove favorites from the specific user
```

### References
To manage the firestore collection, this project used `pring` node module.
Using this module, we can define/sync/manage the properties of the firebase collection using `typescript`.
