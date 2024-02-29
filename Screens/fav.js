(() => {

console.log(localStorage.length);
const getMovieListWlement = document.getElementById('card-outerBox');
// Now, Traversing on local storage for favourites
for(let i=0;i<localStorage.length;i++)
{
    if(localStorage.key(i) == 'id'){
        continue;
    }
    // Get data from local storage in form of JSON
    let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    // Print the JSon Data on the Console 
    console.log(myStorage);
    //  Create a Canvas template for Showing results
    let div = document.createElement('div');
                div.setAttribute('id', 'card');
                div.innerHTML = `<div id="card-image">
        <img src="${myStorage.Poster}" alt="">
    </div>
    <div id="movie-details">
        <h5>Movie Name</h5>
        <h6>${myStorage.Title}</h6>
    </div>
    <div id="buttons">
        <button id="${myStorage.imdbID}" class="fav">Delete</button>
       
    </div>`
                getMovieListWlement.append(div);

    //if User click on remove Button
    document.getElementById(`${myStorage.imdbID}`).addEventListener('click',function (){
      myStorage.innerHTML = null;
      localStorage.removeItem(localStorage.key(i));
      window.location.assign('./favourite.html');

  });


}
















//   const favMovieId = localStorage.getItem("myValue");
//   console.log( localStorage);
//   const movieAray = [];
//   console.log(favMovieId);
//   let splitStringIdMovie = favMovieId.split(',');
  
//   // console.log(words);
//   // salert("The Value Received is " + b);
  
//   function displayMovieDetails() {
//     if (!favMovieId.length || favMovieId[0] == 0) {

//       console.log("it empty");

//     } else {
//       splitStringIdMovie.forEach(element => {
        
//         fetch(`http://www.omdbapi.com/?i=${element}&apikey=1a8b5020`)
//           .then((response) => response.json()).then((data) => {
//             console.log(data);

//             movieAray.push(data);
//             console.log(movieAray)
//             renderData(movieAray);
//           });
//       });
     
//     }
    
//   }
// function renderData(data) {
      
//         const getMovieListWlement = document.getElementById('card-outerBox');
//         getMovieListWlement.innerHTML = '';

//         if (data == null) {
//             console.log("The value is either undefined or null");

//         } else {

                  
//           movieAray.forEach(element => {
//             console.log(element);
//             let div = document.createElement('div');
//             div.setAttribute('id', 'card');
//             div.innerHTML = `<div id="card-image">
//     <img src="${element.Poster}" alt="">
// </div>
// <div id="movie-details">
//     <h5>Movie Name</h5>
//     <h6>${element.Title}</h6>
// </div>
// <div id="buttons">
//     <button id="${element.imdbID}" class="fav">favourites</button>
//     <button bte-id="${element.imdbID}" class="show-details">Show details</button>
// </div>`
//             getMovieListWlement.append(div);
//         }); 
                
          
//         }



//     }
//   displayMovieDetails();
//   localStorage.clear();
})();