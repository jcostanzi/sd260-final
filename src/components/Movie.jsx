import React from 'react';

function Movie({id, imgSrc, title, rating, plot, saved, handleRemove}) {
  return (
    <div className="movie" key={id}>
      <img src={imgSrc} />
      <div className="overlay">
        <div className="title">{title}</div>
        <div className="rating">{rating}/10</div>
        <div className="plot">{plot}</div>
        <div data-toggled={saved.toString()} className="listToggle" onClick={() => handleRemove(id)}>
          <div>
            <i className="fa fa-fw fa-plus"></i>
            <i className="fa fa-fw fa-check"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;