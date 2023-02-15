const cardContainer = document.querySelector(".cards-container")
const spinner = document.querySelector(".spinner")
const dark = document.querySelector(".dark-mode-btn")
const bodyEl = document.querySelector('body')

const api = 'https://restcountries.com/v3.1/all'

const request = new XMLHttpRequest();

const darkMode = () => {
  bodyEl.classList.toggle('dark')
}

dark.addEventListener('click', () => {

  setDarkMode = localStorage.getItem('dark');

  if(setDarkMode !== "on") {
      darkMode();

      setDarkMode = localStorage.setItem('dark', 'on');
  } else {
      darkMode();

      setDarkMode = localStorage.setItem('dark', null);
  }
});

let setDarkMode = localStorage.getItem('dark');


if(setDarkMode === 'on') {
  darkMode();
}

request.addEventListener("readystatechange", () => {
  if(request.readyState == 4 && request.status === 200) {
    spinner.classList.add("hidden")
    console.log(JSON.parse(request.responseText));
    JSON.parse(request.responseText).forEach((country) => {
      createCountry(country)
    })
  }
})

request.open('GET', api)
request.send()

function createCountry(obj){
  const {flags, name, population, region, capital} = obj
  const div = document.createElement("div");
  
  div.innerHTML = `
    
    <img src="${flags.svg}" class="card-img" />
    <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p><b>Population: ${population}</b></p>
        <p><b>Region: ${region} </b></p>
        <p>
            <b>Capital:${capital} </b>
        </p>
    </div>
</div>
    `;
    cardContainer.appendChild(div);
}

