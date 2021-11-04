$(function () {
   $("#leave-date").datepicker({
      changeMonth: true,
      changeYear: true,
      autoSize: true
   });
   $("#return-date").datepicker({
      changeMonth: true,
      changeYear: true,
      autoSize: true
   });
   var dateFormatD = $("#leave-date").datepicker("show", "option", dateFormatD);
   $("#leave-date").datepicker("option", "dateFormat", "yy-mm-dd")
   var dateFormatR = $("#return-date").datepicker("show", "option", dateFormatR);
   $("#return-date").datepicker("option", "dateFormat", "yy-mm-dd")
});

$("#search-flight").click(function (event) {
   event.preventDefault();
});


$("#search-flight").click(function () {
   var flightType = $("#flight-type").val();
   var depCity = $("#dep-from").val();
   var departureCity = depCity.toUpperCase();
   var arriveCity = $("#dep-to").val();
   var arrivalCity = arriveCity.toUpperCase();
   var departureDate = $("#leave-date").val();
   var returnDate = $("#return-date").val();
   var classType = $("#class-type").val();
   var maxPrice = $("#price-range").val();
   var passengerNo = $("#adults").val();

   console.log(departureCity, arrivalCity, departureDate, returnDate, classType, maxPrice, passengerNo)

   // Let them know you're searching
   $(".carrier--title").text("Searching for Results ...")
   // clear the results before refetching
   $('.carrier--list').empty();
   $('.carrier--no-found').empty();


   fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${departureCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
      {
         "method": "GET",
         "headers": {

            "Authorization": "Bearer TGrf7jlloUVQoeZZ23hw6BGZhPrp",
         }
      })
      .then((response) => {
         return response.json()
      })

      .then(function (departureResponse) {
         console.log("Departure Response", departureResponse.data)

         if (!departureResponse.data) {
            console.log("error")
            document.getElementById("myModal").setAttribute("class", "modal is-active")
         }
         var departureCityCode = departureResponse.data[0].iataCode

         fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${arrivalCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
            {
               "method": "GET",
               "headers": {
                  "Authorization": "Bearer TGrf7jlloUVQoeZZ23hw6BGZhPrp",
               }
            })
            .then((response) => {
               return response.json()
            })
            .then(function (arrivalResponse) {

               console.log("Arrival Response", arrivalResponse.data)
               if (!arrivalResponse.data) {
                  console.log("error")
                  document.getElementById("myModal").setAttribute("class", "modal is-active")
               }

               var arrivalCityCode = arrivalResponse.data[0].iataCode;


               var appendCard = `<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>`
               console.log("Heres the codes", departureCityCode, arrivalCityCode)
               var url = `https://priceline-com-provider.p.rapidapi.com/v1/flights/search?sort_order=PRICE&location_departure=${departureCityCode}&date_departure=${departureDate}&class_type=${classType}&location_arrival=${arrivalCityCode}&itinerary_type=${flightType}&date_departure_return=${returnDate}&number_of_passengers=${passengerNo}&price_max=${maxPrice}&number_of_stops=0`
               console.log("heres provider coverage url", url)
               fetch(url,
                  {
                     "method": "GET",
                     "headers": {
                        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
                        "x-rapidapi-key": "59f7e69363mshd079e2ca36399cap1b8406jsn3dc47a20df7c"
                     }
                  })
                  .then((response) => { return response.json() })
                  .then(function (providerCoverage) {
                     console.log("Provider Coverage", providerCoverage)
                     $('.carrier--title').text('Provided Airlines Results');
                     if (providerCoverage && providerCoverage.airline != null) {
                        for (i = 0; i < providerCoverage.airline.length; i++) {
                           console.log(providerCoverage.airline[i].name)
                           var name = providerCoverage.airline[i].name.toString();
                           $(".carrier--list").append('<li>' + name + '</li>');
                        }
                     } else {
                        $(".carrier-no-found").text('Uh oh! Looks like there were no airlines found for this search.');
                     }

                  })
                  .catch(err => {
                     alert(err);
                  });
            });
      });
});






