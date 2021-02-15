let input = document.querySelector('#userInput');
let button = document.querySelector('#searchButton');
let displayCountryInfo = document.querySelector('#countryContainer')
let countryFlag = document.getElementById('countryFlag');
let countryHeader = document.getElementById('countryHeader');
let countryInfo = document.getElementById('countryInfo');

button.addEventListener('click', () =>{
    getCountryByInput().then(createElements).catch(handleErrors);
})

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCountryByInput().then(createElements).catch(handleErrors);
    }
});


async function getCountryByInput() {
    let url = `https://restcountries.eu/rest/v2/name/${input.value}` ;
    const country = await axios.get(url)
    return country;
}

function createElements (country) {
    let {flag, name, subregion, population, capital, currencies, languages} = country.data[0];

    // Checking if there are multiple currencies
    let currency = '';
    if (currencies.length > 1){
        for (let i = 0; i < currencies.length; i++) {

            if (i === currencies.length -1){
                currency +=  ' and ' + currencies[i].name;
            }
            else if (i === currencies.length -2) {
                currency += currencies[i].name + ' '
            }
            else {
                currency += currencies[i].name + ', ';
            }
        }
    }
    else {
        currency = currencies[0].name;
    }

    // Checking if there are multiple languages
    let language = '';
    if (languages.length > 1){
        for (let i = 0; i < languages.length; i++) {

            if (i === languages.length -1){
                language +=  ' and ' + languages[i].name;
            }
            else if (i === languages.length -2) {
                language += languages[i].name + ' '
            }
            else {
                language += languages[i].name + ', ';
            }
        }
    }
    else {
        language = languages[0].name;
    }

    let countryText = `${name} is situated in ${subregion}. It has a population of  ${population} people. \n The capital is ${capital} and you can pay with ${currency}. \n They speak ${language}`;

    countryFlag.src = flag;
    countryFlag.alt = `The flag of ${name}`;
    countryHeader.innerHTML = name;
    countryInfo.innerHTML = countryText;

    displayCountryInfo.appendChild(countryFlag);
    displayCountryInfo.appendChild(countryHeader);
    displayCountryInfo.appendChild(countryInfo)
}

function handleErrors (err) {
    if (err.response) {
        console.log("Problem With Response ", err.response.status);
    } else if (err.request) {
        console.log("Problem With Request!");
    } else {
        console.log('Error', err.message);
    }
}
