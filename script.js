
const Btn = document.querySelector("#btn-buscar")


async function buscar() {
    const Input = document.querySelector("#entrada");
    const temP = document.querySelector('#temp-grau');
    const Name = document.querySelector('.city');
    const Sky = document.querySelector('.sky');
    const Veloc = document.querySelector('#veloc');
    const Humad = document.querySelector('#humad');
    const Felling_tem = document.querySelector('#tem-fell');
    const Press = document.querySelector('#pressure');
    const Up = document.querySelector('#up');
    const Down = document.querySelector('#down');
    const Country = document.querySelector('.country');

    const City_Name = Input.value;
    /* console.log(City_Name); */

    const key = "d33f5afc74f1d4644d60bb9d9c9ff7d8";

    const API_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(City_Name)}&appid=${key}&units=metric&lang=pt_br`);

    const json = await API_url.json();
    console.log(json);


    temP.innerHTML = Math.floor(json.main.temp);
    Name.innerHTML =  json.name; 
    Sky.innerHTML = json.weather[0].description;
    Veloc.innerHTML = json.wind.speed;
    Humad.innerHTML = json.main.humidity;
    Felling_tem.innerHTML = json.main.feels_like;
    Press.innerHTML = json.main.pressure;
    Up.innerHTML = json.main.temp_max;
    Down.innerHTML = json.main.temp_min;
    Country.innerHTML = json.sys.country;
    



}