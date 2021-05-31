import * as Pring from 'pring'
import firebase from 'firebase'
import 'firebase/firestore'
import * as config from './firebase.json'
import UserService from './services/user.service'
import PropertyService from './services/property.service'
import { assert, expect } from 'chai'

const app = firebase.initializeApp({
	projectId: config.project_id,
	clientEmail: config.client_email,
	clientId: config.client_id,
	privateKey: config.private_key
})
Pring.initialize(app.firestore())

// Define services
// Define services
const userService = new UserService()
const propertyService = new PropertyService()

// Create Users
const tests = async () => {
  const users = []
  const properties = []
  const propertyNotes: any = {}

  // Add test information
  for (let i = 0; i < 10; i ++) {
    let user = await userService.add(`Test${i}`, `User${i}`, `test${i}@user.com`)
    users.push(user.id)

    let property = await propertyService.add(`Name${i}`, `Val${i}`)
    properties.push(property.id)

    for (let j = 0; j < 5; j ++) {
      let propertyNote = await propertyService.addNote(property.id, `Title${j}`, [`Image${j}`])
      if (propertyNote) {
        if (propertyNotes[property.id] == null) {
          propertyNotes[property.id] = [propertyNote.id]
        } else {
          propertyNotes[property.id].push(propertyNote.id)
        }
      }
    }
  }

  // console.log('Users', users)
  // console.log('Properties', properties)
  // console.log('Property Notes', propertyNotes)

  // const users = [
  //   'kmXYPtbKOtntpxysa247', 'vLSIKPZAcavep1ICqqRD', 'jugsRcCVVfR7GxGgXDly',
  //   'Sj3k2iPKxBz5ATQVXCHz', 'nWXs3EKsk1DWb8YEhwz3', 'kLOXNYY4wnS2WI5r7nEH',
  //   'pEM58CRBK1Y9V814jFdv', 'xNB3XWwmN65GVkZCIimf', 'dm3NWq9kK9LBjauTdXRy',
  //   'pu8el1tM9iD4WTxtCa96'
  // ]
  // const properties = [
  //   'SmoPjLXGAdoMyLgkM5Gf', 'pGgZuI70Yteof0Muuidv', 'uFSCtqEQouKmCNPtctD8',
  //   '9xeZOBdCaPfPheLJuo90', 'u2HDBiP7Kndnm1A2SBxw', 'm3sOagZ4gkkvdf7yt5SC',
  //   'cGDL95kef94rVdB2cF3k', 'nY3oXwTCuJcs8ZiqtGro', 'im5kuNBEJTOucuNcli9Y',
  //   '0eqvfQ3yWeFGPyCpAjTg'
  // ]
  // const notes = {
  //   'SmoPjLXGAdoMyLgkM5Gf': [ 'CUU5FT5Xzr54ZocBI9rM', '1YEHS7Ek2GLHsDYmppV6', 'kJpzWCPCUfj9KpnQg7nR', 'iOQJn9NGDajVYRHwlcTo', 'ltox19n2iX7gomaoBwBr' ],
  //   'pGgZuI70Yteof0Muuidv': [ 'ANGiQ4QLSUsj5ol32Eso', 'sOM4ImWMdXJZ5Hn3MGtw', 'ERhLekb0YzKP3jBwb9WP', 'GgeHDtq2nKwlFhv8bkNB', 'iDXHAyt50ogcre8wH2I6' ],
  //   'uFSCtqEQouKmCNPtctD8': [ 'Qr6uqVkNz1lgmc1QKosd', '7rRN2CiOXvNRbTE4awcH', '48MHeO5b7diHRHs6KcpY', 'fr26KkyT4nBup0tOJMWV', '29jaKhiD2OpQra84pLWK' ],
  //   '9xeZOBdCaPfPheLJuo90': [ 'neHQvRgTTmW9JOJbSohY', 'iHXMph9CpXVutWpd9OHT', 'KJyQidz3rxJwOdNlRgfO', 'k9YLtXZTtokPlReWeiBr', 'd6KIiZCl5CcDDLMJqdgP' ],
  //   'u2HDBiP7Kndnm1A2SBxw': [ 'vSXgGahAwxb6Xz7Em7mC', 'dkhPO0Hkg1xT7XKbhsye', 'GBYlICjFeHaDDTjrubQC', 'IkTKLroxnDlv8maszw8z', 'rMWqqeM8JD9EdvhyGv6f' ],
  //   'm3sOagZ4gkkvdf7yt5SC': [ '2BiPHCl92ZPI8LOO5vkx', 'EUjfIRGdbLFwndTx0qmM', 'lzvLLWR1Sj5JJAIt7C3y', 'DiwFgtKUa1GFUAoCj5VQ', '3tIZG8Lly8Q3Qzbnk4Gt' ],
  //   'cGDL95kef94rVdB2cF3k': [ '6lUGgSNfefJsne3fPwFX', 'vJPCudwm89hVFzK6xbEy', 'zitwK3MNejFEKCuiPLwx', 'lPvDKYlFxB0sJ6T3rvGE', 'tEhhSvoRKSftT6n9bNUH' ],
  //   'nY3oXwTCuJcs8ZiqtGro': [ 'Dc1iLRLpMuCq3DXoH5Z5', 'po6ztbaFievzRRKjPdBH', '9hTmXcuGB15E7TuKsvA5', '5HI6jIA9qjiP1Ni47jqY', 'SWtZ1oCZdM02e9QSekcK' ],
  //   'im5kuNBEJTOucuNcli9Y': [ 'OK7IG1t2cFOLTlH9oShF', 'mo5pP8lLGyvVT5illzhg', 'pNk6VCO2z7aV5T9BuWmy', 'XoLSffJjsYBmtU0Ml4bl', 's5JRYfHmaJUgxL3yiNMJ' ],
  //   '0eqvfQ3yWeFGPyCpAjTg': [ 'T99Jr4bINFK4tkX5txS1', 'S4oiMvQObrazReQbQSb1', '2UWPyMJpjNpe9HSdYqvk', 'yp4THYfjUY3HGqHMcQNd', 'mnWogosypWi8Bxxt673h' ]
  // }

  /** Test Follow **/
  let followers = null
  await userService.toggleFollow(users[0], users[1])
  await userService.toggleFollow(users[0], users[2])
  await userService.toggleFollow(users[0], users[3])
  await userService.toggleFollow(users[0], users[4])
  followers = (await userService.getFollowers(users[0])).map(item => item.id)
  expect(followers).to.have.members(
    [ users[1], users[2], users[3], users[4] ],
    'Failed to add users as follower on first user'
  )
  console.log('Followers are added successfully on first user')

  await userService.toggleFollow(users[5], users[1])
  await userService.toggleFollow(users[5], users[2])
  await userService.toggleFollow(users[5], users[3])
  await userService.toggleFollow(users[5], users[4])
  followers = (await userService.getFollowers(users[5])).map(item => item.id)
  expect(followers).to.have.members(
    [ users[1], users[2], users[3], users[4] ],
    'Failed to add users as follower on first user'
  )
  console.log('Followers are added successfully on fifth user')

  await userService.toggleFollow(users[0], users[2])
  followers = (await userService.getFollowers(users[0])).map(item => item.id)
  expect(followers).to.have.members(
    [ users[1], users[3], users[4] ],
    'The deleted user is not removed on followings on first user'
  )
  console.log('The deleted user is removed on the followings of first user')

  await userService.toggleFollow(users[5], users[2])
  followers = (await userService.getFollowers(users[5])).map(item => item.id)
  expect(followers).to.have.members(
    [ users[1], users[3], users[4] ],
    'The deleted user is not removed on followings on fifth user'
  )
  console.log('The deleted user is removed on the followings of fifth user')

  /** Test Shares(Favorites) **/
  let favorites = null
  await userService.toggleFavorite(users[0], properties[1])
  await userService.toggleFavorite(users[0], properties[2])
  await userService.toggleFavorite(users[0], properties[3])
  await userService.toggleFavorite(users[0], properties[4])
  favorites = (await userService.getFavorites(users[0])).map(item => item.id)
  expect(favorites).to.have.members(
    [ properties[1], properties[2], properties[3], properties[4] ],
    'Failed to share properties as favorites on first user'
  )
  console.log('Properties are shared successfully on first user')

  await userService.toggleFavorite(users[5], properties[1])
  await userService.toggleFavorite(users[5], properties[2])
  await userService.toggleFavorite(users[5], properties[3])
  await userService.toggleFavorite(users[5], properties[4])
  await userService.toggleFavorite(users[5], properties[5])
  await userService.toggleFavorite(users[5], properties[6])
  favorites = (await userService.getFavorites(users[5])).map(item => item.id)
  expect(favorites).to.have.members(
    [ properties[1], properties[2], properties[3], properties[4], properties[5], properties[6] ],
    'Failed to share properties as favorites on fifth user'
  )
  console.log('Properties are shared successfully on first user')

  await userService.toggleFavorite(users[0], properties[2])
  await userService.toggleFavorite(users[0], properties[6])
  favorites = (await userService.getFavorites(users[0])).map(item => item.id)
  expect(favorites).to.have.members(
    [ properties[1], properties[3], properties[4], properties[6] ],
    'The deleted property reference is not removed on favorites on first user'
  )
  console.log('The deleted property is removed on the favorites of first user')

  await userService.toggleFavorite(users[5], properties[2])
  await userService.toggleFavorite(users[5], properties[6])
  favorites = (await userService.getFavorites(users[5])).map(item => item.id)
  expect(favorites).to.have.members(
    [ properties[1], properties[3], properties[4], properties[5]],
    'The deleted property is not removed on the favorites on fifth user'
  )
  console.log('The deleted property is removed on the favorites of fifth user')
}
tests().then(() => {
  console.log('Tests finished')
}).catch((error) => {
  console.log('Test Failed')
  console.error(error)
})
