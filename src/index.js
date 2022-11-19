import debounce from 'lodash.debounce';
import ApiServiseCountries from './js/fetchCountries';
import './css/styles.css';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('input#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};
const apiServiseCountries = new ApiServiseCountries();

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  apiServiseCountries.value = event.target.value.trim();
  apiServiseCountries.fetchCountries().then(countries => {
    console.log(countries);
    onCreateCountryCard(countries);
  });
}

function onCreateCountryCard(countries) {
  if (countries.length > 1 && countries.length < 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    const markupCountryList = countries
      .map(country => {
        return `<li>
        <div class='overlay'>
        <img src='${country.flags.svg}' alt='flag' width='30'/>
        <h1 class='countries'>${country.name.official}</h1>
        </div>
        </li>`;
      })
      .join('');
    refs.countryList.insertAdjacentHTML('beforeend', markupCountryList);
    return
  } else if (countries.length === 1) {
    refs.countryList.innerHTML = '';
    const markupCountryInfo = countries.map(country => {
      return `<div class='overlay'>
      <img src='${country.flags.svg}' alt='flag' width='30'/>
      <h1 class='country'>${country.name.official}</h1>
      </div>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages)}</p>`;
    });
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo);
    return
  } else {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}
