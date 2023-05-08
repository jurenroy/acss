import { createSlice } from '@reduxjs/toolkit';

const SubjectsSlice = createSlice({
  name: 'subjects',
  initialState: [],
  reducers: {
    addSubject: (state, action) => {
        const { index, code, name } = action.payload;
        const subjectToUpdate = state[index];
        subjectToUpdate.subjects.push({ code, name });
      },          
      removeSubject: (state, action) => {
        const { courseIndex, subjectIndex } = action.payload;
        const courseToUpdate = state[courseIndex];
        if (courseToUpdate && courseToUpdate.subjects) {
          courseToUpdate.subjects.splice(subjectIndex, 1);
        }
    },
                
      
    addTable: (state, action) => {
        const { course, year, semester } = action.payload;
        const existingTable = state.find(table => table.course === course && table.year === year && table.semester === semester);
        if (existingTable) {
          return state;
        }
        state.push({
          course,
          year,
          semester,
          subjects: []
        });
      },
      updateTable: (state, action) => {
        const { course, year, semester, subjects } = action.payload;
        const tableIndex = state.findIndex(table => table.course === course && table.year === year && table.semester === semester);
        if (tableIndex !== -1) {
          state[tableIndex].subjects = subjects;
        }
      },
      removeTable: (state, action) => {
        const { course, year, semester } = action.payload;
        const tableIndex = state.findIndex(table => table.course === course && table.year === year && table.semester === semester);
        if (tableIndex !== -1) {
          state.splice(tableIndex, 1);
        }
      }
  },
});

export const { addSubject, removeSubject,addTable, updateTable, removeTable} = SubjectsSlice.actions;

export default SubjectsSlice.reducer;
