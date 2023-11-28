import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/Store";
import {ErrorData} from "../model/ErrorModel";
import {userModel} from "../model/UserModel";
import {confirmPassword, forgetPassword, login, logout, signUp} from "../API/UserApi";

const userAdapter = createEntityAdapter<userModel>({});

const initialState = userAdapter.getInitialState({
  loadingStatus: false,
  errorData: {} as ErrorData,
  token: '',
  user: {} as userModel,
  userName: '',
  success: ''
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSetToken: (state, action) => {
      state.token = action.payload
    },
    userSetUserName: (state, action) => {
      state.userName = action.payload
    },
    userSetSuccess: (state, action) => {
      state.success = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, state => {
        state.loadingStatus = true
        state.success = ''
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.errorData = {}
        state.loadingStatus = false
        state.success = 'success'
      })
      .addCase(signUp.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
        state.success = 'error'
      })
      .addCase(login.pending, state => {
        state.loadingStatus = true
        state.success = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.errorData = {}
        state.token = action.payload.accessToken
        state.userName = action.payload.userName
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('userName', action.payload.userName);
        state.loadingStatus = false
        state.success = 'success'
      })
      .addCase(login.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
        state.success = 'error'
      })
      .addCase(logout.pending, state => {
        state.loadingStatus = true
        state.success = ''
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.errorData = {}
        state.token = ''
        state.userName = ''
        localStorage.setItem('token', '');
        localStorage.setItem('userName', '');
        state.loadingStatus = false
        state.success = 'success'
      })
      .addCase(logout.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
        state.success = 'error'
      })
      .addCase(forgetPassword.pending, state => {
        state.loadingStatus = true
        state.success = ''
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.errorData = {}
        state.loadingStatus = false
        state.success = 'success'
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
        state.success = 'error'
      })
      .addCase(confirmPassword.pending, state => {
        state.loadingStatus = true
        state.success = ''
      })
      .addCase(confirmPassword.fulfilled, (state, action) => {
        state.errorData = {}
        state.loadingStatus = false
        state.success = 'success'
      })
      .addCase(confirmPassword.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
        state.success = 'error'
      })

  }
})

export default userSlice.reducer

export const {
  userSetToken,
  userSetUserName,
  userSetSuccess
} = userSlice.actions

export const {
  selectAll: allUser
} = userAdapter.getSelectors<RootState>((state) => state.user);