import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {PostAnswer} from "../model/AnaliseModel";

const API_URL = process.env.REACT_APP_THEME_API_URL

const fetchAnalise = createAsyncThunk(
  'analise/fetchAnalise',
  async (id: string,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/criteria-sets/${id}`);
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

const postAnalise = createAsyncThunk(
  'analise/postAnalise',
  async (quiz: {questions: PostAnswer[]},{ rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${API_URL}/quiz-manager/process-quiz`, quiz);
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

export {fetchAnalise, postAnalise}