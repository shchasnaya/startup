import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import criteriaReducer from "../slice/CriteriaSlice";
import parameterReducer from "../slice/ParameterSlice";
import analiseReducer from "../slice/AnaliseSlice";
import userReducer from "../slice/UserSlice";

export const store = configureStore({
  reducer: {
    criteria: criteriaReducer,
    parameter: parameterReducer,
    analise: analiseReducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;