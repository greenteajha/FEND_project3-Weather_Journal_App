// Indicate the API base URL and API key
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=7e82b5b181bdba284b3d7b1ec57992d5';

// Create an event listener for clicking the button
document.getElementById('generate').addEventListener('click', retrieveCity);

function retrieveCity(e){
  const cityName =  document.getElementById('city').value;
  getWeather(baseURL, cityName, apiKey)

  .then(function(data){
    //console.log(data.main.temp);
    postData('/addData', {temperature:data.main.temp});
  });
};

//Async function to request the API to return back the response based on the city name keyed in
const getWeather = async (baseURL, cityName, key)=>{
  
  const res = await fetch(baseURL+cityName+key)

  try {
    const data = await res.json();
    return data;    
  }catch(error) {
    console.log("error", error);
  }
}

//Async function to post JSON data to a given path route
const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },      
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error){
        console.log("error", error);
      }
  }