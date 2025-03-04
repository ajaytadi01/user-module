import { createSlice } from "@reduxjs/toolkit";
import { UserSignUpType } from "./types";

const initialState: UserSignUpType = {
  userDetails: [],
};

const userSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    AddToStore(state, action) {
      return { userDetails: [...state.userDetails, action.payload] };
    },
  },
});

export const { AddToStore } = userSlice.actions;
export default userSlice.reducer;
