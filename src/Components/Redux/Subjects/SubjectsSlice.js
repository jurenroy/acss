import { createSlice } from '@reduxjs/toolkit';

const SubjectsSlice = createSlice({
  name: 'subjects',
  initialState: [],
  reducers: {
    addSubject: (state, action) => {
        const { subject, course, year, semester } = action.payload;
        const table = state.find(table => table.course === course && table.year === year && table.semester === semester);
        if (!table) {
          return state;
        }
        if (!table.subjects) {
          table.subjects = [];
          state.splice(state.indexOf(table), 1, table); // update the state with the updated table object
        }
        table.subjects.push(subject);
      },
      
      removeSubject: (state, action) => {
        const { tableIndex, subject } = action.payload;
        const table = state[tableIndex];
        if (!table || !table.subjects) {
          return state;
        }
        const subjectIndex = table.subjects.findIndex(s => s === subject);
        if (subjectIndex !== -1) {
          table.subjects.splice(subjectIndex, 1);
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
