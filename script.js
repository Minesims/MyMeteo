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
  cityList.innerHTML = "";
  cities.forEach(city => {
      if (city.name.includes(input)) {
        cityList.innerHTML += (`<li class="city">${city.name}</li>`);
      }
  });


  let citiesChoice = document.querySelectorAll('.city');
  
  citiesChoice.forEach(city => {
    city.addEventListener('click', () => {
      citiesChoice.forEach(city => city.classList.remove('active'));
      city.classList.add('active');

      fetch('https://api.open-meteo.com/v1/forecast?latitude=48.85,45.75,43.3,44.84,50.63&longitude=2.35,4.85,5.37,-0.57,3.06&current=temperature_2m')
      .then(response => response.json())
      .then(data => {
        console.log(data.length)
        cities.forEach(city => {
          for (let m = 0; m < data.length; m++) {
            console.log(cities.indexOf('Paris'));
            if (data[m].latitude == cities[m].lat) {
              weatherDiv.innerHTML = `Météo pour ${city.textContent} : `
            }
          }

        })
      })
    })
  })

};
        

    




// TODO : requête AJAX vers Open-Meteo
// TODO : affichage météo dans le DOM
