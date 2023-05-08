import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './Components/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './Screens/Home/Home';
import Subjects from './Screens/Subjects/Subjects';
import Courses from './Screens/Courses/Courses';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/subjects" element={<Subjects/>} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
