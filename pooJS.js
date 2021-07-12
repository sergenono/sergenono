'use strict';

 /**
  * @author Brandel Tsagueu
  * @date 12.07.21
  * @version 1.0
  * 
  * i create all necessaries nodes (HTML-Elemente) for 
  * using in User class
  */
  const standort_verwalten = document.querySelector('#standort-verwalten');
  const menu_ctn = document.querySelector('#menu-ctn');
  const menu_header = document.querySelector('.menu-header');
  const menu = document.querySelector('.menu');

  //menu content build
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
  menu_weather_logo_div.append(menu_weather_logo_tmp, menu_weather_logo);
  document.querySelector('.standort').append( cityName , menu_weather_logo_div );

  const getinput = document.createElement('div');
  getinput.id = 'menu-getinput';

  const input = document.createElement('input');
  input.id = 'input-storage';  
  input.required = true;
  input.placeholder = 'Beliebten Standort ändern';

  const submit = document.createElement('input');
  submit.type = "button";
  submit.value = "Ok";
  submit.id = 'btn-storage';

  getinput.append(input, submit);
  menu_header.append(getinput); 
  document.querySelector('#menu-getinput').style.display = 'none';

document.body.style.fontFamily = 'tahoma';

// class WeatherApp 
// {
//     constructor() {

//     }

// }




      
let p = document.createElement('p');
    const p_content = document.createTextNode("Der Stadtname ist falsch");
    p.style.width = '100vw';
    p.style.height = '20px';
    p.style.color = 'white';
    p.style.backgroundColor = 'red';
    p.style.fontFamily = 'tahoma';
    p.style.fontSize = '1rem';
    p.style.position = 'fixed';
    p.style.bottom = '0';
    p.style.textAlign = 'center';
    p.style.display = 'block';
    p.appendChild(p_content);
    document.body.appendChild(p);
//3) ************** PROVIDER **************
function Provider( apiKey )
{
    this.apiKey = apiKey;
}
Provider.prototype.fetchWeatherByCityName = function( cityName ) {

    let fetchedCurrentData = {};
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&lang=de&appid="+ this.apiKey)
    .then( (response) => {
        console.log(response)
        if ( response.ok ) 
            return response.json();
    },
    (reason) => console.log(new Error('fetch failed : ', reason)))
    .then( (data) => {
        fetchedCurrentData = data;
        new WorkData().displayCurrentWeather(data);
        this.fetchWeatherByGeolocation(data.coord.lat, data.coord.lon); 
        document.body.removeChild(p);
        return fetchedCurrentData;
    })
    .catch((reason) => { 
        console.log(reason); 
    });   

}
Provider.prototype.fetchWeatherByGeolocation= function( latitude, longitude ) {

    let fetchedCurrentData = {};
            // https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt={time}&appid=${this.apiKey}
    fetch( `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${this.apiKey}`)
    .then(  (response) => {
        if ( response.ok ) {
            response.json()
            .then( (data) => {
                fetchedCurrentData = data;
                new WorkData().displayDailyForecast(data);
                new WorkData().displayHourlyForecast(data);
            })
        } else {
            console.error("ERROR by getting weather data using geolocation");
        }
    });

    // console.log("par la geolocalisation          ..............", fetchedCurrentData);
    return fetchedCurrentData;
}  




localStorage.setItem( "bool", `false` ); 
class Init
{
    constructor() {
        this.isInitialize = false; 
    }

