import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {AnaliseModel, PostAnswer, setAnaliseModel} from "../model/AnaliseModel";
import {fetchAnalise, postAnalise} from "../API/AnaliseApi";
import {RootState} from "../store/Store";
import {ErrorData} from "../model/ErrorModel";

const analiseAdapter = createEntityAdapter<setAnaliseModel>({

});

const initialState = analiseAdapter.getInitialState({
  loadingStatus: false,
  criteriaList: [] as AnaliseModel[],
  postData: [] as PostAnswer[],
  errorData: {} as ErrorData,
  resultAnalise: {} as any
})

const analiseSlice = createSlice({
  name: 'analise',
  initialState,
  reducers: {
    //analiseSetIdAnalise: (state, action) => {state.idAnalise = action.payload},
    analiseChangePostData: (state, action) => {
      state.postData = state.postData.map((item) => {
        if (item.questionId === action.payload.id) {
          return {
            ...item,
            questionId: item.questionId,
            value: action.payload.value,
            isSkipped: action.payload.isSkipped,
            isSkippedBlock: action.payload.isSkippedBlock
          }
        } else return item
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalise.pending, state => {
        state.loadingStatus = true
        //state.refresh = false
      })
      .addCase(fetchAnalise.fulfilled, (state, action) => {
        state.errorData = {}

        const analiseMap = new Map();
        const rootNodes = new Array<AnaliseModel>();

        const answersArray = new Array<PostAnswer>();

        const {criteriaList} = action.payload

        const findTopLevelCriterionId = (currentCriterion: AnaliseModel): string => {
          if (currentCriterion.parentCriteria) {
            const parentCriterion = analiseMap.get(currentCriterion.parentCriteria);
            if (parentCriterion) {
              return findTopLevelCriterionId(parentCriterion);
            }
          }
          return currentCriterion.id;
        }

        criteriaList.forEach((itemAnalise: { id: string; }) => {
          analiseMap.set(itemAnalise.id, itemAnalise);
        });

        criteriaList.forEach((itemAnalise: AnaliseModel) => {
          if (itemAnalise.parentCriteria) {
            const parentParameter = analiseMap.get(itemAnalise.parentCriteria);
            if (parentParameter) {
              if (!parentParameter.children) {
                parentParameter.children = [];
              }
              itemAnalise.level = parentParameter.level + 1;
              parentParameter.children.push(itemAnalise);
            }
          } else {
            itemAnalise.level = 0;
            rootNodes.push(itemAnalise);
          }
          if (itemAnalise.questions) {
            itemAnalise.questions.forEach((question) => {
              const topLevelCriterionId = findTopLevelCriterionId(itemAnalise);
              answersArray.push({
                questionId: question.id,
                value: null,
                isSkipped: false,
                isSkippedBlock: false,
                topCriteriaId: topLevelCriterionId
              })
            })
          }
        });

        state.criteriaList = rootNodes

        state.postData = answersArray;

        const descriptionAnalise = {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description
        }
        analiseAdapter.removeAll(state)
        analiseAdapter.setOne(state, descriptionAnalise)
        state.loadingStatus = false

      })
      .addCase(fetchAnalise.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false
      })
      .addCase(postAnalise.pending, state => {
        state.loadingStatus = true
      })
      .addCase(postAnalise.fulfilled, (state, action) => {
        state.resultAnalise = action.payload
        state.loadingStatus = false
      })
      .addCase(postAnalise.rejected, (state, action) => {
        state.errorData = action.payload!
        state.loadingStatus = false

      })
  }
})

export default analiseSlice.reducer

export const {
  //analiseSetIdAnalise
  analiseChangePostData
} = analiseSlice.actions

export const {
  selectAll: allAnalise
} = analiseAdapter.getSelectors<RootState>((state) => state.analise);