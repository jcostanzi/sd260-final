import React from 'react';

function MovieRow({id, title, rating, movieGenres, allGenres, handleRemove}) {

  let movieGenresArray = [];

  movieGenres.forEach((mg) => {
    const genre = allGenres.find((g) => {
      return mg === g.id;
    });

    movieGenresArray.push(genre.name);
  });

  return (
    <tr>
      <td>{title}</td>
      <td>{rating}/10</td>
      <td>{movieGenresArray.join(', ')}</td>
      <td><i class="fa fa-minus-circle fa-2x" aria-hidden="true" onClick={ (e) => handleRemove(id) }></i></td>
    </tr>
  );
}

export default MovieRow;