var departureCity = "Chicago";
// $("#dep-from").val()
var arrivalCity = $("#dep-to").val();

$("button").click(function(event){
    event.preventDefault();
});

// var search = function(){
$("#search-flight").click(function (){
    
    var flightResponse = fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${departureCity}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "bb3ea38cffmsh4809167876e83cbp105b8fjsn30ad018ac012"
            
        }
    })
    .then((response) => {return response.json()})
    .then(function(flightResponse){
        console.log(flightResponse)
        
        // var pEl = document.createElement('p');
        // pEl.textContent = flightResponse.Places[0].CountryName;
        // document.getElementById("arrival-airport").appendChild(pEl);
    })
});
// };

// search();

