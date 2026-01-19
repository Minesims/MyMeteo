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
// TODO : filtrer les villes selon la saisie
// TODO : afficher la liste des villes correspondantes
// TODO : gérer le clic sur une ville
// TODO : requête AJAX vers Open-Meteo
// TODO : affichage météo dans le DOM
// TODO : gestion de la classe CSS active