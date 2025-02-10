import React, { useState, useEffect } from 'react';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [applicants, setApplicants] = useState({});

  const getAllEvents = () => {
    fetch('http://localhost:555/events', {
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch events');
          return [];
        }
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const getMyEvents = () => {
    fetch('http://localhost:555/myevents', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setMyEvents(data))
      .catch(error => console.error('Error fetching my events:', error));
  };

  const getApplicants = () => {
    if (isAdmin) {
      fetch('http://localhost:555/applicants', {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => setApplicants(data))
        .catch(error => console.error('Error fetching applicants:', error));
    }
  };

  const applyForEvent = (eventId) => {
    fetch('http://localhost:555/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          alert('Successfully applied for event!');
        } else {
          alert('Failed to apply for event');
        }
      })
      .catch(error => console.error('Error applying for event:', error));
  };

  useEffect(() => {
    fetch('http://localhost:555/checkadmin', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(error => console.error('Error checking admin status:', error));
  }, []);

  useEffect(() => {
    if (isAdmin) {
      getApplicants();
    }
  }, [isAdmin]);

  const refreshEvents = () => {
    getAllEvents();
    getMyEvents();
  };

  return (
    <div className="form-section">
      <h3>Available Events</h3>
      <button onClick={refreshEvents}>Refresh Events</button>
      <ul>
        {events.map((event) => (
          <li key={event.ID}>
            {event.NAME} at {event.VENUE} on {event.DATE} (Available Slots: {event.QUANTITY})
            {!isAdmin && event.QUANTITY > 0 && !myEvents.find(e => e.ID === event.ID) && (
              <button onClick={() => applyForEvent(event.ID)}>Apply</button>
            )}
          </li>
        ))}
      </ul>

      {!isAdmin && (
        <div>
          <h3>My Events</h3>
          <ul>
            {myEvents.map((event) => (
              <li key={event.ID}>
                {event.NAME} at {event.VENUE} on {event.DATE}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAdmin && (
        <div>
          <h3>Event Applicants</h3>
          {Object.entries(applicants).map(([eventName, users]) => (
            <div key={eventName}>
              <h4>{eventName}</h4>
              <ul>
                {users.map(user => (
                  <li key={user.ID}>{user.NAME} ({user.EMAIL})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;