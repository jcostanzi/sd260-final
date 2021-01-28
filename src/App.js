import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MyMovieList from './components/MyMovieList';
import * as MovieAPI from './lib/MovieAPI';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchValue: '',
      searchResults: '',
      moviesByGenre: [],
      myMovieList: [],
      filteredMovies: [],
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {

    MovieAPI.genres()
      .then(genres => {

        MovieAPI.getAll()
          .then(data => {

            let movies = data.map((m) => {
              return {
                id: m.id,
                imgSrc: m.poster_path,
                title: m.title,
                rating: m.vote_average,
                plot: m.overview,
                saved: m.my_list ? true : false,
                genre_ids: m.genre_ids,
              };
            });

            // Initialize movies array into genre array
            let moviesByGenre = genres.map((g) => {
              return { ...g, movies: [] };
            });

            // Group movies by genre
            moviesByGenre.forEach((g) => {
              movies.forEach((m) => {
                if (m.genre_ids.indexOf(g.id) !== -1) {
                  g.movies.push(m);
                }
              });
            });

            // Sort by gender name
            moviesByGenre.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });

            let myMovieList = movies
              .filter((m) => {
                return m.saved;
              });

            this.setState({
              moviesByGenre: [ ...moviesByGenre ],
              filteredMovies: [ ...moviesByGenre ],
              myMovieList: myMovieList,
            });
          });
      });
  }

  handleAdd(id) {
    MovieAPI.addToList({id});
    this.toggleSaved(id);
  }

  handleRemove(id) {
    MovieAPI.removeFromList({id});
    this.toggleSaved(id);
  }

  handleSearchChange(event) {
    const searchValue = event.target.value;
    console.log({searchValue});
    const filteredMoviesByGenre = [
      ...this.state.moviesByGenre
    ]
    console.log({filteredMoviesByGenre});
    let searchResults = '';
    let movieCount = 0;

    if (searchValue !== '') {
      const searchValueToLower = searchValue.toLowerCase();

      for (let i = 0; i < this.state.moviesByGenre.length; i++) {
        for (let j = 0; j < this.state.moviesByGenre[i].movies.length; j++) {
          const movie = this.state.moviesByGenre[i].movies[j];
          const movieTitle = movie.title.toLowerCase();
          const moviePlot = movie.plot.toLowerCase();

          if (!movieTitle.includes(searchValueToLower) && !moviePlot.includes(searchValueToLower)) {
            filteredMoviesByGenre[i].movies.splice(j, 1);
          }
        }
        movieCount += filteredMoviesByGenre[i].movies.length;
      }

      searchResults = `Found ${movieCount} with the query "${searchValue}"`;
    }

    this.setState(() => {
      return {
        searchValue: searchValue,
        searchResults: searchResults,
        filteredMovies: filteredMoviesByGenre
      }
    });

    event.preventDefault();
  }

  toggleSaved(id) {

    for (let i = 0; i < this.state.moviesByGenre.length; i++) {
      let endLoop = false;
      for (let j = 0; j < this.state.moviesByGenre[i].movies.length; j++) {
        const movie = this.state.moviesByGenre[i].movies[j];
        const newSavedValue = !movie.saved;

        if (movie.id === id) {

          // Update state for moviesByGenre
          this.setState((prevState) => {
            const newMovies = [
              ...prevState.moviesByGenre
            ];
            newMovies[i].movies[j].saved = newSavedValue;
            return {
              moviesByGenre: newMovies
            }
          });

          // Update state for myMovieList
          if (newSavedValue) {
            this.setState((prevState) => {
              return {
                myMovieList: prevState.myMovieList.concat(movie)
              }
            });

          } else {
            this.setState((prevState) => ({
              myMovieList: prevState.myMovieList.filter((sm) => sm.id !== movie.id),
            }));
          }

          endLoop = true;
          break;
        }
      }
      if (endLoop) { break; }
    }
  }

  render = () => {
    return (
      <>
        <Header
          searchValue={this.state.searchValue}
          searchResults={this.state.searchResults}
          handleChange={this.handleSearchChange}
        />
        <Switch>
          <Route path="/my-list" render={ (props) => <MyMovieList movies={this.state.myMovieList} handleRemove={this.handleRemove} {...props} />} />
          <Route path="/" render={ (props) => <MovieList moviesByGenre={this.state.filteredMovies} handleAdd={this.handleAdd} handleRemove={this.handleRemove} {...props} />} />
        </Switch>
      </>
    );
  };
}

export default App;
