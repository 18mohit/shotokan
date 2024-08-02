import { createSlice } from '@reduxjs/toolkit';

const blackStuSclice = createSlice({
    name : "blackStu",
    initialState : {
         allBlackStu : [],
    },
    reducers: {
        setAllBlackStu: (state, action) => {
            state.allBlackStu = action.payload;
        }
    }
});
export const { setAllBlackStu } = blackStuSclice.actions; 
export default blackStuSclice.reducer;