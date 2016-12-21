import mongoose, { Schema } from 'mongoose';

const Profile = new Schema({
  eventId: Number,
  token: String,
  name: String
});

Profile.statics.editProfile = function (eventId, name, token) {
  return this.update(
    { eventId: eventId, token: token },
    { name: name },
    { upsert: true }
  ).exec();
};

export default mongoose.model('Profile', Profile);