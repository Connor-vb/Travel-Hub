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

   //console.log(departureCity, arrivalCity, departureDate, returnDate, classType, maxPrice, passengerNo)

   // Let them know you're searching
   $(".carrier--title").text("Searching for Results ...")
   // clear the results before refetching
   $('.carrier--list').empty();
   $('.carrier--no-found').empty();


   fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${departureCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
      {
         "method": "GET",
         "headers": {

            "Authorization": "Bearer xDptQZJu2JP5CVsv5LFgH2F8yNkZ",
         }
      })
      .then((response) => {
         return response.json()
      })

      .then(function (departureResponse) {
         //console.log("Departure Response", departureResponse.data)

         if (!departureResponse.data) {
            //console.log("error")
            document.getElementById("myModal").setAttribute("class", "modal is-active")
         }
         var departureCityCode = departureResponse.data[0].iataCode

         fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${arrivalCity}&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL`,
            {
               "method": "GET",
               "headers": {
                  "Authorization": "Bearer xDptQZJu2JP5CVsv5LFgH2F8yNkZ",
               }
            })
            .then((response) => {
               return response.json()
            })
            .then(function (arrivalResponse) {

               //console.log("Arrival Response", arrivalResponse.data)
               if (!arrivalResponse.data) {
                  //console.log("error")
                  document.getElementById("myModal").setAttribute("class", "modal is-active")
               }

               var arrivalCityCode = arrivalResponse.data[0].iataCode;
               var arrivalState = arrivalResponse.data[0].address.stateCode;
               var arrivalStateCode = arrivalState.toLowerCase();
               
               fetch ('https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/states/'+ arrivalStateCode +'/current.json')
               .then((response) => {return response.json()})
               .then(function(covidResults) {
               
                  //console.log("Heres the codes", departureCityCode, arrivalCityCode)
                  var url = `https://priceline-com-provider.p.rapidapi.com/v1/flights/search?sort_order=PRICE&location_departure=${departureCityCode}&date_departure=${departureDate}&class_type=${classType}&location_arrival=${arrivalCityCode}&itinerary_type=${flightType}&date_departure_return=${returnDate}&number_of_passengers=${passengerNo}&price_max=${maxPrice}&number_of_stops=1`
                  //console.log("heres provider coverage url", url)
                  
                  fetch(url,
                     {
                        "method": "GET",
                        "headers": {
                           "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
                           "x-rapidapi-key": "59f7e69363mshd079e2ca36399cap1b8406jsn3dc47a20df7c"
                        }
                     })
                     .then((response) => { return response.json() })
                     .then(function(providerCoverage){
                        //console.log(providerCoverage);
                        $('.carrier--title').text('Provided Airlines Results');
                        if (providerCoverage && providerCoverage.filteredTripSummary != null) {
                           for (i=0; i < providerCoverage.filteredTripSummary.airline.length; i++) {
                           var airlineCode = providerCoverage.filteredTripSummary.airline[i].code.toString()
                           for(j=0; j <providerCoverage.airline.length; j++){
                              if(airlineCode === providerCoverage.airline[j].code){
                                 $(".carrier--list").append('<li>' + providerCoverage.airline[j].name + '</li>');//Replace Airline code with Airline Name
                              }
                           }
                           var fareAmount = providerCoverage.filteredTripSummary.airline[i].lowestTotalFare.amount.toString()
                              
                              $(".carrier--list").append('<li> $' + fareAmount + '</li>');
                           }

                        } else {
                           $(".carrier-no-found").text('Uh oh! Looks like there were no airlines found for this search.');
                        }
                        $("#flightContent").empty()//Empty Modal Content
                        var flightContainer = $("<div> </div>");
                     
                        flightContainer.append("<ul class='modal-content-ul'> Important Information before you travel to " + arrivalState + " : </ul>");
                        
                        var positiveTestInc = covidResults.positiveIncrease
                        flightContainer.append("<li class='modal-content-li'> Number of increased positive test results from yesterday: " + positiveTestInc + "</li>")
                  
                        var currentHospitalization = covidResults.hospitalizedCurrently
                        flightContainer.append("<li class='modal-content-li'> Number of current hospitalization: " + currentHospitalization + "</li>");
                        
                        var deathInc = covidResults.deathIncrease
                        flightContainer.append("<li class='modal-content-li'> Number of increased deaths from yesterday: " + deathInc + "</li>");

                        $("#flightContent").append(flightContainer)
                        $("#flightInfo").attr("class", "modal is-active")
                        $("#cancel").click(function(){
                           $("#flightInfo").attr("class", "modal")
                        });
                  
                        })
                        .catch(err => {
                           alert(err);
                        });
                     });
                  });
               });
            });


      // Local Storage
//       const storageInputd = document.querySelector('#dep-from');
//       const storageInputa = document.querySelector('#dep-to');
//       const textd = document.querySelector('depart-res');
//       const texta = document.querySelector('arrive-res');
//       const savedText = document.querySelector('.text');
//       const storedInput = localStorage.getItem('textinput');
// // arrive
//       if(storageInputa) {
//          texta.textContent = storedInput
//       }

//       storageInputa.addEventListener('input', letter => {
//          texta.textContent = letter.target.value
//       })

//       const saveToLocalStorage = () => {
//          localStorage.setItem('textinput', texta.textContent)
//       }
//       savedText.addEventListener('click', saveToLocalStorage)
// // Depart
//       if(storageInputa) {
//          textd.textContent = storedInput
//       }

//       storageInputa.addEventListener('input', letter => {
//          textd.textContent = letter.target.value
//       })

//       const saveToLocalStorage = () => {
//          localStorage.setItem('textinput', textd.textContent)
//       }
//       savedText.addEventListener('click', saveToLocalStorage)







