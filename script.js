
fetch("https://google-flights-search.p.rapidapi.com/search?departure_airport_code=SFO&arrival_airport_code=LAX&flight_class=Economy", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "google-flights-search.p.rapidapi.com",
		"x-rapidapi-key": "bb3ea38cffmsh4809167876e83cbp105b8fjsn30ad018ac012"
    }
})
.then(response => {
    return response.json();
})
.then(function (data) {
  console.log(data)
})
.catch(err => {
	console.error(err);
});







// fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "SIGN-UP-FOR-KEY"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });








// return response.json();
//   })
  
// })

//   for (var i = 0; i < data.length; i++) {
//     console.log(data[i].url);
//     console.log(data[i].user.login);
//   }
// });