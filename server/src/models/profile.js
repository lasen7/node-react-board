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

Profile.statics.getProfile = function (eventId, token) {
  return this.findOne({
    eventId: eventId,
    token: token
  }, {
      name: 1,
      _id: 0
    }).exec();
};

export default mongoose.model('Profile', Profile);