    getParameter()
    { 
        // const defaultCityName = window.localStorage.getItem('defaultCityName'); 
        const defaultCityName = document.querySelector('#city').value;
        // let bool = new Boolean( localStorage.getItem("bool") );
        // alert( bool instanceof Boolean);
        // bool = false;
        // counter = 1;
        // if ()

        // // if ( localStorage.getItem("bool") === 'false' ) 
        // if (this.isInitialize == false || localStorage.getItem("bool") === 'false')
        // { 
        //     this.isInitialize = true;
        //     // alert("la valeur de 'bool' est  ---> " + this.bool)
        //     fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ new Provider('c9842f587841ab3d8440bdae432a3299').apiKey)
        //     .then ( (res) => {
        //         if ( res.ok ) { //request success
        //             // bool = true;
        //             localStorage.setItem( "bool", `true` ); 
        //             localStorage.setItem("defaultCityName", defaultCityName); 
        //             // document.querySelector('#home').setAttribute('class','home-transition'); 
        //             this.getNextPage();  
        //         }
        //         else {
        //             document.querySelector('.requied').style.display = 'block';
        //             window.setTimeout( function() {
        //                 document.querySelector('.requied').style.display = 'none';
        //             },
        //             5000);
        //         } 
                
        //         }, 
        //         (reason) => {
        //             window.alert('Check your Internet quality');
        //             console.error(reason);
        //     })
        //     .catch((reason)=> console.error(reason));

        // }
        // else if ( localStorage.getItem("bool") === 'true' ) {
        //     this.getNextPage();
        //     document.querySelector('#home').setAttribute('class','home-transition'); 
        // }
        
        if ( localStorage.getItem( 'defaultCityName' ) !== null ) {
            this.closeHomePage();
            this.getNextPage();
            document.querySelector('#home').setAttribute('class','home-transition');  
        }
        else {
            fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ new Provider('c9842f587841ab3d8440bdae432a3299').apiKey)
            .then ( (res) => {
                if ( res.ok ) { 
                    localStorage.setItem("defaultCityName", defaultCityName);  
                    this.getNextPage();  
                }
                else {
                    document.querySelector('.requied').style.display = 'block';
                    window.setTimeout( function() {
                        document.querySelector('.requied').style.display = 'none';
                    },
                    5000);
                } 
                
                }, 
                (reason) => {
                    window.alert('Check your Internet quality');
                    console.error(reason);
            })
            .catch((reason)=> console.error(reason));

        }
    }

    getNextPage() { 

        const home_ctn = document.querySelector('.home-ctn');
        const home_ctn_childs = home_ctn.children;

        for (let i=2; i<home_ctn_childs.length; i++) {
            home_ctn_childs[i].style.transition = '2s ease-in-out';
            home_ctn_childs[i].style.display = 'none';
        }

        setTimeout(() => {
            // document.querySelector('#home').setAttribute('class','home-transition');  
            this.closeHomePage(); 

        }, 2000);

        new Provider( 'c9842f587841ab3d8440bdae432a3299' ).fetchWeatherByCityName( localStorage.getItem("defaultCityName") ); 
        document.querySelector('#cityName').innerText = localStorage.getItem('defaultCityName'); 
        document.querySelector('#city').innerText = localStorage.getItem('defaultCityName');         
    }

    closeHomePage() {
        document.querySelector('#home').style.display = 'none';    
        document.querySelector('#main-bloc').style.display = 'block';
        document.querySelector('.bloc-prevision').style.display = 'flex';
        document.querySelector('.container').style.display = 'block'; 

        localStorage.setItem("bool", 'true');

        // localStorage.setItem( "bool", 'false' ); 
        console.log( 'typeof :  localStorage.getItem("bool")' ,typeof localStorage.getItem("bool") );
        // this.getNextPage();  
    }
}

document.querySelector('#home-btn').addEventListener('click', function(){
    new Init().getParameter();
});
document.querySelector('#city').addEventListener('keyup', function(event) {
    if (event.key == "Enter")  
        new Init().getParameter();  
}); 

if ( window.localStorage.getItem('bool') == 'true' ) {
    new Init().closeHomePage()
}

if ( localStorage.getItem( 'defaultCityName' ) !== null ) {
    new Init().closeHomePage();
    new Init().getNextPage();
    document.querySelector('#home').setAttribute('class','home-transition'); 
    console.log('yesssss')
}







//1) ****** TIMER *****
function Reorganizer( days , months )
{ 
    this.days = days; // []  
    this.months = months ; // []  
} 

Reorganizer.prototype.displayDaysInorder = function()
{
    let daysInOrder, today, options, current_day;  
    today = new Date(); 
    options = {weekday: 'long'}; 
    current_day = today.toLocaleDateString('de-DE', options);      
    current_day = current_day.charAt(0).toUpperCase() + current_day.slice(1); 
    daysInOrder = this.days.slice( this.days.indexOf(current_day)+1 ).concat( this.days.slice(0, this.days.indexOf(current_day)+1)); 

    //print days in order in Forecast
    let day = document.querySelectorAll('.day');
    for (let i=0; i<day.length; i++) {
        day[i].innerText = daysInOrder[i];
    } 

    return daysInOrder; 
}
Reorganizer.prototype.changeHour = function( days_ordered ) 
{ 
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
            document.querySelector('p.hour').innerHTML = days_ordered[days_ordered.length-1] + ", "+ d.getDate() + " " + months[d.getMonth()]+ " " + d.getFullYear()+ `, <strong> ${h}:${min} </strong>` ;
        },
        1000
    );
}
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const reorganizeDays = new Reorganizer( days, months );
let daysInOrder = reorganizeDays.displayDaysInorder();  // default daysInOrder
reorganizeDays.changeHour( daysInOrder );






