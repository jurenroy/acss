import { createSlice } from '@reduxjs/toolkit';

const RoomsSlice = createSlice({
  name: 'rooms',
  initialState: [],
  reducers: {
    addRoom: (state, action) => {
      state.push(action.payload);
    },
    removeRoom: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addRoom, removeRoom } = RoomsSlice.actions;

export default RoomsSlice.reducer;
