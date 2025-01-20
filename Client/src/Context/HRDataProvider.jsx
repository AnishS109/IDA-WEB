import { createContext, useEffect, useState } from "react";

export const HRDataContext = createContext(null);

const HRDataProvider = ({ children }) => {

  // -------------------------------------------------------------------------------------
  
  const [events, setEvents] = useState(() => {
    const savedEvents = sessionStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : []; // Fixed the issue
  });
  
  useEffect(() => {
    sessionStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // -------------------------------------------------------------------------------------

  const [eventsLenght, setEventsLenght] = useState(() => {
    const savedEvents = sessionStorage.getItem("eventsLenght");
    return savedEvents ? JSON.parse(savedEvents) : []; // Fixed the issue
  });

  useEffect(() => {
    sessionStorage.setItem("eventsLenght", JSON.stringify(eventsLenght));
  }, [eventsLenght]);

  // -------------------------------------------------------------------------------------

  return (
    <HRDataContext.Provider
      value={{
        events,
        setEvents,
        eventsLenght,
        setEventsLenght
      }}
    >
      {children}
    </HRDataContext.Provider>
  );
};

export default HRDataProvider;
