let username= 'universidaddecundinamarca_calderonrodriguez'
let password= '9U1eG1eIyV'
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));


export let ApiTemperatura =(lat,long,div)=>{
    
    fetch('https://login.meteomatics.com/api/v1/token', {
        method: 'GET', headers: headers
    })
    .then(response => response.json())
    .then(token => {
        let token_api = token.access_token;
        let API_URL = 'https://api.meteomatics.com/now/t_2m:C/'+lat+','+long+'/json?access_token='+token_api
        fetch(API_URL)
        .then(response => response.json())
        .then(temperatura => {
            if(temperatura.status == "OK"){
                let value = temperatura.data[0].coordinates[0].dates[0].value;
                div.innerHTML = value + "°C";
            }
        });
    });
};