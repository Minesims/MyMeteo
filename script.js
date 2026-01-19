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

// J'enregistre la saisie de l'utilisateur d'une lettre dans l'input 
let input = "";

searchInput.addEventListener('keyup', ()=> {
  input = searchInput.value;

  // Je vérifie que le champs de saisie n'est pas vide
  if (input.length > 0) {

    // Je transforme la première lettre en majuscule pour correspondre à mon array
    input = input[0].toUpperCase() + input.slice(1);
    filterCities();
  }
});

// Je défini une fonction qui sera appelé à chaque nouvelle saisie de l'utilisateur
function filterCities() {

  // Je réinitialise le HTML de ma liste de ville pour ne pas avoir de doublons
  cityList.innerHTML = "";

  cities.forEach(city => {

    // Bonus : Si l'utilisateur connait le code secret "*", il affiche toutes les villes disponibles dans la liste
    if (input == "*") {
      cityList.innerHTML += (`<li class="city">${city.name}</li>`);   

    // Si la saisie de l'utilisateur correspond à une ville enregistrée, une nouvelle puce est créée pour afficher la ville
    } else if (city.name.includes(input)) {
    cityList.innerHTML += (`<li class="city">${city.name}</li>`);
    }
  });

  // J'enregistre mes éléments portant la classe "city"
  let citiesChoice = document.querySelectorAll('.city');
  let temp = 0.0;

  // J'enregistre l'évènement si l'utilisateur clique sur une ville proposée
  citiesChoice.forEach(city => {
    city.addEventListener('click', () => {

      // A chaque nouveau clic je supprime la classe "active" des éléments précédemment sélectionnés
      citiesChoice.forEach(cityChoice => cityChoice.classList.remove('active'));
      // Puis je réenregistre la classe "active" sur l'élément actuellmement
      city.classList.add('active');

      // Je recherche 
      let selectedCity = cities.find(browseCity => browseCity.name === city.textContent);
      
      // Je récupère les informations de l'API à chaque clic pour avoir les informations à jour
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m`)
      .then(response => response.json())
      .then(data => {

        // Je défini la valeur que je souhaite récupérer, et je l'affiche sur le DOM avec la fonction innerHTML
        temp = data.current.temperature_2m;
        weatherDiv.innerHTML = `<p>Température à ${selectedCity.name} : </p><p id="weather">${temp} °C</p>`;
      })
      .catch(error => {
          return error;
    });
    })
  })
};

