import { createSlice } from '@reduxjs/toolkit';

const InstructorsSlice = createSlice({
  name: 'instructors',
  initialState: [],
  reducers: {
    setInstructorPair: (state, action) => {
      state.push(action.payload);
    },
    unsetInstructorPair: (state, action) => {
        state.splice(action.payload, 1);
      },    
  },
});

export const { setInstructorPair, unsetInstructorPair } = InstructorsSlice.actions;

export default InstructorsSlice.reducer;
