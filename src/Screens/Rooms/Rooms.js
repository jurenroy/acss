import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, removeRoom } from '../../Components/Redux/Rooms/RoomsSlice';

function Rooms() {
  const [roomInput, setRoomInput] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses);
  const rooms = useSelector((state) => state.rooms.filter((room) => room.course === selectedCourse));

  const handleInputChange = (e) => {
    setRoomInput(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleAddRoom = () => {
    if (!roomInput.trim() || !selectedCourse) {
      alert("Please select a course and enter a room name.");
      return;
    }
  
    const roomExists = rooms.some(
      (room) => room.name === roomInput && room.course === selectedCourse
    );
  
    if (roomExists) {
      alert(`A room for ${selectedCourse} with the name ${roomInput} already exists!`);
    } else {
      dispatch(addRoom({ name: roomInput, course: selectedCourse }));
      setRoomInput('');
    }
  };  
  

  const handleDeleteRoom = (index) => {
    dispatch(removeRoom(index));
  };
  

  return (
    <div>
      <h1>Welcome to my website!</h1>
      <p>This is the rooms page.</p>
      <label>Course:</label>
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option value={course} key={course}>
            {course}
          </option>
        ))}
      </select>
      <input type="text" value={roomInput} onChange={handleInputChange} />
      <button onClick={handleAddRoom}>Add Room</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.course}</td>
              <td>
                <button onClick={() => handleDeleteRoom(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
