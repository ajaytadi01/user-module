import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducers";
import UsersListSlice from "./userListReducer";
import formReducer from "./formReducer";

const rootReducers = combineReducers({
  user: userSlice,
  UserList: UsersListSlice,
  form: formReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
