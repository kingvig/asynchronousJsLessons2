'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError=function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    //countriesContainer.style.opacity=1;
};


const renderCountry = function (data) {
  const html = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //countriesContainer.style.opacity = '1';
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) =>{
        if(!response.ok) {
            throw new Error(`country not found (${response.status})`);
        }
        return response.json()
    }
    )
    .then( (data)=>{
        renderCountry(data[0]);
        const neighbour=data[0].borders[0];
        if (!neighbour) {
            return;
        }
        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    }).then(response => response.json())
    .then(data=>renderCountry(data))
    .catch(err=>{
        console.log(`${err}`);
        renderError(`sommethin went wrong ${err}. Try again`);
    })
    .finally(()=>{
        countriesContainer.style.opacity=1;
    });
};
btn.addEventListener('click',function(){
    getCountryData('usa');
})
