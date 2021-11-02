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
   var depCity =  $("#dep-from").val();
   var departureCity = depCity.toUpperCase();
   var arriveCity = $("#dep-to").val();
   var arrivalCity = arriveCity.toUpperCase();
   var departureDate = $("#leave-date").val();
   var returnDate = $("#return-date").val();
   var classType = $("#class-type").val();
   var passengerNo = $("#adults").val();
      console.log (departureCity, arrivalCity, departureDate, returnDate,classType, passengerNo)
   var appendCard= `<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`
   var flightResponse = fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?sort_order=PRICE&location_departure=${departureCity}&date_departure=${departureDate}&class_type=${classType}&location_arrival=${arrivalCity}&itinerary_type=ROUND_TRIP&date_departure_return=${returnDate}&number_of_passengers=${passengerNo}`,
      {
         "method": "GET",
         "headers": {
               "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
               "x-rapidapi-key": "59f7e69363mshd079e2ca36399cap1b8406jsn3dc47a20df7c"
         }
      })
      .then((response) => {return response.json()})
      .then(function(flightResponse){
         console.log(flightResponse)  
         console.log(flightResponse.Carriers)  
         $("#carrier").append('<li>'+JSON.stringify(flightResponse.Carriers[0].Name)+'</li>');
         $("#carrier").append(`<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body">${flightResponse.Carriers[0].Name}<h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`);
      })
      .catch(err => {
         alert(err);
      });});


   
// var covidURL = `https://test.api.amadeus.com/v1/duty-of-care/diseases/covid19-area-report?countryCode=US${covidKey}`
// var covidKey = `f3PZijAuvuoT9k2Q6YkNbyY7lZI0U`
// fetch(covidURL).then(function (response) {
//    if (response.ok) {
//      response.json().then(function () {
//        console.log("did it", response);
     
//      });
//    }
//  });




