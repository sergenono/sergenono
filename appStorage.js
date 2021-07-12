'use strict';
 

const setting = document.querySelector('#standort-verwalten');
const menu_ctn = document.querySelector('#menu-ctn');
const menu_header = document.querySelector('.menu-header');
const menu = document.querySelector('.menu');

const cityName = document.createElement('span');
cityName.id = 'cityName';
const defaultCity = document.createTextNode( localStorage.getItem('defaultCityName') );
cityName.appendChild( defaultCity );
const menu_weather_logo_div = document.createElement('div');
menu_weather_logo_div.id = 'menu-weather-logo-div';

const menu_weather_logo = document.createElement('img');
menu_weather_logo.id = 'menu-weather-logo';
const menu_weather_logo_tmp = document.createElement('span');
menu_weather_logo_tmp.id = 'menu-weather-logo-temp';

menu_weather_logo_div.append(menu_weather_logo_tmp, menu_weather_logo)

document.querySelector('.standort').append( cityName , menu_weather_logo_div );

document.querySelector('.standort').addEventListener(
    'click', 
    function() {
        const city = document.querySelector('.standort span').textContent ;
        weather.fetchWeather(city);
    }
);

setting.addEventListener('click', addStandort);
function addStandort( ) {
    openInputField();
}

    const getinput = document.createElement('div');
    getinput.id = 'menu-getinput';

    const input = document.createElement('input');
    input.id = 'input-storage';  
    input.required = true;
    input.placeholder = 'Andere Stadt';

    const submit = document.createElement('input');
    submit.type = "button";
    submit.value = "Ok";
    submit.id = 'btn-storage';
    submit.addEventListener('click', refreshStorage);

    getinput.append(input, submit);
    menu_header.append(getinput); 
    
    document.querySelector('#menu-getinput').style.display = 'none';

    let counter = 0;
function openInputField() 
{
    if ( counter == 0 ) {
        document.querySelector('#menu-getinput').style.display = 'flex';
    } 
    else if ( counter == 1 ) {
        document.querySelector('#menu-getinput').style.display = 'none';
    }  

    document.querySelector('#input-storage').focus();
} 

function refreshStorage() {
    const newCityName = document.querySelector('#input-storage').value;
    if (newCityName == '') {
        document.querySelector('#menu-getinput').style.borderBottom = '2px solid red';
        counter = 1;

        // const p = document.createElement('p');
        // p.id = "menu-error-msg";
        // p.appendChild( document.createTextNode(" Geben Sie bitte einen Stadtnamen ein *") );
        // document.querySelector('.menu-header').appendChild( p );
    } 
    else {
        init.getParameter();
        // weather.fetchWeather( newCityName );
        window.localStorage.setItem('defaultCityName', newCityName);
        document.querySelector('.standort span').textContent = newCityName;
        document.querySelector('#input-storage').style.display = 'none';
        document.querySelector('#btn-storage').style.display = 'none'; 
        counter = 0;
        // document.querySelector('#menu-error-msg').style.display = 'none'; 
    }
    

}







