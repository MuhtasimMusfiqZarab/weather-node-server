console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchLocation.value;
  //   console.log(location);
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
