// It will contain most of the logic for fetching the data from each API endpoint.

const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (err) return callback(err, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
  });

};

const fetchCoordsByIP = function(ipAddress, callback) {

  request(`https://freegeoip.app/json/${ipAddress}`, (err, response, body) => {
    if (err) return callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP address. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    const coords = {
      latitude,
      longitude
    };
    callback(null, coords);
  });
  
};

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };