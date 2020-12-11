/*let baseURL = 'api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=7e82b5b181bdba284b3d7b1ec57992d5';

document.getElementById('generate').addEventListener('click', retrieveCity);

function retrieveCity(e){
  const cityName =  document.getElementById('city').value;
  getWeather(baseURL, cityName, apiKey)
}

const getWeather = async (baseURL, cityName, key)=>{
  console.log(baseURL+cityName+key);
  const res = await fetch(baseURL+cityName+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}*/

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

postData('/', {answer:42});
//postData('/', {happy:22});