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
      genres: [],
      myMoviesListView: false,
      moviesByGenre: [],
      myMovieList: [],
      filteredMovies: [],
      filteredMyMovies: []
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.toggleMyListView = this.toggleMyListView.bind(this);
  }

  componentDidMount() {

    MovieAPI.genres()
      .then(genres => {

        this.setState({
          genres: genres
        });

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
              moviesByGenre: moviesByGenre,
              filteredMovies: [ ...moviesByGenre ],
              myMovieList: myMovieList,
              filteredMyMovies: [ ...myMovieList ],
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

    const filteredMoviesByGenre = [];

    let searchResults = '';
    let movieCount = 0;

    const searchValueToLower = searchValue.toLowerCase();

    this.state.moviesByGenre.forEach((mg) => {
      filteredMoviesByGenre.push({
        id: mg.id,
        name: mg.name,
        movies: mg.movies.filter((m) => {
          return m.title.toLowerCase().includes(searchValueToLower) || m.plot.toLowerCase().includes(searchValueToLower);
        })
      });
      movieCount += filteredMoviesByGenre[filteredMoviesByGenre.length - 1].movies.length;
    });

    const filteredMyMovies = this.state.myMovieList.filter((m) => {
      return m.title.toLowerCase().includes(searchValueToLower) || m.plot.toLowerCase().includes(searchValueToLower);
    });

    if (searchValue != '') {
      searchResults = `Found ${movieCount} with the query "${searchValue}"`;
    }

    this.setState(() => {
      return {
        searchValue: searchValue,
        searchResults: searchResults,
        filteredMovies: filteredMoviesByGenre,
        filteredMyMovies: filteredMyMovies
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

  toggleMyListView() {
    this.setState((prevState) => {
      return {
        myMoviesListView: !prevState.myMoviesListView
      };
    });
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
          <Route path="/my-list" render={ (props) => <MyMovieList movies={this.state.filteredMyMovies} allGenres={this.state.genres} myMoviesListView={this.state.myMoviesListView} handleRemove={this.handleRemove} listViewOnClick={this.toggleMyListView} {...props} />} />
          <Route path="/" render={ (props) => <MovieList moviesByGenre={this.state.filteredMovies} handleAdd={this.handleAdd} handleRemove={this.handleRemove} {...props} />} />
        </Switch>
      </>
    );
  };
}

export default App;
