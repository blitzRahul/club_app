import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name:                 { type: String },
  regNum:               { type: String, unique: true },
  email:                { type: String },
  slots:                { type: Array },
  role:                 { type: String },
  phone:                { type: String },
});

const User = models.User || model('User', userSchema, 'users');
export default User