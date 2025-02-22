import { createSlice } from "@reduxjs/toolkit";
import { usersListType } from "./types";

const initialStateForUserList: usersListType = {
  usersList: [],
};

const UsersListSlice = createSlice({
  name: "UsersListSlice",
  initialState: initialStateForUserList,
  reducers: {
    getDataFromAPI(state, action) {
      return { usersList: [...state.usersList, ...action.payload] };
    },
  },
});

export const { getDataFromAPI } = UsersListSlice.actions;
export default UsersListSlice.reducer;
