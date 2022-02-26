/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = ',us&appid=2ae186d64a2b75a97bb9b7b93ce8d1bb';
const units = '&units=imperial';

//Eventlistener related to the generate button which will call the generate function
document.getElementById('generate').addEventListener('click', generate);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();


//Generate function called by the eventlistener
function generate(e) {

    //zip code enetered by the user
    const zipCode = document.getElementById('zip').value;
    
    //data enetered by the user
    const feelings = document.getElementById('feelings').value;
    
    //call the fetchWeather function to get data from the weather api
    fetchWeather(baseURL, zipCode, apiKey, units)

    //----> chaining promises ! <--------
    //Send data retreived from the weather api to the server and update the UI based on these data
        .then(data => {
            //take a look at the data returned by the api   
            console.log(data)

            //Send the data to the app endpoint
            postData('/send', { date: newDate, temp: data.list[0].main.temp, content: feelings })
                
             //Update the UI after retrieving the data from the app endpoint
            .then(updateUI());
        })
};

//Connect to the weather api to get the data based on the zip code entered by the user
const fetchWeather = async (url, zipCode, key, units) => {

    const res = await fetch(url + zipCode + key + units);

    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(`Error!: ${error}`);
    }
};

//Functoin to send the data to the server via post request
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const postedData = await res.json();
        return postedData;
    } catch (error) {
        console.log(`Error!: ${error}`);
    }
}

//Update the UI after retreiving the data from the endpoint using a get request
const updateUI = async () => {
    const req = await fetch('/get');
    try {
        const returnedData = await req.json();
        console.log(returnedData);
        document.getElementById('date').innerHTML = `Date: ${returnedData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(returnedData.temp)} °`;
        document.getElementById('content').innerHTML = `Feeling: ${returnedData.content}`;
    } catch (error) {
        console.log(`Error!: ${error}`);
    }
};



