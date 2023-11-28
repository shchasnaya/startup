import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {CriteriaModel} from "../model/CriteriaModel";
import {fetchCriteria, postCriteria, putCriteria} from "../API/CriteriaAPI";
import {RootState} from "../store/Store";
import {ErrorData} from "../model/ErrorModel";
import {string} from "yup";

const criteriaAdapter = createEntityAdapter<CriteriaModel>({
  //selectId: (criteria) => criteria.id,
});

const initialState = criteriaAdapter.getInitialState({
  loadingStatus: false,
  idCriteria: '',
  analise: [],
  errorData: {} as ErrorData,
  status: '',
  action: ''
})

const criteriaSlice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    criteriaSetIdCriteria: (state, action) => {state.idCriteria = action.payload},
    criteriaSetAction: (state, action) => {state.action = action.payload},
    criteriaSetStatus: (state, action) => {state.status = action.payload},
    criteriaCleanState: (state) => {
      state.idCriteria = ''
      state.action = ''
      state.status = ''
      localStorage.setItem('status', '');
      localStorage.setItem('idCriteria', '');
      localStorage.setItem('actionSet', '')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCriteria.pending, state => {
        state.loadingStatus = true
        //state.refresh = false
      })
      .addCase(fetchCriteria.fulfilled, (state, action) => {
        state.loadingStatus = false
        state.errorData = {}
        criteriaAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCriteria.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
      })

      .addCase(postCriteria.pending, state => {
        state.loadingStatus = true
        state.status = 'none'
      })
      .addCase(postCriteria.fulfilled, (state, action) => {
        state.loadingStatus = false
        state.status = 'isCreate'
      })
      .addCase(postCriteria.rejected, (state, action) => {
        state.errorData = action.payload!
        state.status = 'none'
        state.loadingStatus = false
      })

      .addCase(putCriteria.pending, state => {
        state.loadingStatus = true
        state.status = 'none'
      })
      .addCase(putCriteria.fulfilled, (state, action) => {
        state.loadingStatus = false
        state.status = 'isUpdate'
      })
      .addCase(putCriteria.rejected, (state, action) => {
        state.errorData = action.payload!
        state.status = 'none'
        state.loadingStatus = false
      })
  }
})

export default criteriaSlice.reducer

export const {
  criteriaSetIdCriteria,
  criteriaSetAction,
  criteriaSetStatus,
  criteriaCleanState
} = criteriaSlice.actions

export const {
  selectAll: allCriteria
} = criteriaAdapter.getSelectors<RootState>((state) => state.criteria);