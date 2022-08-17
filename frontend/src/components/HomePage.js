import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import DanceClassCard from "./DanceClassCard";
import { DanceClassContext } from "./DanceClassContext";

const HomePage = () => {
  const { danceclasses, setDanceClasses } = useContext(DanceClassContext);

  const [postalCode, setPostalCode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`/get-location/${postalCode}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`/get-dance-classes/${data.data.lat}/${data.data.lng}`)
          .then((res) => res.json())
          .then((data) => setDanceClasses(data.data));
      });
  };
  return (
    <>
      <StyledForm onSubmit={submitHandler}>
        <label>Search for dance classes near you</label>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            placeholder="postal code"
          />
          <button>Search</button>
        </div>
      </StyledForm>
      <ClassWrapper>
        {danceclasses &&
          danceclasses.map((item) => {
            return (
              <DanceClassCard
                key={item.name}
                address={item.formatted_address}
                name={item.name}
                rating={item.rating}
                userTotalRating={item.user_ratings_total}
                place_id={item.place_id}
              />
            );
          })}
      </ClassWrapper>
    </>
  );
};

const ClassWrapper = styled.div`
  height: 60vh;
  overflow-y: scroll;
  width: 80vw;
  margin: 0rem auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StyledForm = styled.form`
  display: flex;

  width: 80vw;
  margin: 0rem auto;
  padding: 2rem;
  justify-content: center;
  align-items: baseline;
  div {
    display: flex;
  }
  label {
    padding: 2rem;
    margin-bottom: 2rem;
    color: white;
  }
  input {
    width: 20vw;
  }
  button {
    cursor: pointer;
    color: black;
  }
`;
export default HomePage;
