// const { fetchMyIP } = require('./iss_promised');
// const { fetchCoordsByIP } = require('./iss_promised');
// const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then((body) => {
//     console.log(body);
// });

// fetchMyIP()
//   // .then(body => fetchCoordsByIP(body))
//   .then(fetchCoordsByIP)
//   .then(body => console.log(body));

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let obj in passTimes) {
      console.log(`Next pass at ${new Date(passTimes[obj].risetime * 1000)} for ${passTimes[obj].duration} seconds!`);
    }
  })
  // Now, if there is ever an error anywhere along our chain of promises, execution will jump to our catch callback instead.
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });