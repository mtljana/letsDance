"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this data. Changes will persist until the server (backend) restarts.
// const { flights, reservations } = require("./data");

// returns a list of all flights
const getFlights = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("slingair");
  const result = await db.collection("flights").find().toArray();

  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

  client.close();
};

// returns all the seats on a specified flight
const getFlight = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  const flight = req.params.flight;
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("slingair");
  const result = await db.collection("flights").findOne({ flight });
  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

  client.close();
};

// returns all reservations
const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("slingair");
  const result = await db.collection("reservations").find().toArray();
  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

  client.close();
};

// returns a single reservation
const getSingleReservation = async (req, res) => {
  const id = req.params.reservation;
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  await client.connect();

  // connect to the database (db name is provided as an argument to the function)
  const db = client.db("slingair");
  const result = await db.collection("reservations").findOne({ id });
  result
    ? res.status(200).json({ status: 200, data: result })
    : res.status(404).json({ status: 404, data: "Not Found" });

  client.close();
};

// creates a new reservation
const addReservation = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const client = new MongoClient(MONGO_URI, options);
    // connect to the client

    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("slingair");
    const flight = await db
      .collection("flights")
      .findOne({ flight: req.body.flight });

    flight.seats.forEach((seat) => {
      if (seat.isAvailable && seat.id === req.body.seat) {
        seat.isAvailable = false;
      }
    });

    const newSeats = { $set: { seats: flight.seats } };
    await db
      .collection("flights")
      .updateOne({ flight: req.body.flight }, newSeats);
    await db.collection("reservations").insertOne(req.body);
    res
      .status(200)
      .json({ status: 200, data: req.body, message: "reservation added" });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "could not add reservation",
    });
  }
};

// updates an existing reservation
const updateReservation = async (req, res) => {
  try {
    const { id, flight, seat, givenName, surname, email } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    // connect to the client

    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("slingair");
    const existingReservation = await db
      .collection("reservations")
      .findOne({ id });
    const exitingFlight = await db.collection("flights").findOne({ flight });

    exitingFlight.seats.forEach((seat) => {
      if (seat.isAvailable && seat.id === req.body.seat) {
        seat.isAvailable = false;
      }
      if (existingReservation.seat === seat.id) {
        seat.isAvailable = true;
      }
    });
    const newSeats = { $set: { seats: exitingFlight.seats } };
    await db.collection("flights").updateOne({ flight }, newSeats);
    db.collection("reservations").updateOne(
      { id },
      { $set: { flight, seat, givenName, surname, email } }
    );
    res.status(201).json({ status: 201, message: "reservation updated" });
  } catch (err) {
    res.status(400).json({ status: 400, message: "reservation not updated" });
  }
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
  const id = req.params.reservation;
  try {
    const client = new MongoClient(MONGO_URI, options);
    // connect to the client

    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("slingair");
    const oldReservation = await db.collection("reservations").findOne({ id });
    const exitingFlight = await db
      .collection("flights")
      .findOne({ flight: oldReservation.flight });

    exitingFlight.seats.forEach((seat) => {
      if (oldReservation.seat === seat.id) {
        seat.isAvailable = true;
      }
    });

    const newSeats = { $set: { seats: exitingFlight.seats } };
    await db
      .collection("flights")
      .updateOne({ flight: oldReservation.flight }, newSeats);
    const deleteReservation = await db
      .collection("reservations")
      .deleteOne({ id }, (err, result) => {
        result
          ? res
              .status(200)
              .json({ status: 200, message: "reservation deleted" })
          : res
              .status(400)
              .json({ status: 400, message: "reservation not found" });
      });
  } catch (err) {
    res.status(400).json({ status: 400, message: "reservation not deleted" });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
