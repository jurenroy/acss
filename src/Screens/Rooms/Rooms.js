import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, removeRoom } from '../../Components/Redux/Rooms/RoomsSlice';

function Rooms() {
  const [roomInput, setRoomInput] = useState('');
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);

  const handleInputChange = (e) => {
    setRoomInput(e.target.value);
  };

  const handleAddRoom = () => {
    if (roomInput.trim()) {
      dispatch(addRoom(roomInput));
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
      <input type="text" value={roomInput} onChange={handleInputChange} />
      <button onClick={handleAddRoom}>Add Room</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{room}</td>
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
