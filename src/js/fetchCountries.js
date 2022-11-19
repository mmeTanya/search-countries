import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiServiseCountries {
  constructor() {
    this.searchValue = '';
  }
  fetchCountries() {
    const URL = `https://restcountries.com/v3.1/name/${this.searchValue}?fields=name,capital,population,flags,languages`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          Notify.failure('Oops, there is no country with that name');
        }
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name');
        }
        if (countries.length === 1 && countries.filter(element => 
          element.name.official.include(this.searchValue))) {
          return
        }
        return countries;
      });
  }

  get value() {
    return this.searchValue;
  }

  set value(country) {
    this.searchValue = country;
  }
}
