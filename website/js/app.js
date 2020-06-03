
// The base URL and the API key recieved from the openWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&APPID=';

// Create a date object
const date = new Date();
const dateToday = `Today's date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

// Define a GET function to bring the weather data from the API
const getWeatherData = async (baseURL, zipCode, key) => {
	const dataFetch = await fetch(baseURL + zipCode + key);
	try {
			// transfer the fetched data to json format
			const apiData = await dataFetch.json();
			console.log(apiData);
			return apiData;
		} catch(error) {
			console.log('Error is: ', error);
		}
};


// Define a POST function to post the data to the endpoint object in the app
const postWeatherData = async (url='', data = {}) => {
	const req = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			"content-Type": 'application/json'
		},
		body: JSON.stringify({
			date: data.date,
			temp: data.temp,
			content: data.content
		})
	});
	console.log(data);
	try {
		const postData = await req.json();
		console.log(postData);
		return postData;
	} catch(error) {
		console.log('Error is: ', error);
	}
};


// Define a function to udate the DOM and show results to the user
const updateUI = async () => {
	const result = await fetch('/all');
	try {
		const finalData = await result.json();
		console.log(finalData);
		document.getElementById("entry").style.display = "block";
		document.getElementById('date').innerHTML = ` <p> ${finalData.date} </p>`;
		document.getElementById('temp').innerHTML = ` <p> Tempreature: ${(finalData.tempreature - 273.15).toFixed(1)} Celsius </p>`;
		document.getElementById('content').innerHTML = ` <p> Your feelings for today: ${finalData.userContent} </p>`;
	} catch(error) {
		console.log('Error is: ', error);
	}
}


// Adding a click event listener to the generate button element
document.getElementById('generate').addEventListener('click', accessApi);
function accessApi(event) {
	event.preventDefault();
	// The input values given by the user
	const zipCode = document.getElementById('zip').value;
	const userInpFeel = document.getElementById('feelings').value;
	getWeatherData(baseURL, zipCode, key).then(function(apiData) {
		postWeatherData('/addData', {
	  	date: dateToday,
		temp: apiData.main.temp,
		content: userInpFeel
		})
	}).then(function(postData) {
		updateUI();
	})
	document.querySelector(".app-form").reset();
}



