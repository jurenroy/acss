import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject, removeSubject, addTable, updateTable, removeTable } from '../../Components/Redux/Subjects/SubjectsSlice';

function Subjects() {
  const subjects = useSelector(state => state.subjects);
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [subjectCodeInput, setSubjectCodeInput] = useState('');
  const [subjectNameInput, setSubjectNameInput] = useState('');
  
  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
    setSelectedYear('');
    setSelectedSemester('');
  };

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
    setSelectedSemester('');
  };

  const handleSemesterChange = event => {
    setSelectedSemester(event.target.value);
  };

  const handleDeleteSubject = (index) => {
    dispatch(removeSubject(index));
  }

  const matchingTable = subjects.find(
    subject =>
    subject.course === selectedCourse &&
    subject.year === selectedYear &&
    subject.semester === selectedSemester
  );

  const createTable = () => {
    dispatch(addTable({ course: selectedCourse, year: selectedYear, semester: selectedSemester, subjects: [] }));
  }

  const updateTableSubjects = (subjects) => {
    dispatch(updateTable({ course: selectedCourse, year: selectedYear, semester: selectedSemester, subjects }));
  }

  const removeTableSubjects = () => {
    dispatch(removeTable({ course: selectedCourse, year: selectedYear, semester: selectedSemester }));
  }

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>This is the subjects page.</p>
      <div>
        <label>Course:</label>
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option value={course} key={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      {selectedCourse && (
        <>
          <div>
            <label>Year:</label>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
            </select>
          </div>
          {selectedYear && (
            <div>
              <label>Semester:</label>
              <select value={selectedSemester} onChange={handleSemesterChange}>
                <option value="">Select Semester</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
              </select>
            </div>
          )}

          <button onClick={createTable}>Create Table</button>
          <br></br>
          {selectedSemester && (
  <>
    <table>
      <tbody>
        {subjects.filter(subject => subject.course === selectedCourse && subject.year === selectedYear && subject.semester === selectedSemester).map((subject, index) => (
          <tr key={index}>
            <td>{subject.course}</td>
            <td>{subject.year} - </td>
            <td>{subject.semester}</td>
          </tr>
        ))}
      </tbody>
      

      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" value={subjectCodeInput} onChange={e => setSubjectCodeInput(e.target.value)} placeholder="Subject Code" />
          </td>
          <td>
            <input type="text" value={subjectNameInput} onChange={e => setSubjectNameInput(e.target.value)} placeholder="Subject Name" />
          </td>
          <td>
            <button onClick={() => dispatch(addSubject({ code: subjectCodeInput, name: subjectNameInput }))}>
              Add Subject
            </button>
          </td>
        </tr>
        {subjects.filter(subject => subject.course === selectedCourse && subject.year === selectedYear && subject.semester === selectedSemester).map((subject, index) => (
          <tr key={index}>
            <td>{subject.code}</td>
            <td>{subject.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

        </>
      )}
    </div>
  );
}

export default Subjects;
