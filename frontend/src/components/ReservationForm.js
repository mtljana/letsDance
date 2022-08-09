import React, { useContext } from "react";
import styled from "styled-components";
import { FlightContext } from "../FlightContext";
import { useHistory } from "react-router-dom";
const { v4: uuidv4 } = require("uuid");

const ReservationForm = () => {
  const {
    setFirstName,
    firstName,
    lastName,
    email,
    setLastName,
    setEmail,
    selectedFlight,
    selectedSeat,

    setReservation,
  } = useContext(FlightContext);
  const history = useHistory();

  const newReservation = {
    id: uuidv4(),
    flight: selectedFlight,
    seat: selectedSeat,
    givenName: firstName,
    surname: lastName,
    email,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    fetch("/api/add-reservation", {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setReservation(newReservation);
          history.push("/confirmed");
          localStorage.setItem("reservation", JSON.stringify(newReservation));
        }
      });
  };
  return (
    <Wrapper>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {Object.values(newReservation).includes("") ? (
          <button disabled>Confirm</button>
        ) : (
          <button>Confirm</button>
        )}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem;
  border: 2px solid red;
  input {
    margin: 0.4rem 0rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  button {
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
export default ReservationForm;
