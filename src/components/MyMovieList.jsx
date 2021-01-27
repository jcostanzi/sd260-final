import React from 'react';
import Movie from './Movie';

function MyMovieList({movies, handleRemove}) {

  return (
    <>
      <div className="titleList">
        <div className="title">
          <h1>My List</h1>
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
  )
}

export default MyMovieList;