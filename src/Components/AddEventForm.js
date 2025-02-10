import React, { useState } from 'react';

const AddEventForm = () => {
  const [venue, setVenue] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState(''); 

  const addEvent = () => {
    fetch('http://localhost:555/events/addevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({venue, name, date, quantity }), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add event. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Event added successfully');
      alert('Event added successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };

  return (
    <div className="form-section">
      <h3>Add Event (Admin)</h3>
      <form>
        <input 
          type="text" 
          placeholder="Venue" 
          value={venue} 
          onChange={(e) => setVenue(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Event Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        /><br />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        /><br />
        <input 
          type="number" 
          placeholder="Tickets Available" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        /><br />
        <button type="button" onClick={addEvent}>Add Event</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddEventForm;