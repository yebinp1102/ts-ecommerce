declare namespace Express {
  export interface Request {
    // user info who request
    user: {
      _id: string,
      name: string,
      email: string,
      isAdmin: boolean,
      token: string
    }
  }
}