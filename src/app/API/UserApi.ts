import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {confirmPasswordModel, loginModel, userModel} from "../model/UserModel";
const API_URL = process.env.REACT_APP_THEME_API_URL

const headers = {
  'Authorization': localStorage.getItem('token')
}

const signUp = createAsyncThunk(
  'user/signUp',
  async (user: userModel, { rejectWithValue }) => {

    try {
      const response = await axios
        .post(`${API_URL}/auth-manager/sign-up`, user);
      return response.data.data
    } catch (err: any) {
      const result = err.response ? {
        status: err.response.status,
        message: err.response.message
      } : {
        message: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

const login = createAsyncThunk(
  'user/login',
  async (user: loginModel, { rejectWithValue }) => {

    try {
      const response = await axios
        .post(`${API_URL}/auth-manager/login`, user);
      return response.data.data
    } catch (err: any) {
      const result = err.response ? {
        status: err.response.status,
        message: err.response.message
      } : {
        message: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .delete(`${API_URL}/auth-manager/logout`, {headers});
      return response.data.data
    } catch (err: any) {
      const result = err.response ? {
        status: err.response.status,
        message: err.response.message
      } : {
        message: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(`${API_URL}/auth-manager/forget-password?email=${email}`);
      return response.data
    } catch (err: any) {
      const result = err.response ? {
        status: err.response.status,
        message: err.response.message
      } : {
        message: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

const confirmPassword = createAsyncThunk(
  'user/confirmPassword',
  async (user: confirmPasswordModel, { rejectWithValue }) => {

    try {
      const response = await axios
        .post(`${API_URL}/auth-manager/confirm-forgot-password`, user);
      return response.data
    } catch (err: any) {
      const result = err.response ? {
        status: err.response.status,
        message: err.response.message
      } : {
        message: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

export {signUp, login, logout, forgetPassword, confirmPassword}