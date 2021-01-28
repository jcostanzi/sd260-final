import React from 'react';
import Movie from './Movie';
import MovieRow from './MovieRow';

function MyMovieList({movies, myMoviesListView, allGenres, handleRemove, listViewOnClick}) {

  if (myMoviesListView) {

    return (
      <>
        <div className="titleList">
          <div className="title">
            <h1>My List <i className="fa fa-list" aria-hidden="true" onClick={listViewOnClick}></i></h1>
            <table className="my-list-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Rating</th>
                  <th>Genres</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  movies.map((m) => (
                    <MovieRow
                      key={m.id}
                      id={m.id}
                      title={m.title}
                      rating={m.rating}
                      movieGenres={m.genre_ids}
                      allGenres={allGenres}
                      handleRemove={handleRemove}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    );

  } else {
    return (
      <>
        <div className="titleList">
          <div className="title">
            <h1>My List <i className="fa fa-list" aria-hidden="true" onClick={listViewOnClick}></i></h1>
            <div className="titles-wrapper">
              {
                movies.map((m) => (
                  <Movie
                    key={m.id}
                    id={m.id}
                    imgSrc={m.imgSrc}
                    title={m.title}
                    rating={m.rating}
                    plot={m.plot}
                    saved={m.saved}
                    handleRemove={handleRemove}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MyMovieList;