const request = require("request");

const geocode = (address, callback) => {
  const URL_geo =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiemFyYWIiLCJhIjoiY2p0Mm5sN2poMjh5dDQ5b2R3ZGx5aWdxcCJ9.KgU8OPkzcylxfbKMcFgEUQ";

  request({ url: URL_geo, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
