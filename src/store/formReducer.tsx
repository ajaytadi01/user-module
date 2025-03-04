import { createSlice } from "@reduxjs/toolkit";

export interface dataType {
    id: number;
    firstName: { data: string, isValid: boolean};
    lastName: { data: string, isValid: boolean};
    email: { data: string, isValid: boolean};
    mobileNumber: { data: number |string , isValid: boolean};
    alternateMobileNumber: { data: number |string, isValid: boolean};
    alteranteEmail: { data: string, isValid: boolean};
    department: { data: string, isValid: boolean};
    companyName: { data: string, isValid: boolean};
  }

interface formStateType {
    formDetails:dataType[]
}


const initialState:formStateType = {
  formDetails: [],
};
const formReducer = createSlice({
    name:'form',
    initialState ,
    reducers:{
        addFormData(state,action){
            return { formDetails: [...state.formDetails, action.payload] };
        },
    }

})

export const {addFormData} = formReducer.actions;
export default formReducer.reducer;