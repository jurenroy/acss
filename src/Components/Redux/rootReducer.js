import { combineReducers } from 'redux';
import SubjectsReducer from './Subjects/SubjectsSlice';
import CoursesReducer from './Courses/CoursesSlice';
import RoomsReducer from './Rooms/RoomsSlice';
import InstructorsReducer from './Instructors/InstructorsSlice';

const rootReducer = combineReducers({
  subjects: SubjectsReducer,
  courses: CoursesReducer,
  rooms: RoomsReducer,
  instructors: InstructorsReducer,
});

export default rootReducer;
