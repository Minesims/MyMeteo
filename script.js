const cities = [
  { name: "Paris", lat: 48.85, lon: 2.35 },
  { name: "Lyon", lat: 45.75, lon: 4.85 },
  { name: "Marseille", lat: 43.30, lon: 5.37 },
  { name: "Bordeaux", lat: 44.84, lon: -0.57 },
  { name: "Lille", lat: 50.63, lon: 3.06 }
];

const searchInput = document.getElementById("search");
const cityList = document.getElementById("cityList");
const weatherDiv = document.getElementById("weather");

// TODO : écouter la saisie utilisateur (event input)

let input = "";

searchInput.addEventListener('keyup', ()=> {
  input = searchInput.value;
  if (input.length > 0) {
    input = input[0].toUpperCase() + input.slice(1);
    filterCities();
  } else {
    cityList.innerHTML = "";
  }
});

// TODO : filtrer les villes selon la saisie
// TODO : afficher la liste des villes correspondantes
// TODO : gérer le clic sur une ville
// TODO : gestion de la classe CSS active

function filterCities() {
  cities.forEach(city => {
      if (city.name.includes(input)) {
        cityList.innerHTML = (`<li class="city">${city.name}</li>`);
      }
  })


  let citiesChoice = document.querySelectorAll('.city');
  let cityLat = [];
  let cityLon = [];
  
  citiesChoice.forEach(city => {
    city.addEventListener('click', () => {
      city.classList.add('active');
      fetch('https://api.open-meteo.com/v1/forecast?latitude=48.8534,45.7485,43.297,44.8404,50.633&longitude=2.3488,4.8467,5.3811,-0.5805,3.0586&current=temperature_2m')
      .then(response => response.json())
      .then(data => {
        for (let m = 0; m < data.length; m++) {
          cityLat.push(data[m].latitude);
          cityLon.push(data[m].longitude);
        cities.forEach(city => {
            if (cityLat.includes(city.lat) && cityLon.includes(city.lon)) {
              weatherDiv.innerHTML = (`<p>Météo à ${city.textContent} : Temp : ${data[m].current.temperature_2m}</p>`);
            }
          }  
        )}      
      });
      })
      .catch(error => {
        return error;
      })
  })
};
    




// TODO : requête AJAX vers Open-Meteo
// TODO : affichage météo dans le DOM
