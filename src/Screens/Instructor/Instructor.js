import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorPair, unsetInstructorPair } from '../../Components/Redux/Instructors/InstructorsSlice';

function Instructors() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [instructorInput, setInstructorInput] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const subjects = useSelector((state) => state.subjects.filter((subject) => subject.course === selectedCourse && subject.semester === selectedSemester));
  const instructors = useSelector((state) => state.instructors.filter((instructor) => instructor.course === selectedCourse && instructor.semester === selectedSemester));

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.subjects.some(
        (sub) =>
          sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSemesterChange = event => {
    setSelectedSemester(event.target.value);
  };

  const handleSetInstructorPair = () => {
    dispatch(setInstructorPair({ instructor: instructorInput, subject: `${selectedSubject.code} - ${selectedSubject.name}`, course: selectedCourse, semester: selectedSemester }));
    setSelectedSubject(null);
    setInstructorInput('');
  };

  const handleUnsetInstructorPair = (sub) => {
    dispatch(unsetInstructorPair(sub));
  };
  
  const handleUnsetAllInstructorPairs = () => {
    subjects.forEach((subject) => {
      subject.subjects.forEach((sub) => {
        const subjectString = `${sub.code} - ${sub.name}`;
        if (instructors.some((pair) => pair.subject === subjectString)) {
          dispatch(unsetInstructorPair(subjectString));
          setSelectedSubject(sub); // add this line to set the currently removed subject as selectedSubject
        }
      });
    });
  };
  

  const filteredUnpairedSubjects = subjects.filter(
    (subject) =>
      !instructors.some(
        (pair) =>
          `${subject.code} - ${subject.name}` === pair.subject
      )
  );
  
  const unpairedSubjects = filteredUnpairedSubjects.filter(
    (subject) =>
      !instructors.some(
        (pair) =>
          `${subject.code} - ${subject.name}` === pair.subject
      )
  );
  

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>This is the instructors page.</p>
      <label>Course:</label>
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option value={course} key={course}>
            {course}
          </option>
        ))}
      </select>
      <label>Semester:</label>
      <select value={selectedSemester} onChange={handleSemesterChange}>
        <option value="">Select Semester</option>
        <option value="First Semester">First Semester</option>
        <option value="Second Semester">Second Semester</option>
      </select>
      <p>Search Subject.</p>
      <input
        type="text"
        placeholder="Search for a subject"
        value={searchQuery}
        onChange={handleChange}
      />
      {searchQuery.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject, index) =>
              subject.subjects.map((sub, subIndex) => {
                if (
                  sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  sub.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return (
                    <tr key={`${index}-${subIndex}`}>
                      <td>
                        {sub.code} - {sub.name}
                      </td>
                      <td>
                      {instructors.some((pair) => pair.subject === `${sub.code} - ${sub.name}`) ? (
                          <button onClick={() => handleSelectSubject(sub)}>Select</button>
                        ) : (
                          <button onClick={() => handleSelectSubject(sub)}>Select</button>
                        )}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })
            )}
          </tbody>
        </table>
      )}
      {selectedSubject && (
        <div>
          <p>Selected Subject:</p>
          <p>
            {selectedSubject.code} - {selectedSubject.name}
          </p>
          <input type="text"
            placeholder="Enter Instructor Name"
            value={instructorInput}
            onChange={(event) => setInstructorInput(event.target.value)}
          />
          <button onClick={handleSetInstructorPair}>Set Instructor</button>
        </div>
      )}
      <h2>Instructors</h2>
      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((pair, index) => (
            <tr key={index}>
              <td>{pair.instructor}</td>
              <td>{pair.subject}</td>
              <td>
                <button onClick={() => dispatch(unsetInstructorPair(index))}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Unpaired Subjects</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      {unpairedSubjects.map((subject, index) =>
        subject.subjects.map((sub, subIndex) => {
          const subjectString = `${sub.code} - ${sub.name}`;
          if (instructors.some((pair) => pair.subject === subjectString)) {
            return null;
          } else {
            return (
              <tr key={`${index}-${subIndex}`}>
                <td>
                  {subjectString}
                  <button onClick={() => handleSelectSubject(sub)}>Select</button>
                </td>
              </tr>
            );
          }
        })
      )}
    </div>
  );
}

export default Instructors;
