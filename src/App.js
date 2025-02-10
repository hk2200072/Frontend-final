import React from 'react';
import './App.css';
import Registrationform from './Components/Registrationform';
import LoginForm from './Components/LoginForm';
import AddEventForm from './Components/AddEventForm';
import EventsList from './Components/EventsList';

function App() {
  return (
    <div className="App">
      <h1>Event Management</h1>
      <Registrationform />
      <LoginForm />
      <EventsList />
      <AddEventForm />
    </div>
  );
}

export default App;
