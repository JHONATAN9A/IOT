import $ from "jquery";

import {generalGraficaHumedad} from '../graficas/grafica_humedad'
import {generalGraficaTemperatura} from '../graficas/grafica_temperatura'

let URL_API = "http://192.168.43.87/";

export function Get_Humedad_API(retunrdata){
    try{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(URL_API+"humedad", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            //console.log("Humedad:",result.valor,"%")
            retunrdata(result.valor)
            
        })
        .catch(error => console.log('error', error));

        
    }
    catch(error){
        console.log("El sensor no esta activo.")
        console.log("Error ==",error);

    }
}

export function Get_Temperatura_API(retunrdata){
    try{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(URL_API+"temperatura", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            //console.log("Temperatura:",result.valor,"°C")
            retunrdata(result.valor)
            
        })
        .catch(error => console.log('error', error));

        
    }
    catch(error){
        console.log("El sensor no esta activo.")
        console.log("Error ==",error);

    }
   
}


let StatusSystem = "Apagar";
$('#toggle').click(function(){
    console.log(StatusSystem)
    if(StatusSystem =="Apagar"){
        var raw = "{\r\n    data:\"Encender\"\r\n}";
        StatusSystem = "Encender";
    }
    else if(StatusSystem=="Encender"){
        var raw = "{\r\n    data:\"Apagar\"\r\n}";
        StatusSystem = "Apagar";
    }
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(URL_API+"OnOff", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
});

generalGraficaHumedad()
generalGraficaTemperatura()