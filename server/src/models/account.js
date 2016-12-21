import mongoose, { Schema } from 'mongoose';

const Account = new Schema({
  email: String,
  name: String,
  password: String
});

Account.statics.addAccount = function (email, name, hash) {
  let account = new this();
  account.email = email;
  account.name = name;
  account.password = hash;
  return account.save();    // return account model
};

Account.statics.findAccountByEmail = function (email) {
  return this.findOne({ email: email }).exec();
};

export default mongoose.model('Account', Account);