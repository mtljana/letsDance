import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LikeClass = ({ placeId }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const LikeObj = {
    placeId,
    user: isAuthenticated && user.email,
  };
  const clickHandler = () => {
    fetch("/like-class", {
      method: "POST",
      body: JSON.stringify(LikeObj),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.alert("Liked!");
        }
      });
  };
  return <StyledLikeButton onClick={clickHandler}>Like!</StyledLikeButton>;
};

const StyledLikeButton = styled.button`
  font-size: 2.2rem;
  padding: 1rem;
  color: white;
  background: none;
  border: 2px solid deeppink;
  border-radius: 0.5rem;
  margin-left: 1rem;
  &:hover {
    color: deeppink;
    background: white;
    cursor: pointer;
  }
`;
export default LikeClass;
