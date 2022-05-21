let API_KEY = "f46f03acb27b3baa4049079f073d975a"


let username = 'universidaddecundinamarca_calderonrodriguez'
let password = '9U1eG1eIyV'

export let ApiTemperatura =(lat,long,div)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(temperatura => {
            try{
                let data = temperatura.main.temp;
                div.innerHTML = data + "°C";
            }
            catch{
                div.innerHTML = "---" + "°C"; 
            }
            
            
    });

}











/* let username= 'universidaddecundinamarca_calderonrodriguez'
let password= '9U1eG1eIyV'


export let ApiTemperatura =(lat,long,div)=>{
    
    fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', 
        headers: new Headers({
            'Authorization':'Basic ' + btoa(username + ":" + password),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
        credentials: "include"

    })
    .then(response => response.json())
    .then(token => {
        let token_api = token.access_token;
        let API_URL = 'https://api.meteomatics.com/now/t_2m:C/'+lat+','+long+'/json?access_token='+token_api
        fetch(API_URL,{mode: 'cors',credentials: 'include'})
        .then(response => response.json())
        .then(temperatura => {
            if(temperatura.status == "OK"){
                let value = temperatura.data[0].coordinates[0].dates[0].value;
                div.innerHTML = value + "°C";
            }
        });
    });
}; */