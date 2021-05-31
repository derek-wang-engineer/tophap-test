"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_model_1 = __importDefault(require("../models/property.model"));
const user_model_1 = require("../models/user.model");
class UserService {
    constructor() {
        // Add an User
        this.add = async (firstName, lastName, email) => {
            const user = new user_model_1.User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            await user.save();
            return user;
        };
        // Delete an User
        this.delete = async (uid) => {
            const user = await user_model_1.User.get(uid);
            if (user) {
                await user.delete();
            }
        };
        // Get all followers
        this.getFavorites = async (uid) => {
            const user = await user_model_1.User.get(uid);
            if (user) {
                const favorites = await user.shares.get(property_model_1.default);
                return favorites;
            }
            return [];
        };
        this.getFollowers = async (uid) => {
            const user = await user_model_1.User.get(uid);
            if (user) {
                const followings = await user.followings.get(user_model_1.User);
                return followings;
            }
            return [];
        };
        // Favorite/Unfavorite User Properties
        this.toggleFavorite = async (uid, pid) => {
            const user = await user_model_1.User.get(uid);
            if (user) {
                const shares = await user.shares.get(property_model_1.default);
                const property = shares.find(item => item.id === pid);
                if (property) {
                    // Unfavorite property
                    user.shares.delete(property);
                    await user.update();
                }
                else {
                    const newProp = await property_model_1.default.get(pid);
                    if (newProp) {
                        user.shares.insert(newProp);
                        await user.update();
                    }
                }
            }
        };
        // Follow/Unfollow User
        this.toggleFollow = async (uid, followUid) => {
            const user = await user_model_1.User.get(uid);
            if (user) {
                const followers = await user.followings.get(user_model_1.User);
                const follower = followers.find(item => item.id === followUid);
                if (follower) {
                    // Unfollow the selected user
                    user.followings.delete(follower);
                    await user.update();
                }
                else {
                    // Add new follower
                    const newFollower = await user_model_1.User.get(followUid);
                    if (newFollower) {
                        user.followings.insert(newFollower);
                        await user.update();
                    }
                }
            }
        };
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map