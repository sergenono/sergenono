
let lat, long;
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
        function(pos) {
            lat = pos.coords.latitude;
            long = pos.coords.longitude;
        },
        function() {
            alert("please active the geolocation")
        }
    )
} else {
    alert( "this browser do not support geolocation ")
} 

let prevision = {

    apiKey : 'c9842f587841ab3d8440bdae432a3299', 
    fetchWeather: function () {
        fetch( "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon=" + long + "&exclude=minutely&units=metric&appid="+ this.apiKey)
        .then ( (reponse) => reponse.json() )
        .then ( (data) => {
            this.displayForecast(data);
            console.log(data)
        })
    },
    displayForecast : function( data ) {
        let i=0;
        switch( new Date().getDay() ) {
            case 1: i = 1; break;
            case 2: i = 2; break;
            case 3: i = 3; break;
            case 4: i = 4; break;
            case 5: i = 5; break;
            case 6: i = 6; break; 
        }


        let j = 0;
        for (let i=2; i<=7; i++ ) {
            const { min, max } = data.daily[i].temp //les temperatures min et max
            const { icon } = data.daily[i].weather[0];
            const {  humidity, wind_speed} = data.daily[i];

            document.querySelectorAll('.temp-min-max')[j].innerText = Math.round(min) +"°/" + Math.round(max) + "°C";
            document.querySelectorAll('.icon-prevision')[j].src = "http://openweathermap.org/img/wn/"+ icon+ ".png";
            document.querySelectorAll('.humidity')[j].innerText = humidity + "%";
            document.querySelectorAll('.wind-speed')[j].innerText = wind_speed + " Km/h";

            j++;
            //verification------
            console.log( min, max, icon, humidity, wind_speed );
        }
        

        
        // let j = i;
        // for ( j=0; j<document.querySelectorAll('.day').length; j++ ) 
        // {
        //     document.querySelectorAll('.temp-min-max')[j].innerText = min +"°C - " + max + "°C";
        //     document.querySelectorAll('.icon-prevision')[j].src = "http://openweathermap.org/img/wn/"+ icon+ ".png";
        //     document.querySelectorAll('.humidity')[j].innerText = humidity + "%";
        //     document.querySelectorAll('.wind-speed')[j].innerText = wind_speed + "Km/h";
        // }
    }
}


// pour mettre toujours les jours en ordre en fonction du jour actuel
//
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
let daysInOrder, today,options, current_day; 
let d = new Date(); 

    today = new Date(); 
    options = {weekday: 'long'};//pour que le nom du jour actuelle soit écrit en 'long' caractere
    current_day = today.toLocaleDateString('de-DE', options); //le nom du jour sera en DE et en format 'long', z.B.: Samstag
    console.log("today: " + today + " current_day: " + current_day);
    
    current_day = current_day.charAt(0).toUpperCase() + current_day.slice(1, /*current_day.length*/);
    //.slice(from, to) nous renvoit une portion de chaine de caractere.
    
    //pour chaque jours courent, on renvoit le reste des jours apres via la méthode "contact(...)"
    daysInOrder = days.slice( days.indexOf(current_day)+1 ).concat( days.slice(0, days.indexOf(current_day)+1));     


    console.log( daysInOrder );


//afficher les jours prochains
    let day = document.querySelectorAll('.day');
    for (let i=0; i<day.length; i++) {
        day[i].innerText = daysInOrder[i];
    } 
