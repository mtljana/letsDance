import React from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import { useHistory } from "react-router-dom";
const DanceClassCard = ({
  address,
  name,
  rating,
  userTotalRating,
  place_id,
}) => {
  const history = useHistory();
  return (
    <>
      <Wrapper
        onClick={() => {
          history.push(`/${place_id}`);
        }}
      >
        <p> {name}</p>
        <p>{address}</p>
        <p>number of reviews {userTotalRating}</p>
        <div>
          {rating}
          <StyledRating
            initialValue={rating}
            ratingValue={0}
            size={17}
            allowHover={false}
          />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 70vw;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #7d3737;
  margin: 4rem;
  cursor: pointer;
  p {
    color: white;
    padding: 0.5rem;
  }
  span {
    color: white;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const StyledRating = styled(Rating)`
  display: "inline-block";
  margin-right: 1rem;
  margin-top: 0.5rem;
  pointer-events: none;
`;
export default DanceClassCard;
