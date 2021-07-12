'use strict';

// import daysInOrder from './pooJS.js';
 
let init = {

    count : 1 ,

    getNextPage : function() {
        weather.fetchWeather( localStorage.getItem("defaultCityName") );
        setTimeout(
            function () {
                document.querySelector('#home').style.display = 'none';
                document.querySelector('#main-bloc').style.display = 'block';
                document.querySelector('.bloc-prevision').style.display = 'flex';
                document.querySelector('.container').style.display = 'block';
            },
            100
        );
    }, 

    getParameter : function() { 
        //__3) nom de la ville par defaut
        // const defaultCityName = window.prompt("Please enter your city name");

        const defaultCityName = document.querySelector('#city').value; 
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ weather.apiKey
        ).then ( (res) => {
            if ( res.ok ) { //request success
                localStorage.setItem("defaultCityName", defaultCityName);
                this.count = 0;
                localStorage.setItem("count", this.count);

                document.querySelector('#home').style.display = 'none'; 
    
                this.getNextPage();  
            }
            else {
                document.querySelector('.requied').style.display = 'block';
                window.setTimeout( function() {
                    document.querySelector('.requied').style.display = 'none';
                }, 10000);
            }

        }) 
    },

    getNextPage : function() { 
        document.querySelector('#home').style.display = 'none';    
        document.querySelector('#main-bloc').style.display = 'block';
        document.querySelector('.bloc-prevision').style.display = 'flex';
        document.querySelector('.container').style.display = 'block'; 

        weather.fetchWeather( localStorage.getItem("defaultCityName") ); 
        document.querySelector('#cityName').innerText = localStorage.getItem('defaultCityName');
    }
}

//I.
//__1)	Définir une clé par défaut „cityName“,

document.querySelector('#home-btn').addEventListener('click', function(){
    init.getParameter();
});
document.querySelector('#city').addEventListener('keyup', function(event){
    if (event.key == "Enter") {
        init.getParameter();
    } 
}); 





