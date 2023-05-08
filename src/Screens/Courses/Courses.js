import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, removeCourse } from '../../Components/Redux/Courses/CoursesSlice';

function Courses() {
  const [courseInput, setCourseInput] = useState('');
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  const handleInputChange = (e) => {
    setCourseInput(e.target.value);
  };

  const handleAddCourse = () => {
    if (courseInput.trim()) {
      dispatch(addCourse(courseInput));
      setCourseInput('');
    }
  };

  const handleDeleteCourse = (index) => {
    dispatch(removeCourse(index));
  };

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>This is the courses page.</p>
      <input type="text" value={courseInput} onChange={handleInputChange} />
      <button onClick={handleAddCourse}>Add Course</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course}</td>
              <td>
                <button onClick={() => handleDeleteCourse(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
