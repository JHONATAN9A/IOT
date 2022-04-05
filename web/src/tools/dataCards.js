import { locationAPI } from './location'
import {ApiTemperatura} from './temperatura'

	

locationAPI(updateCards)

function updateCards(data){
    //Añadir la ciudad
    let cardCiudad = document.getElementById("card-ciudad");
    cardCiudad.innerHTML = data.city;

    //Añadir la fecha
    let time = new Date();
    let fecha = time.getDate() + '/' + (time.getMonth() + 1 ) + '/' + time.getFullYear();
    let cardfecha = document.getElementById("card-fecha");
    cardfecha.innerHTML = fecha;

    //Añadir la temperatura
    console.log(data)
    let temCard = document.getElementById("card-temperatura");
    ApiTemperatura(data.latitude,data.longitude,temCard);
    setInterval(function(){ApiTemperatura(data.latitude,data.longitude,temCard)}, 3600000);
    

}





