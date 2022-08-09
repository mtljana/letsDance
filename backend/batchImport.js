const { MongoClient } = require("mongodb");

require("dotenv").config({ path: "./.env" });

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { flights, reservations } = require("./data.js");

const batchImport = async () => {
  const flightName = Object.keys(flights);
  const flightSeats = Object.values(flights);

  const allFlights = [];
  flightName.forEach((flight, index) => {
    allFlights.push({
      flight,
      seats: flightSeats[index],
    });
  });

  const reservationsData = [];
  reservations.forEach((reservation) => {
    reservationsData.push({
      _id: reservation.id,
      flight: reservation.flight,
      seat: reservation.seat,
      givenName: reservation.givenName,
      surname: reservation.surname,
      email: reservation.email,
    });
  });
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("slingair");

  await db.collection("reservations").insertMany(reservations);
  await db.collection("flights").insertMany(allFlights);

  console.log("connected!");

  client.close();
  console.log("disconnected!");
};

batchImport();
