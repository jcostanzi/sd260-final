import React from 'react';

function Movie({id, imgSrc, title, rating, plot, saved, handleAdd, handleRemove}) {
  return (
    <div className="movie">
      <img src={imgSrc} alt={title} />
      <div className="overlay">
        <div className="title">{title}</div>
        <div className="rating">{rating}/10</div>
        <div className="plot">{plot}</div>
        <div data-toggled={saved.toString()} className="listToggle" onClick={() => { saved ? handleRemove(id) : handleAdd(id) }}>
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