import { createSlice } from '@reduxjs/toolkit';

const SubjectsSlice = createSlice({
  name: 'subjects',
  initialState: [],
  reducers: {
    addSubject: (state, action) => {
        const { tableIndex, subject } = action.payload;
        state[tableIndex].subjects.push(subject);
    },
    removeSubject: (state, action) => {
        const { tableIndex, subject } = action.payload;
        state[tableIndex].subjects.push(subject);
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
