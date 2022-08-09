import React, { useContext } from "react";
import { FlightContext } from "../../FlightContext";
import ReservationForm from "../ReservationForm";
import Plane from "./Plane";
import styled from "styled-components";

const SeatSelect = ({}) => {
  const { flights, setSelectedFlight } = useContext(FlightContext);

  const handleSelectedFlight = (e) => {
    setSelectedFlight(e.target.value);
  };
  return (
    <>
      <h2>Select your seat and Provide your information! </h2>
      <div>
        <select name="" id="" onChange={handleSelectedFlight}>
          <option value="null">Select a flight</option>
          {flights.map((flight) => {
            return <option value={flight.flight}>{flight.flight}</option>;
          })}
        </select>
      </div>
      <Wrapper>
        <Plane />
        <ReservationForm />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default SeatSelect;
