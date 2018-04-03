console.log("SUPERHEROES");

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroArray) => {
    let domString = "";
    for(let i=0; i<heroArray.length; i++){
        // domString += `<div class="heroCard">`;
        // domString +=    `<h2>${heroArray[i].id}</h2>`;
        // domString +=    `<h2>${heroArray[i].jobIds}</h2>`;
        // domString +=    `<h2>${heroArray[i].gender}</h2>`;
        // domString +=    `<h2>${heroArray[i].name}</h2>`;
        // domString +=    `<h2>${heroArray[i].description}</h2>`;
        // domString +=    `<img src="${heroArray[i].image}">`;
        // domString += `</div>`;
        domString += `<div class="col-md-3">`;
        domString += `<div class="panel">`;
        domString +=    `<div class="panel-heading">`;
        domString +=        `<h3 class="panel-title">${heroArray[i].name}</h3>`;
        domString +=    `</div>`;
        domString +=    `<div class ="panel-body">`;
        if(heroArray[i].gender === "Female"){
            domString += `<img class="charImage femaleCharImage" src="${heroArray[i].image}">`;
         } else{
                domString += `<img class="charImage maleCharImage" src="${heroArray[i].image}">`;
            }
        domString +=        `<p class="charDescription">${heroArray[i].description}</p>`;
        domString +=    `</div>`;
        domString += `</div>`;
        domString += `</div>`;
    }
    printToDom(domString, 'hero-holder');
}

function executeThisCodeIfXHRFails(){
    console.log("Problem!");
}

function executeThisCodeAfterFileLoaded (){
    const data = JSON.parse(this.responseText);
    buildDomString(data.superheroes);
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "../db/superheroes.json");  
    myRequest.send(); 
}

startApplication();