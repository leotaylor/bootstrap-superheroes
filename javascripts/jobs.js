
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = (heroArray) => {
    let domString = "";
    for(let i=0; i<heroArray.length; i++){
        domString += `<li>`;
        domString += `<a href="#" data-hero-id="${heroArray[i].id}">${heroArray[i].name}</a>`;
        domString += `</li>`;
    }
    printToDom(domString, 'awesome-dropdown');
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