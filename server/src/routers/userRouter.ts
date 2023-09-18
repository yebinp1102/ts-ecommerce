import express, {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel';
import { generateToken } from '../utils';
import bcrypt from 'bcryptjs'

export const userRouter = express.Router();

userRouter.post('/signin', asyncHandler( async (req: Request, res: Response) => {
  // Find user based on email
  const user = await User.findOne({email: req.body.email});
  
  if(user){
    // Check if passwords are match
    if(bcrypt.compareSync(req.body.password, user.password) ){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token : generateToken(user)
      })
    }else{ 
      // if passwords do not match
      res.status(401).json({message: 'Password does not match'})
    }
  }else{
    // if user does not exist
    res.status(401).json({message: 'Cannot find matched user email'});
  }
}))


userRouter.post('/register', asyncHandler(async(req: Request, res: Response) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  })
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user)
  })
}))