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

/* 이벤트 관련 메소드 */

Event.statics.addEvent = function (eventId, eventName, email) {
  let event = new this();
  event.eventId = eventId;
  event.eventName = eventName;
  event.email = email;
  event.date = new Date();
  event.contents = [];
  return event.save();
};

Event.statics.findEventById = function (eventId) {
  return this.findOne({ eventId: eventId }).exec();
};

Event.statics.findEventsByEmail = function (email) {
  return this.find({ email: email }, {
    _id: 0,
    eventId: 1,
    eventName: 1,
    date: 1
  }).exec();
};

Event.statics.findEventsByQuery = function (email, query) {
  return this.find({
    $and: [
      { email: email },
      {
        $or: [
          { eventName: { $regex: query } },
          {
            $where: `this.eventId.toString().match("${query}")`
          }
        ]
      }
    ]
  }, {
      _id: 0,
      eventId: 1,
      eventName: 1,
      date: 1
    }).exec();
};

Event.statics.deleteEvent = function (eventId) {
  return this.remove({ eventId: eventId }).exec();
};

/* 게시판 글 관련 메소드 */
Event.statics.addContent = function (eventId, writer, content, token) {
  const addItem = {
    writer,
    date: new Date(),
    content,
    like: [],
    token
  };

  return this.update(
    { eventId: eventId },
    { $push: { contents: addItem } })
    .exec();
};

Event.statics.getContents = function (eventId) {
  return this.findOne(
    { eventId: eventId },
    {
      contents: 1,
      _id: 0
    })
    .exec();
};

Event.statics.likeContent = function (eventId, contentId, token, isLike) {
  const key = isLike ? '$push' : '$pull';
  const obj = {};
  obj[key] = { 'contents.$.like': token };

  return this.update({
    eventId: eventId, 'contents._id': contentId
  }, obj)
    .exec();
};

Event.statics.editWriter = function (eventId, name) {
  return this.findOne({ eventId: eventId })
    .exec((err, doc) => {
      if (!doc) {
        return Promise.resolve();
      }

      for (let content of doc.contents) {
        if (content.writer !== '') {
          content.writer = name;
        }
      }

      return doc.save();
    });
};

export default mongoose.model('Event', Event);