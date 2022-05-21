const API_URL = 'https://freegeoip.app/json/'

export let  locationAPI = (updateCards) => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        updateCards(data)
    });
    
}

