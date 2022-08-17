// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const {
  getDanceClasses,
  getReviews,
  postUser,
  getLocationLatLng,
  postComment,
  getLetsDanceReviews,
  deleteComment,
  LikeClass,
  getLiked,
} = require("./handlers");
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //
  .get("/get-google-reviews/:placeId", getReviews)
  .get("/get-lets-dance-reviews/:placeId", getLetsDanceReviews)
  .get("/get-dance-classes/:lat/:lng", getDanceClasses)
  .get("/get-location/:code", getLocationLatLng)
  .get("/get-liked/:user", getLiked)
  .post("/post-user", postUser)
  .post("/post-comment", postComment)
  .post("/like-class", LikeClass)
  .delete("/delete-comment/:_id", deleteComment)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log("Listening on port 8000"));
