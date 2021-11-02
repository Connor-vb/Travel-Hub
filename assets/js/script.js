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
               "Authorization": "Bearer T0rry623cYG5bPi7Yd2VSGQiPEH3",
         }
      })
      .then((response) => {
         return response.json()
      })
      .then(function(departureResponse){
         var departureCityCode = departureResponse.data[0].iataCode
      

      fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${arrivalCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
      {
         "method": "GET",
         "headers": {
               "Authorization": "Bearer T0rry623cYG5bPi7Yd2VSGQiPEH3",
         }
      })
      .then((response) => {
         return response.json()
      })
      .then(function(arrivalResponse){
         var arrivalCityCode = arrivalResponse.data[0].iataCode;
      

   var appendCard= `<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`
   
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
         //console.log(providerCoverage)  
         console.log(providerCoverage)
         for (i=0; i < 6; i++){
            console.log(providerCoverage.airline[i].name)
         }
         // $("#carrier").append('<li>'+JSON.stringify(providerCoverage.airline[0].name)+'</li>');
         // $("#carrier").append(`<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body">${providerCoverage.airline[0].name}<h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`);
      })
      .catch(err => {
         alert(err);
      });
   });
   });
});




