import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/User";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import axios from "axios";


interface UserState {
  userInfo : UserType,
  loading: boolean,
  error: boolean,
  message: string
}

const initialState: UserState = {
  userInfo: {
    name: '',
    email: '',
    token: '',
    isAdmin: false
  },
  loading: false,
  error: false,
  message: '',
}

export const login = createAsyncThunk('auth/login', async(userInfo: {email:string, password: string}) => {
  try{
    const {email, password} = userInfo
    const res = await axios.post('/api/users/signin', {email, password});
    return res.data
  }catch(err){
    return getError(err as ApiError)
  }
})

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload
      })
  }
})

export default UserSlice.reducer;