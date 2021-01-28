import React from 'react';
import { Link } from 'react-router-dom';

function Header({searchValue, searchResults, handleChange, listViewOnClick}) {

  return (
    <header className="header">
      <Link to="/">
        <img
          src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
          alt="netflix-font"
          border="0"
        />
      </Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/my-list">My List</Link>
            </li>
          </ul>
        </nav>
      </div>

      <form id="search" className="search" onSubmit={ (e) => e.preventDefault() }>
        <input type="search" placeholder="Search for a title..." value={searchValue} onChange={ (e) => handleChange(e) } />
        <div className="searchResults">{searchResults}</div>
      </form>

      <div className={ window.location.pathname === '/my-list' ? '' : 'hidden-elem' }>
        <button onClick={listViewOnClick}>Toggle View</button>
      </div>
    </header>
  );
}

export default Header;