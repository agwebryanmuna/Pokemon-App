import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  auth0Id: {type: String, unique: true},
  bookmarks: { type: [String], default: [] },
  liked: { type: [String], default: [] },
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User;
