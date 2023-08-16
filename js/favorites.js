//favorites is an array that store all superhero that are added to favorite , get that array from local storage
let favorites = null;

//tell whether browser support local storage /feature/facility and get favorites array from local storage
if (typeof (Storage) !== 'undefined') {
    favorites = JSON.parse(localStorage.getItem('favorites'));//[{{},key},......]
} else {
    console.log('not supporting local storage');
}


//fetch html elements that we needed/require
const superheroListContainer = document.getElementById('superhero-list-container');
let superheroContainers = null;
let detailContainers = null;

//function create to fetch element when we call it , we call it after adding html+ with superhero data in html to  superheroListContainer as child 
function fetchElement() {
    superheroContainers = document.getElementsByClassName('superhero-container');
    detailContainers = document.querySelectorAll('.superhero-detail-and-remove-link a');
}


if (favorites == null || favorites.length == 0) {
    //when nothing in favorite or favorite is null
    superheroListContainer.insertAdjacentHTML('beforeend', `<h1 style="color:white; text-decoration:none">"You Haven't Any Favourite Superhero Yet"</h1>`);
} else {
    //when local storage not having favorites as key it return null,So for that we set an check
    //iterate all favorites and make call to  createSuperheroContainer() function with argument as superhero data(obj)
    for (let i = 0; i < favorites.length; i++) {
        createSuperheroContainer(favorites[i]);
    }
    fetchElement();///fetch html elements that we just created by  createSuperheroContainer() function  
}

//on click remove superHero container
function removeCharacter(id) {
    //getting all superhero Containers
    const superheroContainers = document.getElementsByClassName('superhero-container');

    //remove that superhero container that id match with given parameter "id"
    let characterNode = null;
    for (let i = 0; i < superheroContainers.length; i++) {
        if (superheroContainers[i].getAttribute('value') == id) {
            characterNode = superheroContainers[i];
        }
    }

    //access parent and remove child
    characterNode.parentNode.removeChild(characterNode);//character node parent node return than child of parent remove

    //remove superhero from local storage in favorite(obj)
    favorites = favorites.filter(element => element.id != id);
    localStorage.setItem('favorites', JSON.stringify(favorites));

}

//creating function set superhero to local storage  as key characterDetail,so use that data in superheroDetail.html
function setCharacterToLocalStorageOfCharacterDetail(id) {

    //getting superhero from favorites array by id
    const character = favorites.filter(element => element.id == id);

    //on click we set corresponding superhero data to superheroDetail,so each time when click happen we will create new superheroDetail field/key in local storage
    localStorage.removeItem('superheroDetail')
    localStorage.setItem('superheroDetail', JSON.stringify(character[0]));

    // load this url in browser
    location.href = `./superheroDetail.html?characterId=${id}`;

}

//This function id use to add html to superhero List Container (with in html adding superhero data)
function createSuperheroContainer(superheroData) {

    superheroListContainer.insertAdjacentHTML('beforeend', `
        <div class="superhero-container" value="${superheroData.id}">
            <div class="superhero-image-container">
            <img src="${superheroData.imgUrl}" alt="superhero character image" />
            </div>
            <div class="superhero-body-container">
                <p class="superhero-name-container">${superheroData.name}</p> 
            </div>
            <div class="superhero-detail-and-remove-link">
                <a onClick="setCharacterToLocalStorageOfCharacterDetail(${superheroData.id})">Get-Detail</a>
                <span class="remove-from-favorites" onClick="removeCharacter(${superheroData.id})"><i class="fa-solid fa-trash"></i></span>
            </div> 
        </div> 
    `);
}

     