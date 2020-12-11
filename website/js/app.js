// Indicate the API base URL and API key
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=7e82b5b181bdba284b3d7b1ec57992d5';

// Create an event listener for clicking the button
document.getElementById('generate').addEventListener('click', retrieveZipCode);

// Function to retrieve weather data through API
function retrieveZipCode(e){
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

// Chaining promise...
  getWeather(baseURL, zipCode, apiKey)
  .then(function(data){
    //console.log(data.dt);
    postData('/addData', {temperature:data.main.temp, date: data.dt, feeling:feelings});
    updateUI();
  })
};

// Async function to update the user interface after retrieving the data from the server
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    // Update UI
    let counter = 1;
    const cardContainer = document.getElementById('entryHolder');
    cardContainer.innerHTML = '';

    for(const eachEntry of allData){
      console.log(eachEntry);
      console.log(counter);
      let card = document.createElement('div');
      card.setAttribute('id','card'+counter);
      card.setAttribute('class','card');
      let cardTemp = document.createElement('div');
      cardTemp.setAttribute('id','temp'+counter);
      cardTemp.setAttribute('class','temp');
      cardTemp.innerHTML = (Math.round(eachEntry.temperature - 273)) + " &#x2103";
      let cardContent = document.createElement('div');
      cardContent.setAttribute('id','content'+counter);
      cardContent.setAttribute('class','content');
      cardContent.innerHTML = "I'm feeling: " + eachEntry.feelings;
      let cardDate = document.createElement('div');
      cardDate.setAttribute('id','date'+counter);
      cardDate.setAttribute('class','date');
      cardDate.innerHTML = new Date(eachEntry.entryDate * 1000).toDateString();
      card.appendChild(cardDate);
      card.appendChild(cardTemp);
      card.appendChild(cardContent);
      cardContainer.appendChild(card);
      counter += 1;
    }
    //document.getElementById('temp').innerHTML = celciusTemp+" Degrees Celcius";
    //document.getElementById('content').innerHTML = allData[0].feelings;
    //document.getElementById('date').innerHTML = currentDate;

  }catch(error){
    console.log("error", error);
  }
}

//Async function to request the API to return back the response based on the city name keyed in
const getWeather = async (baseURL, zipCode, key)=>{
  
  const res = await fetch(baseURL+zipCode+key)

  try {
    const data = await res.json();
    //console.log(data);
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