import {Schema, model} from 'mongoose';

export interface UserType {
  _id?: string
  name: string,
  email: string,
  password: string,
  isAdmin: boolean
};

const userSchema = new Schema<UserType>({
  _id: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false},
}, {timestamps: true});

export const User = model<UserType>('User', userSchema);

