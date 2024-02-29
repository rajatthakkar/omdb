let omdpapp = (() => {
  // APi key "http://www.omdbapi.com/?i=tt3896198&apikey=1a8b5020"
  //movies :- https://www.omdbapi.com/?s=avengers&apikey=1a8b5020
  // http://www.omdbapi.com/?i=tt3896198&apikey=1a8b5020

  // Global variable decleration......................................

  //  search movie 
  let searchInput = document.querySelector('input[type=text]');
  //    favourite movies link .................................................
  let favourite = document.getElementById('fav');
  // show full movie details.....................................................  
  let showDetails = document.getElementById('show-details');
  // fav movie id
  const favMovieImdbId = [];
  // fav movie single copy....
  let favouriteMovieList = [];
  // APi movies data
  let movieList = [];


  //  Api fetch movie data
  function api() {

    let url = getUrl();
    console.log(url);
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', url, true);
    xhrRequest.send();
    xhrRequest.onload = function () {

      let data = JSON.parse(xhrRequest.responseText);
      movieList = data.Search;
      console.log(movieList);
      renderData(movieList);

    }
  }
  //  get movie URL function
  function getUrl() {
    // get movie name key word
    let searchQurry = searchInput.value.trim();
    console.log(searchQurry);
    if (!searchQurry) {

      return alert("No moviews");

    } else {

      return `https://www.omdbapi.com/?s=${searchQurry}&apikey=1a8b5020`;

    }
  }
  //    show movie on display which is seacrch bye user.....
  function renderData(movieList) {
    // if there is not any move which is not similer to key word then there is not showing any thing
    const getMovieListWlement = document.getElementById('card-outerBox');
    getMovieListWlement.innerHTML = '';

    if (movieList == null) {
      console.log("The value is either undefined or null");

    } else {
      // if movies are showing then display on screen
      movieList.forEach(element => {
        console.log(element);
        let div = document.createElement('div');
        div.setAttribute('id', 'card');
        div.innerHTML = `<div id="card-image">
        <img src="${element.Poster}" alt="">
    </div>
    <div id="movie-details">
        <h5>Movie Name</h5>
        <h6>${element.Title}</h6>
    </div>
    <div id="buttons" class="button-div">
        <button id="${element.imdbID}" class="fav">favourites</button>
        <button bte-id="${element.imdbID}" class="show-details">Show details</button>
    </div>`
         
        getMovieListWlement.append(div);
        let favButton = document.getElementById(`${element.imdbID}`);
        console.log(favButton);
        favButton.addEventListener('click', function () {
          var index = localStorage.length;
          var data = JSON.stringify(element);
          localStorage.setItem(element.imdbID, data);
        });
      });
    }



  }
  // Get movie details data api
  function displayMovieDetails(movieId) {
    let url = `http://www.omdbapi.com/?i=${movieId}&apikey=1a8b5020`;
    fetch(`${url}`)
      .then((response) => response.json()).then((data) => {
        console.log(data);
        movieDetailsShow(data);
      });
  }
  // show the details on screen..........
  function movieDetailsShow(movieIMdb) {

    const getMovieListWlement = document.getElementById('card-outerBox');
    getMovieListWlement.innerHTML = '';

    if (movieIMdb == null) {
      console.log("The value is either undefined or null");
    } else {
      console.log(movieIMdb)
      let div = document.createElement('div');
      div.setAttribute('id', 'movie-details-outer');
      div.innerHTML = ` <div id="img-box">
                <img src="${movieIMdb.Poster}" alt="">
          </div>
          <div id="details">
            <div class="flex-row">
              <h4> Movie Name:- </h4>
              <p>'${movieIMdb.Title}'</p>
            </div>
            <div class="flex-row">
              <h4>Year:-</h4>
              <p>'${movieIMdb.Year}'</p>
            </div>
            <div class="flex-row">
              <h4>Released Date:- </h4>
              <p>'${movieIMdb.Released}'</p>
            </div>
            <div class="flex-row">
              <h4>Duretion:-</h4>
              <p>'${movieIMdb.Runtime}'</p>
            </div>
            <div class="flex-row">
              <h4>Directed by:-</h4>
              <p>'${movieIMdb.Director}'</p>
            </div>
            <div class="flex-row">
              <h4>Movie writer:- </h4>
              <p>'${movieIMdb.Writer}'</p>
            </div>
            <div class="flex-row">
              <h4>Cast:- </h4>
              <p>'${movieIMdb.Actors}'</p>
            </div>
            <div class="flex-row">
              <h4>Plot:- </h4>
              <p>'${movieIMdb.Plot}</p>
            </div>
            <div class="flex-row">
              <h4>Language:- </h4>
              <p>'${movieIMdb.Language}</p>
            </div>
            <div class="flex-row">
              <h4>Awards:- </h4>
              <p>'${movieIMdb.Awards}</p>
            </div>
            <div class="flex-row">
              <h4>Rating:- </h4>
              <p>'${movieIMdb.imdbRating}</p>
            </div>
            <div class="flex-row">
              <h4>Votes:- </h4>
              <p>'${movieIMdb.imdbVotes}</p>
            </div>
            <div class="flex-row">
              <h4>Movie</h4>
              <p>'${movieIMdb.movie}</p>
            </div>
            <div class="flex-row">
              <h4>Box Office Collection:-</h4>
              <p>'${movieIMdb.BoxOffice}</p>
            </div>
          </div>`
      getMovieListWlement.append(div);
      ;
    }

  }
  // get favourites movie function which get only ImDB id of that movies which is in your fac bucket list
  function addFavouriteMovieList(target) {

    let movieImdb = target.getAttribute("id");

    let movie = movieList.filter(function (movieList) {
      return movieList.imdbID === movieImdb;

    });
    // favMovieImdbId.push(movieImdb);
    favMovieImdbId.push(movieImdb);
    // console.log(movie);
    // console.log(favMovieImdbId)
    function removeDuplicates(favMovieImdbId) {
      return favMovieImdbId.filter((item,
        index) => favMovieImdbId.indexOf(item) === index);
    }

    favouriteMovieList = removeDuplicates(favMovieImdbId);
    // localStorage.setItem("myValue", favouriteMovieList);
    // window.location.assign('index.html');
    console.log(favouriteMovieList);
  }
  // get deetails of the perticular movie which is selected by the user
  function showDetailsonScreen(target) {

    let movieImdb = target.getAttribute("bte-id");

    let movie = movieList.filter(function (movieList) {

      return movieList.imdbID === movieImdb;

    });

    console.log(movieImdb);
    displayMovieDetails(movieImdb);

  }
  // handel click event on show details 
  function handdleClickListiner(e) {
      const target = e.target;

      if (target.className === 'show-details') {
          // show details of movies
          showDetailsonScreen(target);
    
          console.log("details")

      } 

  }
  // favourit movie lists
  function showfavouriteMovieList() {
    console.log(favMovieImdbId);
    localStorage.setItem("myValue", favouriteMovieList);
    // window.location.assign('index.html');
  }
  function initilizeapp() {
    searchInput.addEventListener('keyup', api);
    document.addEventListener('click', handdleClickListiner);
    // favourite.addEventListener('click', showfavouriteMovieList)
  }
  initilizeapp();

})();