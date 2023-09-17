import jwt from 'jsonwebtoken';
import { UserType } from './models/userModel';


export const generateToken = (user: UserType) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET || 'test', 
  {expiresIn: '12hr'})
}

