'use strict';

// import Reorganizer from './pooJS.js';
// import MenuBarInteractions from './pooJS.js'; 
// import Provider from './pooJS.js';
// import WorkData from './pooJS.js'; 
// import Init from './pooJS.js'; 
// import User from './pooJS.js'; 

import {Reorganizer, MenuBarInteractions, Provider, Init, User} from "./pooJS.js";
import standort_verwalten from './pooJS.js';


const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const reorganizeDays = new Reorganizer( days, months );
let daysInOrder = reorganizeDays.displayDaysInorder();  //export default daysInOrder
reorganizeDays.changeHour( daysInOrder );

//-------------------------------------------------------------------------

const menuInteraction = new MenuBarInteractions( document.querySelector('.menu-icon'), document.querySelector('.toclose-icon') );
menuInteraction.openMenu();
menuInteraction.closeMenu();

//-------------------------------------------------------------------------

document.querySelector('#home-btn').addEventListener('click', function(){
    new Init().getParameter();
});
document.querySelector('#city').addEventListener('keyup', function(event){
    if (event.key == "Enter") {
        new Init().getParameter();
    } 
}); 

//-------------------------------------------------------------------------


document.querySelector('.search-icon').addEventListener('click', new User().getWeather);
document.querySelector('.search').addEventListener("keyup", new User().getWeather);

//actions on inner elements of menu 
document.querySelector('.standort').addEventListener(
    'click',
    function() {
        const city = document.querySelector('.standort span').textContent ;
        new Provider('c9842f587841ab3d8440bdae432a3299').fetchWeatherByCityName(city);
    }
); 

const user = new User(); 
standort_verwalten.addEventListener('click', user.openInputField); //standort_verwalten == setting (dans appStorage.js)
submit.addEventListener('click', user.setDefaultTown);

function errorTrigger(element) 
{
    element.style.border = '2px solid red';
    element.style.boxShadow = '0px 0px 8px red';
    window.setTimeout(function () {
        element.style.border = '0px';
        element.style.boxShadow = 'none';
    }, 3000);
}



