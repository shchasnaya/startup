import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {CriteriaModel, postCriteriaModel} from "../model/CriteriaModel";

const API_URL = process.env.REACT_APP_THEME_API_URL

const fetchCriteria = createAsyncThunk(
  'criteria/fetchCriteria',
  async (_,{ rejectWithValue }) => {

    try {
      const response = await axios.get(`${API_URL}/criteria-manager/criteria-sets`)
      return response.data.data
    } catch (err: any) {

      const result = err.response ? {
        status: err.response.status,
        statusText: err.response.statusText
      } : {
        statusText: 'Something went wrong'
      }
      return rejectWithValue(result)
    }
  }
)

const postCriteria = createAsyncThunk(
  'criteria/postCriteria',
  async (criteria: postCriteriaModel,{ rejectWithValue }) => {
    console.log('test')
    try {
      const response = await axios.post(`${API_URL}/criteria-manager`, criteria)
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

const putCriteria = createAsyncThunk(
  'criteria/putCriteria',
  async (criteria: postCriteriaModel,{ rejectWithValue }) => {

    try {
      const response = await axios.put(`${API_URL}/criteria-manager`, criteria)
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

export {fetchCriteria, postCriteria, putCriteria}