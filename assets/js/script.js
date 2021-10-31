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
   var departureCity =  $("#dep-from").val();
   var arrivalCity = $("#dep-to").val();
   var departureDate = $("#leave-date").val();
   var returnDate = $("#return-date").val();
      console.log (departureCity, arrivalCity, departureDate, returnDate)
   var appendCard= `<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`
   var flightResponse = fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${departureCity}-sky/${arrivalCity}-sky/${departureDate}?inboundpartialdate=${returnDate}`,
      {
         "method": "GET",
         "headers": {
               "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
               "x-rapidapi-key": "2c2cf48dfbmshceb6bdf988a07c2p1e2ad2jsn6289c7890bc2"
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




