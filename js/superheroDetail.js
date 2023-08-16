//fetch html element/node that we needed
const navigationAndSuperheroDetailContainer = document.getElementById('superhero-detail-and-navigation-container');

//get superhero from local storage as superheroDetail
const superheroDetail = JSON.parse(localStorage.getItem('superheroDetail'));

//function to add html to an  navigation And Superhero Detail Container
function createSuperheroContainer(superheroDetail){

    //getting seriesItems and stories item from superhero detail
    const seriesItems = superheroDetail.series.items;
    const storiesItems = superheroDetail.stories.items;

    //storing all series name in one string and separating each name with coma(,)
    let seriesName='';
     if(seriesItems.length>0 ){  
        for(let i=0;i<5 && i<seriesItems.length;i++){//getting only 5 series name(i<5)
            seriesName += seriesItems[i].name + ' , ';
           
        }
    }

    //storing all stories name in one string and separating each name with coma(,)
    let moviesName='';
    if(storiesItems.length>0 ){
        for(let i=0;i<5 && i<storiesItems.length;i++){//getting only 5 stories name(i<5)
            
            moviesName += storiesItems[i].name + ' , ';
        }
    }

    // adding html as child to   navigation And Superhero Detail Container
    navigationAndSuperheroDetailContainer.insertAdjacentHTML('afterbegin',`
        <!-- superhero container-->
        <div id="superhero-container">
            <div id="superhero-image-container">
                <img src="${superheroDetail.imgUrl}" alt="superheroDetail image">
            </div>    
            <div id="superhero-details-container" >
                <p  id="superhero-name"> <strong>Name: </strong><span> ${superheroDetail.name}</span></p>
                <p  id="superhero-description"><strong>Description: </strong><span>${superheroDetail.description}</span></p>
                <p  id="superhero-series"> <strong>Series:</strong><span>${seriesName}</span></p>
                <p  id="superhero-movies"><strong>Movies: </strong><span>${moviesName}</span></p>
                <p><medium id="">Last updated 3 mins ago</medium></p>
            </div>
        </div>
        <!-- navigation container-->  
    `);
}

//calling function with superhero detail to add html to an  navigation And Superhero Detail Container
if(superheroDetail == null || superheroDetail.length == 0){
    navigationAndSuperheroDetailContainer.insertAdjacentHTML('afterbegin',`
        <h1 style="color:white; text-decoration:none;">Please Select Character To Get-Details</h1>
    `);
}else{
    createSuperheroContainer(superheroDetail);
}


