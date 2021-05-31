import Property from '../models/property.model'
import { User } from '../models/user.model'

export default class UserService {
  // Add an User
  add = async (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    const user: User = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    await user.save()
    return user
  }

  // Delete an User
  delete = async (uid: string) => {
    const user: User | undefined = await User.get(uid)
    if (user) {
      await user.delete()
    }
  }

  // Get all followers
  getFavorites = async (uid: string) => {
    const user: User | undefined = await User.get(uid)
    if (user) {
      const favorites = await user.shares.get(Property)
      return favorites
    }
    return []
  }
  getFollowers = async (uid: string) => {
    const user: User | undefined = await User.get(uid)
    if (user) {
      const followings = await user.followings.get(User)
      return followings
    }
    return []
  }

  // Favorite/Unfavorite User Properties
  toggleFavorite = async (uid: string, pid: string) => {
    const user: User | undefined = await User.get(uid)
    if (user) {
      const shares = await user.shares.get(Property)
      const property: Property | undefined = shares.find(item => item.id === pid)
      if (property) {
        // Unfavorite property
        user.shares.delete(property)
        await user.update()
      } else {
        const newProp: Property | undefined = await Property.get(pid)
        if (newProp) {
          user.shares.insert(newProp)
          await user.update()
        }
      }
    }
  }
  // Follow/Unfollow User
  toggleFollow = async (uid: string, followUid: string) => {
    const user: User | undefined = await User.get(uid)
    if (user) {
      const followers = await user.followings.get(User)
      const follower: User | undefined = followers.find(item => item.id === followUid)
      if (follower) {
        // Unfollow the selected user
        user.followings.delete(follower)
        await user.update()
      } else {
        // Add new follower
        const newFollower: User | undefined = await User.get(followUid)
        if (newFollower) {
          user.followings.insert(newFollower)
          await user.update()
        }
      }
    }
  }
}
