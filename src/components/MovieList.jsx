import React from 'react';
import Movie from './Movie';

function MovieList({moviesByGenre, handleAdd, handleRemove}) {

  return (
    <div className="titleList">
      {
        moviesByGenre.map((mg) => {

          if (mg.movies.length === 0) {
            return <></>;
          }

          return (
            <div className="title" key={mg.id}>
              <h1>{mg.name}</h1>
              <div className="titles-wrapper">
                {
                  mg.movies.map((m) => {
                    return (
                      <Movie
                        key={m.id}
                        id={m.id}
                        imgSrc={m.imgSrc}
                        title={m.title}
                        rating={m.rating}
                        plot={m.plot}
                        saved={m.saved}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                      />
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default MovieList;