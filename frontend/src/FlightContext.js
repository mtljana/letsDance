import { createContext, useState } from "react";

export const FlightContext = createContext();

export const FlightContextProvider = ({ children }) => {
  const [name, setName] = useState("jana");
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reservation, setReservation] = useState({});

  return (
    <FlightContext.Provider
      value={{
        name,
        setName,
        flights,
        setFlights,
        selectedFlight,
        setSelectedFlight,
        selectedSeat,
        setSelectedSeat,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        reservation,
        setReservation,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
