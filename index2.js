const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');

// fetchMyIP()
//   .then((body) => {
//     console.log(body);
// });

fetchMyIP()
  // .then(body => fetchCoordsByIP(body))
  .then(fetchCoordsByIP)
  .then(body => console.log(body));