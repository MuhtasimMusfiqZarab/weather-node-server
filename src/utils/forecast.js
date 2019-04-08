const request = require("request");

const forecast = (lat, long, callback) => {
  const URL_darksky =
    "https://api.darksky.net/forecast/9a98c19afa3eacb9244789b9a88001ae/" +
    lat +
    "," +
    long +
    "?units=si";

  request({ url: URL_darksky, json: true }, (error, response) => {
    const { error: bodyError, currently: data } = response.body;
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (bodyError) {
      callback("Unable to find location of given address", undefined);
    } else {
      console.log(data);
      const { temperature, precipProbability: rain, summary, humidity } = data;
      callback(undefined, {
        temperature,
        rain,
        summary,
        humidity
      });
    }
  });
};

module.exports = forecast;
