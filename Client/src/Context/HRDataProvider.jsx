import { createContext, useEffect, useState } from "react";

export const HRDataContext = createContext(null);

const HRDataProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = sessionStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : []; // Fixed the issue
  });

  useEffect(() => {
    sessionStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <HRDataContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {children}
    </HRDataContext.Provider>
  );
};

export default HRDataProvider;
