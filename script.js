// modal 
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);
// end of modal code

//================================================================

// TODO:  LETS GET STARTED //

var apiOneUrl = 'https://api.zippopotam.us/us/';
function zipQuery () {
    // creating vars to take the input from the zip code input box, and adding that to the url for setting the query search on apiOne
    // the input from the zip code input box is set in the #zip code inner.HTML
    var textInputEl = document.querySelector("#textInput").value;
    var zipCodeEl = document.querySelector('#zipCode');
    zipCodeEl.innerHTML = textInputEl;  // setting the zip code div element text value to the text input value that was entered in the "Enter Zip Code" input box 

    var apiOneRequest = apiOneUrl + textInputEl;  // this is the concatonated string that is submitted for the first api request
    localStorage.setItem("apiOneQuery", apiOneRequest);  // storing apiOneRequest into local storage
    console.log(apiOneRequest);
    

    fetch(apiOneRequest)  //  sending a queried request
        .then(response => {  // if a response is reached then this function
            //console.log(response);  // logs the response from the api server  status 200 etc....
            return response.json(); // requesting the information stream to be converted from json input and produced into a javascript object
        })
        .then(dataOneReturned => { // create a function that will work with the apiOneRequest response information
            localStorage.setItem("apiOne", JSON.stringify(dataOneReturned)); // restringing the response request to store in local storage
            console.log(dataOneReturned);

            var postCodeVar = dataOneReturned["post code"];  // returns the value of the nested key {post code}, parses it to a numeric value, assigns the value to html #latitude
            //var zipVar = JSON.parse(["post code"]);
            console.log(postCodeVar);
            document.getElementById("zipCode").textContent = postCodeVar;

            var {places: { [0]: {latitude} } } = dataOneReturned;  // returns the value of the nested key {latitude}, parses it to a numeric value, assigns the value to html #latitude; after testing, parsing may or may not have been necessary but left as is since it works
            var latVar = JSON.parse(latitude);
            localStorage.setItem("latitude", latVar);
            //console.log(latVar);
            document.getElementById("latitude").textContent = latVar;
            
            var {places: { [0]: {longitude} } } = dataOneReturned;  // returns the value of the nested key {longitude}, parses it to a numeric value, assigns the value to html #longitude; after testing, parsing may or may not have been necessary but left as is since it works
            var lonVar = JSON.parse(longitude);
            localStorage.setItem("longitude", lonVar);
            //console.log(lonVar);
            document.getElementById("longitude").textContent = lonVar;
            
            var {places: { [0]: {state} } } = dataOneReturned;  // returns the value of the nested key {state}, not parsed because it is NaN, assigns the value to html #state
            var stateVar = (state);
            localStorage.setItem("state", stateVar);
            //console.log(stateVar);
            document.getElementById("state").textContent = stateVar;
            
            var cityVar = dataOneReturned.places[0]["place name"];  // returns the value of the nested key {place name}, assigns the value to html #city
            localStorage.setItem("city", cityVar);
            console.log(cityVar);
            document.getElementById("city").textContent = cityVar;
        })
}
document.getElementById("submit").addEventListener("click", zipQuery);  // make click event to submit a zip code that will be used as the initial search parameter
