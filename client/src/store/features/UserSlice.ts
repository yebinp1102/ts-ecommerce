import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/User";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import axios from "axios";


interface UserState {
  userInfo : UserType | null,
  loading: boolean,
  error: boolean,
  message: string
}



const initialState: UserState = {
  userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
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

export const logout = createAsyncThunk('auth/logout', async() => {
  localStorage.removeItem('userInfo')
})

export const register = createAsyncThunk('auth/register', async(userInfo : {name: string, email: string, password: string}) => {
  try{
    const {name, email, password} = userInfo
    const res = await axios.post('/api/users/register', {name, email, password});
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
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload
      })
  }
})

export default UserSlice.reducer;