//2) ********  MENU_BAR_INTERACTIONS  *********
function MenuBarInteractions( openMenuBtn, closeMenuBtn ) 
{
    this.openMenuBtn = openMenuBtn;
    this.closeMenuBtn = closeMenuBtn;
}

MenuBarInteractions.prototype.openMenu = function openMenu() {  
    this.openMenuBtn.addEventListener('click', () => {
        document.querySelector('.menu').style.width = '350px'; 
        document.body.style.transition = '.3s ease-in-out'; 
        document.querySelector('.menu-header').style.display = 'block'; 
        document.querySelector('#standort-verwalten').style.display = 'block';
    });
}
MenuBarInteractions.prototype.closeMenu = function closeMenu() {
    this.closeMenuBtn.addEventListener('click', () => {
        document.querySelector('.menu').style.width = '0px'; 
        document.body.style.transition = '.3s ease-in-out';  
        document.querySelector('.menu-header').style.display = 'none';
        document.querySelector('#standort-verwalten').style.display = 'none';
    });
}
const menuInteraction = new MenuBarInteractions( document.querySelector('.menu-icon'), document.querySelector('.toclose-icon') );
menuInteraction.openMenu();
menuInteraction.closeMenu();








//4) *****  WORKDATA  ******
 class WorkData 
{
    constructor( data ) {
        this.data = data; 
    }

    displayCurrentWeather( data ) 
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
    
        document.querySelector('.weather').classList.remove('loading');  

        switch ( icon ) 
        {
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
    }

    displayHourlyForecast( data ) 
    {
        let d = new Date();
        let hour = d.getHours(); 

        let hourly_forecast = document.querySelectorAll('.hourly-forecast');
        let hourly = document.querySelectorAll('.hourly');
        let icon_hour = document.querySelectorAll('.icon-hour');
        let temp_hour = document.querySelectorAll('.temp-hour');  
        let humidity_hour = document.querySelectorAll('.humidity-hour');

        //every 1 hour
        for (let i=0 ; i < hourly_forecast.length; i++) 
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
    }

    displayDailyForecast( data )
    {
        let j = 0; 
        for (let i=1; i<=7 ; i++ ) 
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
    }

    search () {
        new Provider('c9842f587841ab3d8440bdae432a3299').fetchWeatherByCityName( document.querySelector('.search').value ) //pour recupérer le nom de la ville
        document.querySelector('.search').blur();
    } 
}




//5) ************* INIT **************
//  function Init() 
// {
//     // let bool = false;
// }
// Init.prototype.getParameter = function() 
// {
//     const defaultCityName = document.querySelector('#city').value; 
//     localStorage.setItem("bool", `false`); 
//     // let bool = new Boolean( localStorage.getItem("bool") );
//     // alert( bool instanceof Boolean);
//     bool = false;
//     counter = 1;

//     // if ( localStorage.getItem("bool") === 'false' ) 
//     if (bool == false || localStorage.getItem("bool") === 'false')
//     { 
//         // alert("la valeur de 'bool' est  ---> " + this.bool)
//         fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ new Provider('c9842f587841ab3d8440bdae432a3299').apiKey
//         ).then ( (res) => {
//             if ( res.ok ) { //request success
//                 localStorage.setItem("defaultCityName", defaultCityName); 
//                 document.querySelector('#home').setAttribute('class','home-transition'); 
//                 this.getNextPage();  
//             }
//             else {
//                 document.querySelector('.requied').style.display = 'block';
//                 window.setTimeout( function() {
//                     document.querySelector('.requied').style.display = 'none';
//                 },
//                 5000);
//             } 
            
//             bool = true;
//             localStorage.setItem( "bool", `${bool}` ); 
//         }, 
//         (reason) => {
//             window.alert('Check your Internet quality');
//             console.error(reason);
//         }).catch((reason)=> console.error(reason));

        
//     } else{
//         this.getNextPage();
//     }

    // if ( localStorage.getItem("bool") == 'true' )
    // if (bool == true) {
    //     document.querySelector('#home').style.display = 'none';    
    //     document.querySelector('#main-bloc').style.display = 'block';
    //     document.querySelector('.bloc-prevision').style.display = 'flex';
    //     document.querySelector('.container').style.display = 'block'; 

    //     // localStorage.setItem( "bool", 'false' ); 
    //     console.log( 'typeof :  localStorage.getItem("bool")' ,typeof localStorage.getItem("bool") );
    //     this.getNextPage();  
    // } 
