
const Btn = document.querySelector("#btn-buscar")


async function buscar() {
    const Input = document.querySelector("#entrada");
    const temP = document.querySelector('#temp-grau');
    const Name = document.querySelector('.city');
    
    const City_Name = Input.value;
    /* console.log(City_Name); */

    const key = "d33f5afc74f1d4644d60bb9d9c9ff7d8";

    const API_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(City_Name)}&appid=${key}&units=metric&lang=pt_br`);
    
    const json = await API_url.json();
    console.log(json);


    temP.innerHTML = json.main.temp;
    Name.innerHTML = City_Name;

}