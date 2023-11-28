import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ParameterModel} from "../model/ParameterModel";
import {fetchParameter, fetchParameterById} from "../API/ParameterApi";
import {RootState} from "../store/Store";
import {ErrorData} from "../model/ErrorModel";
import {CriteriaModel} from "../model/CriteriaModel";

const parameterAdapter = createEntityAdapter<ParameterModel>({});

const initialState = parameterAdapter.getInitialState({
  loadingStatus: false,
  selected: [] as string[],
  criteria: {} as CriteriaModel,
  errorData: {} as ErrorData
})

const parameterSlice = createSlice({
  name: 'parameter',
  initialState,
  reducers: {
    parameterAddSelectedItem: (state, action) => {
      if (!!state.selected) state.selected = [...state.selected, action.payload]
      else state.selected = [action.payload]
    },
    parameterDelSelectedItem: (state, action) => {
      if (!!state.selected) state.selected = state.selected.filter((item) => item !== action.payload)
      else state.selected = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParameter.pending, state => {
        state.loadingStatus = true
      })
      .addCase(fetchParameter.fulfilled, (state, action) => {
        state.errorData = {}

        const parameterMap = new Map();
        const rootNodes = new Array<ParameterModel>();

        const ids = new Array<string>()

        action.payload.forEach((parameter: { id: string; }) => {
          parameterMap.set(parameter.id, parameter);
        });

        action.payload.forEach((parameter: ParameterModel) => {
          if (parameter.parentCriteria) {
            const parentParameter = parameterMap.get(parameter.parentCriteria);
            if (parentParameter) {
              if (!parentParameter.children) {
                parentParameter.children = [];
              }
              parameter.level = parentParameter.level + 1;
              parentParameter.children.push(parameter);
            }
          } else {
            parameter.level = 0;
            rootNodes.push(parameter);
          }
          ids.push(parameter.id)
        });
        parameterAdapter.setAll(state, rootNodes)
        state.selected = ids

        state.loadingStatus = false
      })
      .addCase(fetchParameter.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
      })

      .addCase(fetchParameterById.pending, state => {
        state.loadingStatus = true
      })
      .addCase(fetchParameterById.fulfilled, (state, action) => {
        state.errorData = {}

        const {criteriaList, id, name, description} = action.payload;

        state.criteria = {
          id,
          name,
          description
        }

        state.selected = state.selected.filter((item) => criteriaList.some((criteria: {id: string}) => criteria.id === item))

        state.loadingStatus = false
      })
      .addCase(fetchParameterById.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
      })
  }
})

export default parameterSlice.reducer

export const {
  parameterAddSelectedItem,
  parameterDelSelectedItem
} = parameterSlice.actions

export const {
  selectAll: allParameter,
  selectIds
} = parameterAdapter.getSelectors<RootState>((state) => state.parameter);