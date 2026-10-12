
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
    

    const key = "d33f5afc74f1d4644d60bb9d9c9ff7d8";

    const API_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(City_Name)}&appid=${key}&units=metric&lang=pt_br`);

    const json = await API_url.json();
    console.log(json);


    temP.innerHTML = Math.floor(json.main.temp);
    Name.innerHTML = json.name;
    Sky.innerHTML = json.weather[0].description;
    Veloc.innerHTML = json.wind.speed;
    Humad.innerHTML = json.main.humidity;
    Felling_tem.innerHTML = json.main.feels_like;
    Press.innerHTML = json.main.pressure;
    Up.innerHTML = json.main.temp_max;
    Down.innerHTML = json.main.temp_min;
    Country.innerHTML = json.sys.country;
    const iconCode = json.weather[0].icon;
    document.querySelector('.iconURL').src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    
   const localTime = new Date(
    Date.now() + json.timezone * 1000
);

    document.querySelector('.date').textContent =
        localTime.toLocaleDateString("pt-PT", {
            timeZone: "UTC",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    document.querySelector('.time').textContent =
        localTime.toLocaleTimeString("pt-PT", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

const lat = json.coord.lat;
const lon = json.coord.lon;

const astroAnswer = await fetch(
    `https://api.sunrise-sunset.org/v2?lat=${lat}&lng=${lon}`
);

const astroInfo = await astroAnswer.json();
const astro = astroInfo.results ?? astroInfo;

function formatAstroTime(value) {
    if (!value) return "N/A";

    return new Date(value).toLocaleTimeString("pt-PT", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: astroInfo.tzid || "UTC"
    });
}


document.querySelector("#sunrise").textContent =
    "Rise " + formatAstroTime(astro.sunrise);

document.querySelector("#sunset").textContent =
    "Set " + formatAstroTime(astro.sunset);

document.querySelector("#moonrise").textContent =
    "Rise " + formatAstroTime(astro.moonrise);

document.querySelector("#moonset").textContent =
    "Set " + formatAstroTime(astro.moonset);


const uvResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`
);

const uvData = await uvResponse.json();

document.querySelector('.index-text').textContent =
    uvData.value ?? "N/A";


const rainResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(City_Name)}&appid=${key}`
);

const rainData = await rainResponse.json();

const rainChance = rainData.list?.[0]?.pop;

document.querySelector('.rain-text').textContent =
    rainChance != null
        ? Math.round(rainChance * 100) + "%"
        : "N/A";


}
Btn.addEventListener("click", buscar);

document.querySelector("#entrada").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        buscar();
    }
});