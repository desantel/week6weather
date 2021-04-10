const submitBtn = document.getElementById("submit")
const textBox = document.getElementById("location")
let currentBox = document.getElementById("currentWeather")
let fiveDay = document.getElementById("fiveDay")
let prevBox = document.getElementById("previous")
let prevList = document.getElementsByClassName("prevSearches")
let prevSearch = [];


document.addEventListener("DOMContentLoaded", function () {
    let prevSearches = JSON.parse(localStorage.getItem("search"));
    if (prevSearches !== null) { prevSearch = prevSearches }
    console.log(prevSearch)
})



submitBtn.addEventListener("click", ev => {
    currentBox.innerHTML = "";
    fiveDay.innerHTML = "";
    prevBox.innerHTML="Previous Cities";
    ev.preventDefault();
    console.log("Searching for city stats");
    let city = textBox.value.trim()
    currentTemp(city);
    laterTemp(city);
    storeSearch(city);
})

function currentTemp(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?APPID=931e2e7e3b7762c7d6138fd8ce3824a7&units=imperial&q=";
    url = url.concat(city);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url)

            let cityName = document.createElement("h4");
            let cityTemp = document.createElement("p");
            let cityWind = document.createElement("p");
            let cityFl = document.createElement("p");
            let icon = document.createElement("img");
            let icnLink = data.weather[0].icon;
            let imgSrc = "https://openweathermap.org/img/w/" + icnLink + ".png";
            icon.setAttribute("src", imgSrc)
            console.log(imgSrc)

            cityName.textContent = data.name + " (" + moment().format("M/D/YYYY") + ")" + " "
            currentBox.appendChild(cityName);
            currentBox.appendChild(icon);

            cityTemp.textContent = "Temperature: " + data.main.temp + " F"
            currentBox.appendChild(cityTemp)

            cityFl.textContent = "Feels Like: " + data.main.feels_like + " F"
            currentBox.appendChild(cityFl)

            cityWind.textContent = "Wind Speed: " + data.wind.speed + " MPH"
            currentBox.appendChild(cityWind)

        })
        .catch(err => {
            console.error(err)
        })
}

function laterTemp(city) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?APPID=931e2e7e3b7762c7d6138fd8ce3824a7&units=imperial&q=";
    url = url.concat(city);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url)
            for (let i = 0; i < data.list.length; i += 8) {
                console.log(i)
                let div = document.createElement("div");
                let futName = document.createElement("p");
                let futTemp = document.createElement("p");
                let futHum = document.createElement("p");

                let icon = document.createElement("img");
                let icnLink = data.list[i].weather[0].icon;
                let imgSrc = "https://openweathermap.org/img/w/" + icnLink + ".png";
                icon.setAttribute("src", imgSrc)

                futName.textContent = data.list[i].dt_txt
                div.setAttribute("class", "col-2")
                div.appendChild(futName)
                div.appendChild(icon)

                futTemp.textContent = "Temp: " + data.list[i].main.temp + " F"
                div.appendChild(futTemp);

                futHum.textContent = "Humidity: " + data.list[i].main.humidity + "%"
                div.appendChild(futHum)

                fiveDay.appendChild(div)

            }
        })
        .catch(err => {
            console.error(err)
        })
};

function storeSearch(city) {
    prevSearch.push(city)
    console.log(prevSearch)
    localStorage.setItem("search", JSON.stringify(prevSearch));
    for (let i = 0; i < 8; i++) {
        let li = document.createElement("li")
        li.setAttribute("value", prevSearch[i])
        li.setAttribute("class", "prevSearches")
        li.textContent = prevSearch[i]
        prevBox.appendChild(li)

        li.addEventListener("click", function (ev) {
            currentBox.innerHTML = "";
            fiveDay.innerHTML = "";
            // ev.target
            let city = ev.target.getAttribute("value")
            console.log(ev.target.getAttribute("value"))
            currentTemp(city)
            laterTemp(city)
        })
    }
}


// let textBox = document.getElementById("location");
// let api = "https://api.openweathermap.org/data/2.5/weather?q=";
// let apiKey = "&APPID=931e2e7e3b7762c7d6138fd8ce3824a7&units=imperial";
// let submitBtn = document.getElementById("submit")
// let forcastApi = "https://api.openweathermap.org/data/2.5/forecast?q=";


// submitBtn.addEventListener("click", function (event) {
//     event.preventDefault()
//     console.log(textBox.value);
//     let textCity = textBox.value
//     let requestUrl = api + textCity + apiKey;
//     let forecastUrl = forcastApi + textCity + apiKey;



//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(requestUrl)
//             console.log(data.main.temp)
//             const list = data;
//             for (let i = 0; i < list.length; i++) {

//                 var createTitle = document.createElement('h5');
//                 let createDetails = document.createElement('p');
//                 let createUrl = document.createElement('li');


//                 // createTitle.textContent = list[i].name;
//                 // document.getElementById("currentWeather").appendChild(createTitle);
//                 createDetails.textContent = list[i].main.temp;
//                 document.getElementById("currentWeather").appendChild(createDetails)
//             };


//         })

//     fetch(forecastUrl)

//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(forecastUrl);
//             console.log(data.list.dt_txt);
//             const focastList = data;
//             for (let i = 0; i < focastList.lenth; i++) {

//                 let createHourly = document.createElement("p");

//                 createHourly.textContent - focastList[i].list.main.temp;
//                 document.getElementById("hourly").appendChild(createHourly)
//             };
//         })
// })
