import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchInput.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));


function onSearchCountry(e){
e.preventDefault();
const nameCountry = searchInput.value.trim();
if(!nameCountry){
  onClearCountry();
return
} else{
  return  fetchCountries(nameCountry).then(checkQuantityCountry)
  .catch(error => {alertNotFound(error)
   })}}

function checkQuantityCountry(numberCountry){
  onClearCountry();
if(numberCountry.length > 10){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    console.log(numberCountry);
} else if(numberCountry.length > 2 && numberCountry.length < 10){
  onClearCountry();
    const country = numberCountry.map(({name, flags}) =>{
     return `<li class="list-item"><img class="flag-image" src = "${flags.svg}"
       alt = "${flags.alt}"width="50"><span class="country-item">${name.official}</span></li>`}).join("");
       countryList.insertAdjacentHTML("afterbegin", country)
      } else if(numberCountry.length === 1){
        onClearCountry();
        const country = numberCountry.map(({name, flags, capital, languages,population}) =>{
          return `<img class="flag-image" src = "${flags.svg}"
            alt = "${flags.alt}"width="50"><h2>${name.official}</h2><p ><span class="country-item">Capital:</span>${capital
            }</p><p ><span class="country-item">Population:</span>${population}</p><p ><span class="country-item">Languages:</span>${Object.values(languages)}</p>`}).join("");
            countryInfo.insertAdjacentHTML("afterbegin", country)
       }

}


function alertNotFound(){
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onClearCountry() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
  }










  