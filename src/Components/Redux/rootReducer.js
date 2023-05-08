import { combineReducers } from 'redux';
import SubjectsReducer from './Subjects/SubjectsSlice';
import CoursesReducer from './Courses/CoursesSlice';

const rootReducer = combineReducers({
  subjects: SubjectsReducer,
  courses: CoursesReducer,
});

export default rootReducer;
