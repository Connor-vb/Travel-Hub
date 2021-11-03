$(function() {
   $( "#leave-date").datepicker({
      changeMonth: true,
      changeYear: true,
      autoSize: true
   });
   $( "#return-date").datepicker({
      changeMonth: true,
      changeYear: true,
      autoSize: true
   });
   var dateFormatD=$("#leave-date").datepicker("show","option", dateFormatD);
   $("#leave-date").datepicker("option", "dateFormat", "yy-mm-dd")
   var dateFormatR=$("#return-date").datepicker("show","option", dateFormatR);
   $("#return-date").datepicker("option", "dateFormat", "yy-mm-dd")
});

$("#search-flight").click(function(event){
    event.preventDefault();
});


$("#search-flight").click(function (){
   var modal = document.getElementById("myModal");


var btn = document.getElementById("search-flight");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
   var flightType = $("#flight-type").val();
   var depCity =  $("#dep-from").val();
   var departureCity = depCity.toUpperCase();
   var arriveCity = $("#dep-to").val();
   var arrivalCity = arriveCity.toUpperCase();
   var departureDate = $("#leave-date").val();
   var returnDate = $("#return-date").val();
   var classType = $("#class-type").val();
   var maxPrice = $("#price-range").val();
   var passengerNo = $("#adults").val();
      console.log (departureCity, arrivalCity, departureDate, returnDate,classType, maxPrice, passengerNo)

   fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${departureCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
      {
         "method": "GET",
         "headers": {
               "Authorization": "Bearer BsSqha9Y5nPj9MOwR5mEJC7bAtzw",
         }
      })
      .then((response) => {return response.json()})
      .then(function(departureResponse){
         var departureCityCode = departureResponse.data[0].iataCode
      

      fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${arrivalCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
         {
            "method": "GET",
            "headers": {
                  "Authorization": "Bearer BsSqha9Y5nPj9MOwR5mEJC7bAtzw",
            }
         })
         .then((response) => {return response.json()})
         .then(function(arrivalResponse){
            var arrivalCityCode = arrivalResponse.data[0].iataCode;
            var arrivalState = arrivalResponse.data[0].address.stateCode;
      

         fetch ('https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/states/'+ arrivalState +'/current.json')
            .then((response) => {return response.json()})
            .then(function(covidResults) {
               console.log(covidResults.deathIncrease, covidResults.hospitalizedCurrently, covidResults.positiveIncrease)
            })
   
            fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?sort_order=PRICE&location_departure=${departureCityCode}&date_departure=${departureDate}&class_type=${classType}&location_arrival=${arrivalCityCode}&itinerary_type=${flightType}&date_departure_return=${returnDate}&number_of_passengers=${passengerNo}&price_max=${maxPrice}&number_of_stops=0`,
               {
                  "method": "GET",
                  "headers": {
                        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
                        "x-rapidapi-key": "59f7e69363mshd079e2ca36399cap1b8406jsn3dc47a20df7c"
                  }
               })
               .then((response) => {return response.json()})
               .then(function(providerCoverage){
                  console.log(providerCoverage)
                  for (i=0; i < providerCoverage.filteredTripSummary.airline.length; i++){
                     var airlineCode = providerCoverage.filteredTripSummary.airline[i].code
                     var fareAmount = providerCoverage.filteredTripSummary.airline[i].lowestTotalFare.amount
                     var divModalbody = $('<div> </div>')
                     
                     divModalbody.append(airlineCode + "   ");
                     divModalbody.append('$' + fareAmount);

                     $("#carrier").append(divModalbody);
                  
         };
      })
   });
   });
});




