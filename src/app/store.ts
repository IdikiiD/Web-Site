import { ThunkAction, Action, createStore, combineReducers } from "@reduxjs/toolkit";
import { homeReducer, initialHomeViewState } from "app/presentation/home/HomeReducer";

export const store = createStore(combineReducers({homeViewState:homeReducer}),{ homeViewState: initialHomeViewState});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
