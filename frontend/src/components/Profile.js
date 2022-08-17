import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { DanceClassContext } from "./DanceClassContext";
import DanceClassCard from "./DanceClassCard";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [likedClasses, setLikedClasses] = useState();
  const [loading, setLoading] = useState(true);
  const { danceclasses } = useContext(DanceClassContext);

  useEffect(() => {
    if (isAuthenticated)
      fetch("/post-user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated)
      fetch(`/get-liked/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setLikedClasses(data.data);
          setLoading(false);
        });
  }, [isAuthenticated]);

  const userLikedClasses = [];
  if (danceclasses && likedClasses) {
    for (let i = 0; i < danceclasses.length; i++) {
      for (let j = 0; j < likedClasses.length; j++) {
        if (danceclasses[i].place_id === likedClasses[j].id) {
          userLikedClasses.push(danceclasses[i]);
        }
      }
    }
  }
  if (isAuthenticated)
    return (
      <>
        <Wrapper>
          <p>Hi {user.name}</p>
          <img src={user.picture} alt="user-profile" />
        </Wrapper>
        <LikedClasses>
          <h2>Liked classes</h2>
          {loading && <Spinner />}

          <ClassWrapper>
            {userLikedClasses && !loading
              ? userLikedClasses.map((item) => {
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
                })
              : !loading && <h1>You dont have any liked classes</h1>}
          </ClassWrapper>
        </LikedClasses>
      </>
    );
  return <div></div>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 1rem;
  img {
    border-radius: 50%;
    margin-left: 2rem;
  }
`;
const ClassWrapper = styled.div`
  height: 60vh;
  overflow-y: scroll;
  width: 80vw;
  margin: 0rem auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const LikedClasses = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  padding: 1rem;
  h2 {
    color: white;
  }
`;
const Spinner = styled.div`
  border: 7px solid pink;
  border-top: 7px deeppink solid;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  animation: spin 1s linear infinite;
  margin: 0rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Profile;