let weather = {
    apiKey : 'c9842f587841ab3d8440bdae432a3299', 

    fetchedCurrentData : {},

    //fetch the weather informations DAILY using city name---------
    fetchWeather: function ( city ) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=de&appid="+ this.apiKey
        )
        .then ( (response) => {
            
            if ( response.ok ) { //verifie si la reponse a abouti  
                response.json()
                .then( (data) => { 
                    console.log("fetchweather ############", data);
                    this.displayWeather(data);
                    this.fetchedCurrentData = data;
                    this.fetchWeatherForecast(this.fetchedCurrentData.coord.lat, this.fetchedCurrentData.coord.lon); 
                } ) ; 
            }                 
        })    
    }, 


    displayWeather : function(data)
    {
        const { name } = data;  
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(data, name, icon, description, temp, humidity, speed );
        document.querySelector('.city').innerHTML = 
            `<i style="padding-right: 1rem; font-size: 0.6em" class="fas fa-map-marker-alt"></i>  ${name}`;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector('#menu-weather-logo').src = "https://openweathermap.org/img/wn/"+ icon +".png";  
        document.querySelector('.temp').innerText = Math.ceil(temp) + "°C";
        document.querySelector('#menu-weather-logo-temp').innerText = Math.ceil(temp) + "°C";
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerHTML = `<i style="color:#0a94ca ; font-weight: 500;" class="fas fa-dewpoint"></i> ${humidity} %`;
        document.querySelector('.wind').innerHTML = `<i style="color:#ffffff41 " class="fas fa-wind"></i> ${speed} Km/h`;
    
        document.querySelector('.weather').classList.remove('loading'); //pour rendre le contenu
        //visible une fois que les données météorologiques ont été completement chargées

        //variation des images d'arriere plan en fonction de l'Heure et meteo
        switch ( icon ) {
            case "01n" :
            case "02n" :    
                document.body.style.backgroundImage =  "url('./weather_images/nigth.jpg')";
                break;
            case "01d" :  
                document.body.style.backgroundImage =  "url('./weather_images/clear_sky.jpg')";
                break;
            case "02d" :  
            case "02n" :
                document.body.style.backgroundImage =  "url('./weather_images/few_clouds.jpg')";
                break;
            case "50d" :
            case "50n" :  
                document.body.style.backgroundImage =  "url('./weather_images/mist.jpg')" ;
                document.body.style.transition = "1s ease-in";
                break;
            case "09d" :  
            case "09n" :  
            case "10n" :  
            case "10d" :  
                document.body.style.backgroundImage =  "url('./weather_images/raining.jpg')";
                break;
            case "03d" :
            case "03n" :    
                document.body.style.backgroundImage =  "url('./weather_images/scattered_clouds.jpg')";
                break;
            case "13n" : 
            case "13d" :    
                document.body.style.backgroundImage =  "url('./weather_images/snow.jpg')" ;
                break;
            case "11d" :
            case "11n" :    
                document.body.style.backgroundImage =  "url('./weather_images/storm.jpg')" ;
                break;
            case "04n" :
            case "04d" :
                document.body.style.backgroundImage =  "url('./weather_images/broken_clouds.jpg')" ;
                break;
        }
 
        // document.body.style.backgroundImage = './weather_images/' ;
            // `url('https://source.unsplash.com/1600x900/?${document.querySelector('.search').value}')`;
    }, 

    //fetch the weather informations HOURLY and DAILY---------
    fetchWeatherForecast : function(latitude , longitude) {

        fetch( `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${this.apiKey}`)
        .then ( (reponse) => reponse.json() 
        .then ( (data) => { 
            console.log(" result of daily and hourly fetched infos --->  ",data);
            this.displayDailyForecast(data);
            this.displayHourlyForecast(data); 
        }))
    },

    //print forcecast every single day
 
    displayDailyForecast : function( data ) 
    {  
        let j = 0;
        // let prevision = document.querySelectorAll('.prevision');
        for (let i=1; i<=7 ; i++ ) //prevision.length 
        {
            const { min, max } = data.daily[i].temp //les temperatures min et max
            const { icon } = data.daily[i].weather[0];
            const { humidity, wind_speed} = data.daily[i];
            console.log("daily forecast   ", min, max, icon,humidity, wind_speed);

            document.querySelectorAll('.temp-min-max')[j].innerText = Math.ceil(min) +"°/" + Math.ceil(max) + "°C";
            document.querySelectorAll('.icon-prevision')[j].src = "http://openweathermap.org/img/wn/"+ icon+ ".png";
            document.querySelectorAll('.humidity')[j].innerHTML = `<i style="font-size: .65rem" class="fas fa-tint"></i> ${humidity} %`;
            document.querySelectorAll('.wind-speed')[j].innerHTML = `<i style="color:#ffffff41 " class="fas fa-wind"></i> ${wind_speed} Km/h`;
            console.log("j  ", j)
            j++; 
        } 
    } ,
    //print forecast every 1 hour

    displayHourlyForecast : function(data) {
        let d = new Date();
        let hour = d.getHours();
        // let min = d.getMinutes();
        // hour = ( min > 30 ) ? hour +1 : hour ; 

        let hourly_forecast = document.querySelectorAll('.hourly-forecast');
        let hourly = document.querySelectorAll('.hourly');
        let icon_hour = document.querySelectorAll('.icon-hour');
        let temp_hour = document.querySelectorAll('.temp-hour');
        let humidity_hour = document.querySelectorAll('.humidity-hour');

        //every 1 hour
        for (let i=0 ; i<hourly_forecast.length; i++) 
        {
            //hour
            if (hour < 10) {
                hourly[i].innerText = `0${hour}:00`;
            } else if ( hour >= 24) {
                hour = hour -24;
                if (hour < 10) 
                    hourly[i].innerText = `0${hour}:00`;
                else
                    hourly[i].innerText = `${hour}:00`;
            } else {
                hourly[i].innerText = `${hour}:00`;
            }
            hour = hour + 1; //next hour

            //hourly weather condition icons 
            icon_hour[i].src ="http://openweathermap.org/img/wn/"+ data.hourly[i].weather[0].icon+ ".png" ;
            
            //temperature 
            temp_hour[i].innerText = Math.trunc(data.hourly[i].temp) + " °c";

            //humidity
            humidity_hour[i].innerHTML = `<i style="font-size: .65rem" class="fas fa-tint"></i> ${data.hourly[i].humidity} %`;

        }
        
    },
    
    search: function () {
        this.fetchWeather( document.querySelector('.search').value ) //pour recupérer le nom de la ville
    }  
}; 


//############# LANCEMENT DE L#APPLICATION #######################
if ( localStorage.getItem("count") == '0' ) {
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#main-bloc').style.display = 'block';
    document.querySelector('.bloc-prevision').style.display = 'flex';
    document.querySelector('.container').style.display = 'block';
    
    weather.fetchWeather( localStorage.getItem("defaultCityName") );
    
} 
else {
    init.getParameter();
}

