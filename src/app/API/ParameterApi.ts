import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_THEME_API_URL

const fetchParameter = createAsyncThunk(
  'parameter/fetchParameter',
  async (_,{ rejectWithValue }) => {

    try {
      //console.log(CLIENT_URL)
      const response = await axios.get(`${API_URL}/criteria-manager/criteria-list`)
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

const fetchParameterById = createAsyncThunk(
  'parameter/fetchParameterById',
  async (id: string,{ rejectWithValue }) => {

    try {
      const response = await axios.get(`${API_URL}/criteria-manager/criteria-sets-short/${id}`)
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

export {fetchParameter, fetchParameterById}