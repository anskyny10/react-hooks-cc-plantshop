import React, { useState } from "react";

function Search( { updateSearch } ) {

  const [searchForm, setSearchForm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    updateSearch(searchForm);
    setSearchForm("");
  }

  function handleChange(e) {
    setSearchForm(e.target.value);
  }

  return (
    <form className="searchbar" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
}

export default Search;
