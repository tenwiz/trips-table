const express = require("express");
const faker = require("faker");

// define some constants
const PORT = 3001;
const PUBLIC_DIR = "dist";
const TRIP_TYPES = ["AIR", "CAR", "HOTEL", "RAIL"];

// setup the app
const app = express();

// create some routes
app.get("/trips", (req, res) => {
  const trips = [];

  for (let i = 0; i < 1000; i += 1) {
    const trip = {};

    // pick a type
    trip.tripType = TRIP_TYPES[Math.floor(Math.random() * TRIP_TYPES.length)];

    // add general information
    trip.id = faker.random.uuid();
    trip.confirmationNumber = faker.random.alphaNumeric(8).toUpperCase();
    trip.price = faker.finance.amount() * 1;
    trip.vendorName = faker.company.companyName();

    // setup the dates
    trip.fromDateTime = faker.date.future().toISOString();
    trip.toDateTime = faker.date.future().toISOString();

    // setup the locations
    trip.fromLocation = faker.fake(
      "{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}"
    );
    if (trip.tripType !== "HOTEL") {
      trip.toLocation = faker.fake(
        "{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}"
      );
    }

    // add some travelers
    trip.travelers = [];
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j += 1) {
      trip.travelers.push({
        avatar: faker.image.avatar(),
        name: faker.fake("{{name.lastName}}, {{name.firstName}}"),
      });
    }

    trips.push(trip);
  }

  res.status(200).send({ trips });
});

// serve the static directory
app.use(express.static(PUBLIC_DIR));

// start it all
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