//lorsqu#on clique sur le bouton de recherche, alors ca appelle la fonction "search()"
//dans l'objet "weather", qui va recuperer le nom (document.querySelector('.search').value)
//pour que "fetchWeather" determine ses infos météorologiques
document.querySelector('.search-icon').addEventListener('click', function() {
    if (document.querySelector('.search').value == '') 
        alert("enter a city name");
    else {
        weather.search();
        document.querySelector('.search').blur();
    }
});
//******* C'EST UN OBJECT DE LA CLASSE " USER " QUI VA EFFECTUER CES OPERATIONS(ci-dessous et ci-dessus) via la methode " getWeather() "*******
document.querySelector('.search').addEventListener("keyup", function (event) { 
    if ( event.key == "Enter") { 
        weather.search(); 
        document.querySelector('.search').blur();
    }
});
 

//************    MENU_BAR_INTERACTIONS     *********** */

/**
 * menu-bar handling 
 * 
 */
let menu_btn = document.querySelector('.menu-icon');
let close_menu_btn = document.querySelector('.toclose-icon');  

menu_btn.addEventListener('click', () => {
    document.querySelector('.menu').style.width = '350px'; 
    document.body.style.transition = '.3s ease-in-out'; 
    document.querySelector('.menu-header').style.display = 'block'; 
    document.querySelector('#standort-verwalten').style.display = 'block';
});

close_menu_btn.addEventListener('click', () => {
    document.querySelector('.menu').style.width = '0px'; 
    document.body.style.transition = '.3s ease-in-out';  
    document.querySelector('.menu-header').style.display = 'none';
    document.querySelector('#standort-verwalten').style.display = 'none';
});

document.body.style.transition = '.3s ease-in-out';

// When the user scrolls down 20px from the top of the document, slide down the navbar
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     document.querySelector(".scroll-top-bar").style.top = "0";
//   } else {
//     document.querySelector(".scroll-top-bar").style.top = "-50%";
//   }
// }






/* ************    TIMER     ***********/

//to print to local date and hour
setInterval( 
    function () { 
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        const d = new Date();
        // let sec = d.getSeconds();
        let min = d.getMinutes();
        let h = d.getHours();

        // if ( d.getSeconds() < 10 ) sec = `0${d.getSeconds()}`; 
        if ( d.getMinutes() < 10 ) min = `0${d.getMinutes()}`;
        if ( d.getHours() < 10 ) h = `0${d.getHours()}`;
        document.querySelector('p.hour').innerHTML = daysInOrder[daysInOrder.length-1] + ", "+ d.getDate() + " " + months[d.getMonth()]+ " " + d.getFullYear()+ `, <strong> ${h}:${min} </strong>` ;
    },
    1000
); 




//************    DAYREORGANIZER     *********** */

let count = 1;
function getParameter() 
{
    if ( typeof(Storage) != "undefined" && count != 0) {
        //__3) nom de la ville par defaut
        // const defaultCityName = window.prompt("Please enter your city name");

        const defaultCityName = document.querySelector('#city').value;
        if ( defaultCityName == '' ) { 
            document.querySelector('.requied').style.display = 'block';
        } else {
            localStorage.setItem("defaultCityName", defaultCityName);
            localStorage.setItem("count", count);
            count = 0;

            getNextPage();
        }      
    }
}

function getNextPage() {
    

    weather.fetchWeather( localStorage.getItem("defaultCityName") );
    setTimeout(
    function () {
        document.querySelector('#home').style.display = 'none';
        document.querySelector('#main-bloc').style.display = 'block';
        document.querySelector('.bloc-prevision').style.display = 'flex';
        document.querySelector('.container').style.display = 'block';
    },
    100
);

}

getParameter();
setTimeout(
    function () {
        weather.fetchWeather( localStorage.getItem("defaultCityName") )
    },
    800
);

// pour mettre toujours les jours en ordre en fonction du jour actuel
//
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let daysInOrder, today, options, current_day; 
let d = new Date(); 

    today = new Date(); 
    options = {weekday: 'long'};//pour que le nom du jour actuelle soit écrit en 'long' caractere
    current_day = today.toLocaleDateString('de-DE', options); //le nom du jour sera en DE et en format 'long', z.B.: Samstag
    console.log("today: " + today + " current_day: " + current_day);
    
    current_day = current_day.charAt(0).toUpperCase() + current_day.slice(1, );
    //.slice(from, to) nous renvoit une portion de chaine de caractere.
    
    //pour chaque jours courent, on renvoit le reste des jours apres via la méthode "contact(...)"
    daysInOrder = days.slice( days.indexOf(current_day)+1 ).concat( days.slice(0, days.indexOf(current_day)+1));     


    console.log( daysInOrder );


//afficher les jours prochains
    let day = document.querySelectorAll('.day');
    for (let i=0; i<day.length; i++) {
        day[i].innerText = daysInOrder[i];
    }   





























