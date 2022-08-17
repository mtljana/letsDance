"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const axios = require("axios");

//Connect to the DB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteComment = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("lets-dance");
    const _id = req.params._id;

    const result = await db.collection("comments").deleteOne({ _id });
    res.status(200).json({
      status: 200,
      data: result,
    });
    console.log(result);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! deleting the comments",
    });
  }
};

const postUser = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    console.log("here", req.body);
    await client.connect();
    const db = client.db("lets-dance");
    const exitingUser = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (!exitingUser) {
      await db.collection("users").insertOne(req.body);
      return res.status(200).json({
        status: 200,
        message: "user is saved",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "user already exits",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! saving the user",
    });
  }
};
const postComment = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);

    const commentObj = {
      _id: uuidv4(),
      id: req.body.placeId,
      user: req.body.user,
      comment: req.body.comment,
      name: req.body.name,
      avatar: req.body.avatar,
    };
    await client.connect();
    const db = client.db("lets-dance");

    await db.collection("comments").insertOne(commentObj);
    return res.status(200).json({
      status: 200,
      message: "user  comment is saved",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! saving the user comment",
    });
  }
};
const getDanceClasses = async (req, res) => {
  console.log(req.params);
  const { lat, lng } = req.params;
  try {
    const result = await axios.get(
      lat && lng
        ? `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}&query=danceclass&location=${lat},${lng}`
        : `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_API_KEY}&query=danceclass`
    );

    res.status(200).json({
      status: 200,
      data: result.data.results,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the dance classes",
    });
  }
};
const getReviews = async (req, res) => {
  const place_id = req.params.placeId;
  try {
    const response = await axios.get(`
        https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.GOOGLE_API_KEY}`);

    const reviews = response.data.result.reviews;
    res.status(200).json({
      status: 200,
      data: reviews,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the reviews",
    });
  }
};
const getLetsDanceReviews = async (req, res) => {
  const place_id = req.params.placeId;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    console.log("here", req.body);
    await client.connect();
    const db = client.db("lets-dance");
    const reviews = await db.collection("comments").find().toArray();

    const classReviews = reviews.filter((review) => review.id === place_id);

    res.status(200).json({
      status: 200,
      data: classReviews,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the lets dance reviews",
    });
  }
};
const getLiked = async (req, res) => {
  const user = req.params.user;
  try {
    const client = await new MongoClient(MONGO_URI, options);
    console.log("here", req.body);
    await client.connect();
    const db = client.db("lets-dance");
    const likes = await db.collection("liked").find().toArray();

    const likedClasses = likes.filter((like) => like.user === user);

    res.status(200).json({
      status: 200,
      data: likedClasses,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the liked classes",
    });
  }
};
const getLocationLatLng = async (req, res) => {
  const postalCode = req.params.code;
  try {
    const response = await axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${process.env.GOOGLE_API_KEY}`);

    const location = response.data.results[0].geometry.location;
    res.status(200).json({
      status: 200,
      data: location,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! getting the location",
    });
  }
};

const LikeClass = async (req, res) => {
  try {
    const client = await new MongoClient(MONGO_URI, options);
    console.log("here", req.body);

    const LikeObj = {
      _id: uuidv4(),
      id: req.body.placeId,
      user: req.body.user,
    };
    await client.connect();
    const db = client.db("lets-dance");
    await db.collection("liked").insertOne(LikeObj);
    res.status(200).json({
      status: 200,
      message: "class is liked",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Error! like class",
    });
  }
};

module.exports = {
  deleteComment,
  postUser,
  getDanceClasses,
  getReviews,
  getLocationLatLng,
  postComment,
  getLetsDanceReviews,
  LikeClass,
  getLiked,
};
