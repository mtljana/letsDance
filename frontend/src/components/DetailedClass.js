import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import UserReviews from "./UserReviews";
import { DanceClassContext } from "./DanceClassContext";
import { useAuth0 } from "@auth0/auth0-react";
import LikeClass from "./LikeClass";
const DetailedClass = () => {
  const [reviews, setReviews] = useState();
  const [letsDancereviews, setLetsDanceReviews] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const { placeId } = useParams();
  const { newComment, setNewComment } = useContext(DanceClassContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    fetch(`/get-google-reviews/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setReviews(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/get-lets-dance-reviews/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading2(false);
        setLetsDanceReviews(data.data);
      });
  }, [newComment]);

  const onClickHandler = (_id) => {
    fetch(`/delete-comment/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setNewComment(!newComment);
        }
      });
  };

  return (
    <MainWrapper>
      <Wrapper>
        <StyledIframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA97OJKZmPEBzQc0H8OP-Qxs7PDy5ccf5U&q=place_id:${placeId}&language=en`}
        ></StyledIframe>
        <ReviewWrapper>
          <h2>Google Reviews</h2>
          {loading && <Spinner />}

          {reviews && !loading
            ? reviews.map((review) => (
                <ul key={review.author_name}>
                  <StyledReviewDetails>
                    <StyledReviewerInfo>
                      <div>
                        <img src={review.profile_photo_url} />
                      </div>
                      <h2>{review.author_name}</h2>
                    </StyledReviewerInfo>
                    <h4>{review.relative_time_description}</h4>
                    <StyledStarts
                      initialValue={review.rating}
                      ratingValue={0}
                      size={17}
                      allowHover={false}
                    />

                    <StyledTypographyReviewText>
                      {review.text}
                    </StyledTypographyReviewText>
                  </StyledReviewDetails>
                </ul>
              ))
            : !loading && <h1>Google reviews not availabe</h1>}
        </ReviewWrapper>
        <ReviewWrapper>
          <h2>LetsDance Reviews</h2>

          {loading2 && <Spinner />}

          {letsDancereviews && !loading2
            ? letsDancereviews.map((review) => (
                <ul key={review.name}>
                  <StyledLetsDanceReviewDetails>
                    <StyledReviewerInfo>
                      <div>
                        <img src={review.avatar} />
                      </div>
                      <h2>{review.name}</h2>
                    </StyledReviewerInfo>

                    <StyledTypographyReviewText>
                      {review.comment}
                    </StyledTypographyReviewText>
                    {isAuthenticated && user.email === review.user && (
                      <button
                        onClick={() => {
                          onClickHandler(review._id);
                        }}
                      >
                        Delete commnet
                      </button>
                    )}
                  </StyledLetsDanceReviewDetails>
                </ul>
              ))
            : !loading2 && <h1>Lets Dance reviews not availabe</h1>}
        </ReviewWrapper>
      </Wrapper>
      <PostReview>
        <UserReviews placeId={placeId} />
        <LikeClass placeId={placeId} />
      </PostReview>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  overflow-y: scroll;
  position: relative;
  padding-bottom: 5rem;
  h2 {
    color: black;
  }
`;
const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  position: relative;
  h2 {
    color: black;
  }
`;
const ReviewWrapper = styled.div`
  width: 50vw;
  padding: 1rem;
  height: 35vh;
  overflow-y: scroll;
`;
const PostReview = styled.div`
  width: 100vw;
  /* padding-top: 1rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  right: 0;
  width: 50vw;
  height: 70vh;

  border-radius: 5%;
  padding: 2rem;
  margin-right: 2rem;
`;

const StyledReviewDetails = styled.li`
  margin-bottom: 2rem;
  padding: 1rem;
  margin: 0;
`;
const StyledLetsDanceReviewDetails = styled.li`
  margin-bottom: 2rem;
  padding: 1rem;
  margin: 0;
  img {
    width: 60px;
    border-radius: 50%;
  }
  h2 {
    font-size: 1.1rem;
  }
  button {
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

const StyledStarts = styled(Rating)`
  display: inline-block;
  width: auto;
  padding: 0;
  margin-right: 1rem;
  margin-top: 0.4rem;
  pointer-events: none;
`;

const StyledReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledTypographyReviewText = styled.h2`
  margin-top: 0rem;
  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
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

export default DetailedClass;
