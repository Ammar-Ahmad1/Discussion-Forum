import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
    default: 'https://lh3.googleusercontent.com/a/AAcHTtci6RJekFINCdibq0iNLKa9rfOSIFl04lh86s2ITxUu=s96-c'
  },
  password: {
    type: String,
  },
  interestedCountries: {
    type: [String],
  },
  currentCountry: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },


});

const User = models.User || model("User", UserSchema);

export default User;