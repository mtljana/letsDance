import { useState, useEffect, useContext } from "react";
import { FlightContext } from "../FlightContext";

import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const { reservation } = useContext(FlightContext);
  const [confirmedReservation, setConfimedReservation] = useState(reservation);
  useEffect(() => {
    const LocalReservation = JSON.parse(localStorage.getItem("reservation"));
    setConfimedReservation(LocalReservation);
  }, []);
  return confirmedReservation ? (
    <Wrapper>
      <h2>Your flight is booked</h2>
      <Card>
        <p>
          Reservation#: <span>{confirmedReservation.id}</span>
        </p>
        <p>
          Flight: <span>{confirmedReservation.flight}</span>
        </p>
        <p>
          Seat: <span>{confirmedReservation.seat}</span>
        </p>
        <p>
          Name:
          <span>
            {confirmedReservation.givenName +
              " " +
              confirmedReservation.surname}
          </span>
        </p>
        <p>
          email:
          <span>{confirmedReservation.email}</span>
        </p>
      </Card>
      <Image src={tombstone} />
    </Wrapper>
  ) : (
    <h1>You dont have any reservation</h1>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 100px;
`;
const Card = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  border: 2px solid var(--color-alabama-crimson);
  margin: 1rem;
  p {
    padding: 1rem;
  }
  span {
    padding-left: 1rem;
  }
`;

export default Confirmation;
