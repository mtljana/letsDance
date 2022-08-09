import React, { useEffect, useState } from "react";
import tombstone from "../assets/tombstone.png";
import styled from "styled-components";
const ViewReservation = () => {
  const [oldReservation, setOldReservation] = useState({});
  const reservation = JSON.parse(localStorage.getItem("reservation"));

  useEffect(() => {
    fetch(`/api/get-reservation/${reservation.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOldReservation(data.data);
      });
  }, []);
  return (
    <div>
      {oldReservation ? (
        <Wrapper>
          <h2>Your Reservation</h2>
          <Card>
            <p>
              Reservation#: <span>{reservation.id}</span>
            </p>
            <p>
              Flight: <span>{reservation.flight}</span>
            </p>
            <p>
              Seat: <span>{reservation.seat}</span>
            </p>
            <p>
              Name:{" "}
              <span>{reservation.givenName + " " + reservation.surname}</span>
            </p>
            <p>
              email:
              <span>{reservation.email}</span>
            </p>
          </Card>
          <Image src={tombstone} />
        </Wrapper>
      ) : (
        <div>Loading please wait</div>
      )}
    </div>
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
export default ViewReservation;
