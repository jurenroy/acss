import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
  name: 'courses',
  initialState: [],
  reducers: {
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    removeCourse: (state, action) => {
        state.splice(action.payload, 1);
    },
    updateCourse: (state, action) => {
      const courseIndex = state.findIndex((course) => course.id === action.payload.id);
      if (courseIndex !== -1) {
        state[courseIndex] = { ...state[courseIndex], ...action.payload };
      }
    },
  },
});

export const { addCourse, removeCourse, updateCourse } = CourseSlice.actions;

export default CourseSlice.reducer;
