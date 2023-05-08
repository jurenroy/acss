import { combineReducers } from 'redux';
import SubjectsReducer from './Subjects/SubjectsSlice';
import CoursesReducer from './Courses/CoursesSlice';
import RoomsReducer from './Rooms/RoomsSlice';

const rootReducer = combineReducers({
  subjects: SubjectsReducer,
  courses: CoursesReducer,
  rooms: RoomsReducer,
});

export default rootReducer;
