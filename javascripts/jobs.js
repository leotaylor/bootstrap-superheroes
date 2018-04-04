let selectedHero = "";

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroArray) => {
    let domString = "";
    for(let i=0; i<heroArray.length; i++){
        domString += `<li>`;
        domString += `<a class="hero-name" data-hero-id="${heroArray[i].id}">${heroArray[i].name}</a>`;
        domString += `</li>`;
    }
    printToDom(domString, 'awesome-dropdown');
}

const selectHero = (e) => {
    selectedHero = e.target.dataset.heroId;
    document.getElementById("awesome-button").classList.add("hide");
    genericHeroRequest(loadfileforSingleHero);
}

const addHeroSelectionEventListeners = () =>{
    const heroNames = document.getElementsByClassName("hero-name");
    for(let i=0; i<heroNames.length; i++){
        heroNames[i].addEventListener('click', selectHero);
    }
};

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selected-hero");
  };

function loadfileforSingleHero(){
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes); 
}

function executeThisCodeIfXHRFails(){
    console.log("Problem!");
}

function executeThisCodeAfterFileLoaded (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
    addHeroSelectionEventListeners();
}

const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", successFunction);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "../db/superheroes.json");  
    myRequest.send(); 
};

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
};

startApplication();