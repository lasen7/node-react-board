import mongoose, { Schema } from 'mongoose';

const Event = new Schema({
  eventId: Number,
  eventName: String,
  date: Date,
  email: String,
  contents: [
    {
      writer: String,
      date: Date,
      content: String,
      like: [],
      token: String
    }
  ]
});

Event.statics.findEvent = function (eventId) {

};

export default mongoose.model('Event', Event);