// }
// Init.prototype.getNextPage = function() 
// { 
//     new Provider( 'c9842f587841ab3d8440bdae432a3299' ).fetchWeatherByCityName( localStorage.getItem("defaultCityName") ); 
//     document.querySelector('#cityName').innerText = localStorage.getItem('defaultCityName'); 
//     this.closeHomePage();
// } 
// Init.prototype.closeHomePage = function() {
    
//     document.querySelector('#home').style.display = 'none';    
//     document.querySelector('#main-bloc').style.display = 'block';
//     document.querySelector('.bloc-prevision').style.display = 'flex';
//     document.querySelector('.container').style.display = 'block'; 

//     // localStorage.setItem( "bool", 'false' ); 
//     console.log( 'typeof :  localStorage.getItem("bool")' ,typeof localStorage.getItem("bool") );
//     // this.getNextPage();  
// }




// if ( localStorage.getItem("bool") == 'true' ) {
//     document.querySelector('#home').style.display = 'none';    
//     document.querySelector('#main-bloc').style.display = 'block';
//     document.querySelector('.bloc-prevision').style.display = 'flex';
//     document.querySelector('.container').style.display = 'block'; 

//     // localStorage.setItem( "bool", 'false' ); 
//     console.log( 'typeof :  localStorage.getItem("bool")' ,typeof localStorage.getItem("bool") );
//     new Init().getNextPage();  
// } 
// else{
//     window.localStorage.setAttribute('bool', 'false');
// }






//6) *************  USER  **************
  

class User 
{
    constructor() {
        this.hasNewCityName = false; //the town name is not given
    }

    openInputField() { 
        // if ( this.hasNewCityName == false ) {
        //     document.querySelector('#menu-getinput').style.display = 'flex';
        //     // this.hasNewCityName = true;
        // } 
        // else  {
        //     document.querySelector('#menu-getinput').style.display = 'none';
        //     // this.hasNewCityName = false;
        // }  
        // if (hasNewCityName) {}
        standort_verwalten.addEventListener('click', function() { 
            document.querySelector('#menu-getinput').style.display = 'flex';     
            document.querySelector('#input-storage').focus();
        });

        submit.addEventListener('click', this.setDefaultTown);

        //actions on inner elements of menu 
        document.querySelector('.standort').addEventListener(
            'click',
            function() {
                const city = document.querySelector('.standort span').textContent ;
                new Provider('c9842f587841ab3d8440bdae432a3299').fetchWeatherByCityName(city);
            }
        ); 
    }

    setDefaultTown( newCityName ) {
        
        newCityName = document.querySelector('#input-storage').value;
        if ( newCityName == '') {
            document.querySelector('#menu-getinput').style.borderBottom = '2px solid red';
            this.hasNewCityName = true;
        } 
        else {
            new Init().getParameter();
            window.localStorage.setItem('defaultCityName', newCityName);

            document.querySelector('#menu-getinput').style.borderBottom = 'none';
            document.querySelector('.standort span').textContent = newCityName;
            document.querySelector('#input-storage').style.display = 'none';
            document.querySelector('#btn-storage').style.display = 'none'; 
            this.hasNewCityName = false;
        }
    }

    getWeather() {
        document.querySelector('.search-icon').addEventListener('click', (e) => { 
            if ( e.key == "Enter" ) { 
                if (document.querySelector('.search').value == '') {
                    alert("enter a city name");     
                }
                new WorkData().search();  
            }
            else if ( e.type == 'click' ) {
                if (document.querySelector('.search').value == '') {
                    alert("enter a city name");     
                }
    
                new WorkData().search(); 
            }
        });    
    }
}

const user = new User(); 
user.openInputField();
user.getWeather();



// standort_verwalten.addEventListener('click', user.openInputField); //standort_verwalten == setting (dans appStorage.js)
// submit.addEventListener('click', user.setDefaultTown);

// function errorTrigger(element) 
// {
//     element.style.border = '2px solid red';
//     element.style.boxShadow = '0px 0px 8px red';
//     window.setTimeout(function () {
//         element.style.border = '0px';
//         element.style.boxShadow = 'none';
//     }, 3000);
// }

