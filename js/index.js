
const searchBox = document.querySelector('#search-container form input');
const searchBtn = document.querySelector('#search-container form button');
const superheroListContainer = document.getElementById('superhero-list-container');


searchBox.addEventListener('keyup', function () {
    //getting text/superhero name start with or exact name from search box
    const input = searchBox.value;
    if (input) {//input!=''
        getSuperherosNameStartsWith(input);
    }
});

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    //getting text/superhero exact name from search box
    const input = searchBox.value;
    if (input) {
        getSuperherosByExactName(input);
    }

});

function getSuperherosDetails() {
    fetch(`https://gateway.marvel.com/v1/public/characters?&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
        .then((response) => {
            const data = response.json();//returun promise
            return data;
        }).then((responseData) => {
            //get results array from response that having all superhero data
            const results = responseData.data.results;
            //remove all superhero container of old search,on getting new superhero from api request
            while (superheroListContainer.firstChild) {
                superheroListContainer.removeChild(superheroListContainer.lastChild)
            }

            // setting  array an local storage favorites array,so use it for mark favorite always with red star
            favoriteSuperheros = JSON.parse(localStorage.getItem("favorites"));


            //creating container  for superhero, for all superhero we get from API request
            for (let i = 0; i < results.length; i++) {

                //finding current superhero(results[i]) is already in our favorite or not
                let isFavorite = false;
                if (favoriteSuperheros !== null && favoriteSuperheros.length > 0) {//null means no favorites in local storage 
                    //finding or  filtering  out from favoriteSuperheros array, is  that current superhero(results[i]) is  present in  this array or not  
                    const character = favoriteSuperheros.filter((e) => results[i].id == e.id);

                    // if current superhero is present in array, that id not null or is favorite is true than we do isFavorite - true
                    if (character[0] && character[0].id !== null && character[0].addToFavorite === true) {//null when value in superhero container not present
                        isFavorite = true;
                    }
                }

                //This function id use to add html to superhero List Container (with in html adding superhero data)
                function createSuperheroContainer(character) {//
                    //getting all data that we needed to display in html page
                    const id = character.id;
                    const name = character.name;
                    const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                    const description = character.description;
                    const series = character.series;
                    const stories = character.stories;

                    //adding html to superhero List Container
                    superheroListContainer.insertAdjacentHTML('beforeend', `
                <div class="superhero-container">
                    <div class="superhero-image-container">
                        <img src="${imgUrl}" alt="superhero image" >
                    </div>
                    <div class="superhero-body-container">
                        <p class="superhero-name-container">${name}</p>
                    </div>
                    <div class="superhero-detail-link">
                        <a onClick='setCharacterToLocalStorageOfCharacterDetail(${id})'>Get-Detail</a>
                        <span class="add-to-favorite">${isFavorite ? `<i class="fa-solid fa-heart" style="color:red"></i>` : `<i class="fa-solid fa-heart" style="color:white"></i>`}</span>
                    </div>     
                </div>
                `);
                    //fetch element and setting value  attribute  an superhero entire data that we need in all 3 pages
                    superheroContainers = document.getElementsByClassName('superhero-container');
                    superheroContainers[i].setAttribute("value", JSON.stringify({ id, name, imgUrl, description, series, stories }));

                }
                //call the function for each superhero
                createSuperheroContainer(results[i]);
            }
            //fetch elements/nodes that added by js to dom and also add event listener to some of them
            fetchElement();

            //  if response.data.results array is empty, so remove all node from dom and add an text to  superheroListContainer no superhero exists  
            if (results.length === 0) {
                while (superheroListContainer.firstChild) {
                    superheroListContainer.removeChild(superheroListContainer.lastChild)
                }
                superheroListContainer.insertAdjacentHTML('afterbegin', `<h1 style="color:white;">No Superhero Exists With Name: "${input}"</h1>`);
                return;
            }
        })
        .catch((err) => {
            console.log("error while api request-response", err);
        });
}
getSuperherosDetails();

// This function use to call API to getting superheros whom Name Starts With argument pass to this function   
function getSuperherosNameStartsWith(input) {

    fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
        .then((response) => {

            const data = response.json();//returun promise
            return data;

        }).then((responseData) => {
            //get results array from response that having all superhero data
            const results = responseData.data.results;

            //remove all superhero container of old search,on getting new superhero from api request
            while (superheroListContainer.firstChild) {
                superheroListContainer.removeChild(superheroListContainer.lastChild)
            }

            // setting  array an local storage favorites array,so use it for mark favorite always with red star
            favoriteSuperheros = JSON.parse(localStorage.getItem("favorites"));


            //creating container  for superhero, for all superhero we get from API request
            for (let i = 0; i < results.length; i++) {

                //finding current superhero(results[i]) is already in our favorite or not
                let isFavorite = false;
                if (favoriteSuperheros !== null && favoriteSuperheros.length > 0) {//null means no favorites in local storage 
                    //finding or  filtering  out from favoriteSuperheros array, is  that current superhero(results[i]) is  present in  this array or not  
                    const character = favoriteSuperheros.filter((e) => results[i].id == e.id);

                    // if current superhero is present in array, that id not null or is favorite is true than we do isFavorite - true
                    if (character[0] && character[0].id !== null && character[0].addToFavorite === true) {//null when value in superhero container not present
                        isFavorite = true;
                    }
                }

                //This function id use to add html to superhero List Container (with in html adding superhero data)
                function createSuperheroContainer(character) {//
                    //getting all data that we needed to display in html page
                    const id = character.id;
                    const name = character.name;
                    const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                    const description = character.description;
                    const series = character.series;
                    const stories = character.stories;

                    //adding html to superhero List Container
                    superheroListContainer.insertAdjacentHTML('beforeend', `
                <div class="superhero-container" value="">
                    
                    <div class="superhero-image-container">
                        <img src="${imgUrl}" alt="superhero image" >
                    </div>
                    <div class="superhero-body-container">
                        <p class="superhero-name-container">${name}</p>
                        
                    </div>
                    <div class="superhero-detail-link">
                        <a onClick='setCharacterToLocalStorageOfCharacterDetail(${id})'>Get-Detail</a>
                        <span class="add-to-favorite">${isFavorite ? `<i class="fa-solid fa-heart" style="color:red"></i>` : `<i class="fa-solid fa-heart" style="color:white"></i>`}</span>
                    </div>     
                </div>
                `);
                    //fetch element and setting value  attribute  an superhero entire data that we need in all 3 pages
                    superheroContainers = document.getElementsByClassName('superhero-container');
                    superheroContainers[i].setAttribute("value", JSON.stringify({ id, name, imgUrl, description, series, stories }));

                }
                //call the function for each superhero
                createSuperheroContainer(results[i]);
            }
            //fetch elements/nodes that added by js to dom and also add event listener to some of them
            fetchElement();

            //  if response.data.results array is empty, so remove all node from dom and add an text to  superheroListContainer no superhero exists  
            if (results.length === 0) {
                while (superheroListContainer.firstChild) {
                    superheroListContainer.removeChild(superheroListContainer.lastChild)
                }
                superheroListContainer.insertAdjacentHTML('afterbegin', `<h1 style="color:white; text-decoration:none;">No Superhero Exist With Name:- "${input}"</h1>`);
                return;
            }
        })
        .catch((err) => {
            console.log("error while api request-response", err);
        });
}

// This function is used to call API to getting superhero by exact name (only one superhero got by API)
function getSuperherosByExactName(input) {

    fetch(`https://gateway.marvel.com/v1/public/characters?name=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
        .then((response) => {
            const data = response.json();
            return data;
        }).then((responseData) => {
            //only one element inside this resulting array,i=0
            const results = responseData.data.results;
            favoriteSuperheros = JSON.parse(localStorage.getItem("favorites"));
            
            while (superheroListContainer.firstChild) {
                superheroListContainer.removeChild(superheroListContainer.lastChild)
            }

            // if response.data.results array is empty so remove all node from dom and add an text to  superheroListContainer no superhero exists with given name
            if (results.length === 0) {
                while (superheroListContainer.firstChild) {
                    superheroListContainer.removeChild(superheroListContainer.lastChild)
                }
                superheroListContainer.insertAdjacentHTML('afterbegin', `<h1 style="color:white; text-decoration:none;">No Superhero Exist With Name:- "${input}"</h1>`);
                return;
            }
         
            //finding current superhero(results[i]) is already in our favorite or not
            let isFavorite = false;
            if (favoriteSuperheros !== null && favoriteSuperheros.length > 0) {//null no fav in local storage line 143
                //finding or  filtering  out from favoriteSuperheros array, is  that current superhero(results[i]) is  present in  this array or not  
                const character = favoriteSuperheros.filter((e) => results[0].id == e.id);//(results[0].id)string==number(characterId),not use ===

                // if current superhero is present in array, that id not null or is addToFavorite is true than we do isFavorite - true
                if (character[0] && character[0].id !== null && character[0].addToFavorite === true) {//null when value in superhero container not present
                    isFavorite = true;
                }
            }

            function createSuperheroContainer(character) {//${} display any variable  
                //getting all data that we needed to display in html page
                const id = character.id;
                const name = character.name;
                const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                const description = character.description;
                const series = character.series;
                const stories = character.stories;

                //adding html to superhero List Container
                superheroListContainer.insertAdjacentHTML('beforeend', `
            <div class="superhero-container" value="">
                <div class="superhero-image-container">
                    <img src="${imgUrl}" alt="superhero image" >    
                </div>
                <div class="superhero-body-container">
                    <p class="superhero-name-container">${name}</p>                    
                </div>   
                <div class="superhero-detail-link">
                    <a onClick='setCharacterToLocalStorageOfCharacterDetail(${id})'>Get-Detail</a>
                    <span class="add-to-favorite">${isFavorite ? `<i class="fa-solid fa-heart" style="color:red"></i>` : `<i class="fa-solid fa-heart" style="color:white"></i>`}</span>
                </div>    
            </div>
            `);
                //fetch element and setting value  attribute  an superhero entire data that we need in all 3 pages
                superheroContainers = document.getElementsByClassName('superhero-container');
                superheroContainers[0].setAttribute("value", JSON.stringify({ id, name, imgUrl, description, series, stories }));
            }
            //call the function for each superhero
            createSuperheroContainer(results[0]);
            //fetch elements/nodes that added by js to dom and also add event listener to some of them
            fetchElement();
        })
        .catch((err) => {
            console.log("error while api request-reasponse", err);
        });
}

//an array where we store all favorite superhero as obj inside it
let favoriteSuperheros = [
    //  {
    // id:"34",
    // imgUrl:"url",
    // name:"iron-man",
    // description:"",
    // series:,
    // stories:.
    // addToFavorite:false
    // }
];

///this all element fetch after add html element / node to dom using js (after api call)
//initially we don't know the value so we initialize to all with null(nothing)
let superheroContainers = null;
let charactersName = null;
let charactersImage = null;
let favoriteBtn = null;
let characterDetail = null;

//function create to fetch element when we call it , we call it after adding html and superhero data in html(superhero container for all superhero) to  superheroListContainer 
function fetchElement() {

    superheroContainers = document.getElementsByClassName('superhero-container');
    charactersName = document.getElementsByClassName('superhero-name-container');
    charactersImage = document.querySelectorAll('.superhero-image-container img');
    favoriteBtn = document.querySelectorAll('.add-to-favorite i');
    characterDetail = document.querySelectorAll('.superhero-detail-link a');

    //adding  event listener to all add to favorite buttons
    for (let i = 0; i < favoriteBtn.length; i++) {
        favoriteBtn[i].addEventListener('click', function () {

            //on click favorite button(star) will become red
            favoriteBtn[i].setAttribute('class', 'fa-solid fa-heart');
            favoriteBtn[i].style.color = 'red';

            //getting all data from superhero container(where we set all data in value attribute)
            const favoriteSuperherosData = JSON.parse(superheroContainers[i].getAttribute("value"));//value=as string obj store ='{"id":"987",}'

            //find whether favoriteSuperhero present in favorite in local storage or not
            let presentInFavoriteSuperheros = null;

            //favorite character array==null when not set up local storage for favorites ,during api response when favoriteSuperheros array as favoriteSuperheros=JSON.parse(localStorage.getItem("favorites"));
            if (favoriteSuperheros !== null) {
                presentInFavoriteSuperheros = favoriteSuperheros.filter((e) => e.id === favoriteSuperherosData.id);
            } else {
                //when favorite characters array is null(that we get from local storage),we make it empty array and add new favorite superhero in it than add to local storage
                favoriteSuperheros = [];
            }
            //adding an superhero to favorite character array than to local storage
            //superhero not present in favorite superhero array
            if (!presentInFavoriteSuperheros || presentInFavoriteSuperheros.length === 0) {
                favoriteSuperherosData.addToFavorite = true;
                favoriteSuperheros.unshift(favoriteSuperherosData);//character = an obj entire character detail in this obj

                window.localStorage.setItem("favorites", JSON.stringify(favoriteSuperheros));
            }
        });
    }
}

//create an function that set in onClick attribute of an element, to set all data of an superhero to local storage so we can use it in superheroDetails.html page
function setCharacterToLocalStorageOfCharacterDetail(id) {

    //finding superhero Containers that having value attribute having id = our parameter id
    let superheroData = null;
    for (let i = 0; i < superheroContainers.length; i++) {
        if (JSON.parse(superheroContainers[i].getAttribute('value')).id == id) {
            superheroData = superheroContainers[i].getAttribute('value');//already in string form
        }
    }


    //remove each time before any click we will remove item from local storage,at once we can show on superhero detail
    localStorage.removeItem('superheroDetail');

    localStorage.setItem('superheroDetail', superheroData);//storing in local storage
    location.href = `./superheroDetail.html?characterId=${id}`;//location load this url in browser

}



