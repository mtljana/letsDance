import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { DanceClassContext } from "./DanceClassContext";

const UserReviews = ({ placeId }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { newComment, setNewComment } = useContext(DanceClassContext);
  const [comment, setComment] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const commentObj = {
      placeId,
      user: user.email,
      name: user.name,
      avatar: user.picture,
      comment,
    };
    fetch("/post-comment", {
      method: "POST",
      body: JSON.stringify(commentObj),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNewComment(!newComment);
          setComment("");
        }
      });
  };
  return (
    <div>
      <StyledForm onSubmit={submitHandler}>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          cols="30"
          rows="3"
        ></textarea>
        {isAuthenticated ? (
          <button>Submit</button>
        ) : (
          <button disabled={true}>Log in to leave a comment!</button>
        )}
      </StyledForm>
    </div>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  textarea {
    resize: none;
    font-size: 1.4rem;
    margin: 1rem;
    border: 2px solid pink;
    border-radius: 0.5rem;
  }
  button {
    font-size: 2.2rem;
    padding: 1rem;
    color: white;
    background: none;
    border: 2px solid deeppink;
    border-radius: 0.5rem;
    &:hover {
      color: deeppink;
      background: white;
      cursor: pointer;
    }
  }
`;
export default UserReviews;
